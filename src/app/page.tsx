'use client';

import React from 'react';
import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { Event } from '@/lib/types/graphql';
import { useRouter } from 'next/navigation';
import { GET_EVENTS } from '@/graphql/operations/queries';

export default function HomePage() {
  const { loading, error, data } = useQuery<{ events: Event[] }>(GET_EVENTS);
  const router = useRouter();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Welcome Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-600 mb-3">
            Welcome to EventHub
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Add events and manage attendees
          </p>
          <button
            onClick={() => router.push('/events/new')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg flex items-center mx-auto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add New Event
          </button>
        </div>

        {/* Event List */}
        <div className="space-y-6">
          {data?.events.map((event: Event) => (
            <div 
              key={event.id} 
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6"
            >
              <Link href={`/events/${event.id}`} className="block">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {event.title}
                    </h3>
                    <p className="text-blue-600">
                      {new Date(event.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {event.attendees.length} {event.attendees.length === 1 ? 'Attendee' : 'Attendees'}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
