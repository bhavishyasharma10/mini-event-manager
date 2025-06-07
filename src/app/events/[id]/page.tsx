'use client';

import React from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import Link from 'next/link';
import { Event, Attendee, AddAttendeeInput, RSVP } from '@/lib/types/graphql';

const GET_EVENT = gql`
  query GetEvent($id: ID!) {
    event(id: $id) {
      id
      title
      date
      attendees {
        id
        name
        email
        rsvp
      }
    }
  }
`;

const ADD_ATTENDEE = gql`
  mutation AddAttendee($input: AddAttendeeInput!) {
    addAttendee(input: $input) {
      id
      name
      email
      rsvp
    }
  }
`;

const REMOVE_ATTENDEE = gql`
  mutation RemoveAttendee($eventId: ID!, $attendeeId: ID!) {
    removeAttendee(eventId: $eventId, attendeeId: $attendeeId)
  }
`;

export default function EventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const { loading, error, data } = useQuery<{ event: Event }>(GET_EVENT, {
    variables: { id },
  });
  const formRef = React.useRef<HTMLFormElement>(null);

  const [addAttendee] = useMutation<{ addAttendee: Attendee }, { input: AddAttendeeInput }>(ADD_ATTENDEE, {
    refetchQueries: [{ query: GET_EVENT, variables: { id } }],
  });

  const [removeAttendee] = useMutation<{ removeAttendee: boolean }, { eventId: string; attendeeId: string }>(REMOVE_ATTENDEE, {
    refetchQueries: [{ query: GET_EVENT, variables: { id } }],
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const rsvp = formData.get('rsvp') as RSVP;

    try {
      await addAttendee({
        variables: {
          input: {
            eventId: id,
            name,
            email: email || undefined,
            rsvp,
          },
        },
      });
      if (formRef.current) {
        formRef.current.reset();
      }
    } catch (err) {
      console.error('Error adding attendee:', err);
    }
  };

  const handleRemoveAttendee = async (attendeeId: string) => {
    try {
      await removeAttendee({
        variables: {
          eventId: id,
          attendeeId,
        },
      });
    } catch (err) {
      console.error('Error removing attendee:', err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data?.event) return <div>Event not found</div>;

  const { event } = data;

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200 mb-6"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Events
          </Link>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-3">{event.title}</h1>
          <div className="flex items-center text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            {new Date(event.date).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric'
            })}
          </div>
        </div>

        {/* Add Attendee Form */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Add Attendee</h2>
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email (optional)
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              />
            </div>
            <div>
              <label htmlFor="rsvp" className="block text-sm font-medium text-gray-700 mb-1">
                RSVP Status
              </label>
              <select
                id="rsvp"
                name="rsvp"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              >
                <option value="YES">Yes, I'll be there</option>
                <option value="NO">No, I can't make it</option>
                <option value="MAYBE">Maybe, I'll let you know</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Add Attendee
            </button>
          </form>
        </div>

        {/* Attendees List */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Attendees
            </h2>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              {event.attendees.length} {event.attendees.length === 1 ? 'Attendee' : 'Attendees'}
            </span>
          </div>
          
          <div className="space-y-4">
            {event.attendees.map((attendee: Attendee) => (
              <div 
                key={attendee.id} 
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-800">{attendee.name}</h3>
                    {attendee.email && (
                      <p className="text-gray-600 text-sm mt-1">{attendee.email}</p>
                    )}
                    <div className="mt-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        attendee.rsvp === 'YES' 
                          ? 'bg-green-100 text-green-800'
                          : attendee.rsvp === 'NO'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {attendee.rsvp}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveAttendee(attendee.id)}
                    className="text-gray-400 hover:text-red-600 transition-colors duration-200"
                    title="Remove attendee"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
