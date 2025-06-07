'use client';

import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams, useRouter } from 'next/navigation';
import { Event, Attendee, RSVP } from '@/lib/types/graphql';
import { GET_EVENT } from '@/graphql/operations/queries';
import { ADD_ATTENDEE, REMOVE_ATTENDEE } from '@/graphql/operations/mutations';
import { EventHeader } from '@/components/events/EventHeader';
import { AttendeeList } from '@/components/events/AttendeeList';
import { AddAttendeeForm } from '@/components/events/AddAttendeeForm';
import { Card } from '@/components/ui/Card';

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = params.id as string;

  const { loading, error, data } = useQuery<{ event: Event }>(GET_EVENT, {
    variables: { id: eventId },
  });

  const [addAttendee, { loading: isAdding }] = useMutation(ADD_ATTENDEE, {
    refetchQueries: [{ query: GET_EVENT, variables: { id: eventId } }],
  });

  const [removeAttendee, { loading: isRemoving }] = useMutation(REMOVE_ATTENDEE, {
    refetchQueries: [{ query: GET_EVENT, variables: { id: eventId } }],
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data?.event) return <div>Event not found</div>;

  const handleAddAttendee = async (values: { name: string; email?: string; rsvp: RSVP }) => {
    try {
      await addAttendee({
        variables: {
          input: {
            eventId,
            name: values.name,
            email: values.email,
            rsvp: values.rsvp,
          },
        },
      });
    } catch (error) {
      console.error('Error adding attendee:', error);
    }
  };

  const handleRemoveAttendee = async (attendeeId: string) => {
    try {
      await removeAttendee({
        variables: {
          eventId,
          attendeeId,
        },
      });
    } catch (error) {
      console.error('Error removing attendee:', error);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <EventHeader 
          event={data.event} 
          onBackClick={() => router.push('/')} 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Add Attendee Form */}
          <Card padding="lg">
            <AddAttendeeForm 
              onSubmit={handleAddAttendee}
              isLoading={isAdding}
            />
          </Card>

          {/* Attendee List */}
          <Card padding="lg">
            <AttendeeList
              attendees={data.event.attendees}
              onRemoveAttendee={handleRemoveAttendee}
              isRemoving={isRemoving}
            />
          </Card>
        </div>
      </div>
    </main>
  );
}
