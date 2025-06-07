/**
 * Event Detail Page
 * 
 * This is the page for displaying the details of an event.
 * It displays the event details, a form for adding attendees, and a list of attendees.
 * 
 * @module app/events/[id]/page
 */
'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { RSVP } from '@/lib/types/graphql';
import { EventHeader } from '@/components/events/EventHeader';
import { AttendeeList } from '@/components/events/AttendeeList';
import { AddAttendeeForm } from '@/components/events/AddAttendeeForm';
import { Card } from '@/components/ui/Card';
import { useEvent } from '@/hooks/useEvent';
import { useAttendee } from '@/hooks/useAttendee';

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = params.id as string;

  const { event, isLoadingEvent, eventError } = useEvent({ eventId });
  const { addAttendee, removeAttendee, isAddingAttendee, isRemovingAttendee } = useAttendee({ eventId });

  if (isLoadingEvent) return <div>Loading...</div>;
  if (eventError) return <div>Error: {eventError.message}</div>;
  if (!event) return <div>Event not found</div>;

  const handleAddAttendee = async (values: { name: string; email?: string; rsvp: RSVP }) => {
    try {
      await addAttendee(values);
    } catch (error) {
      console.error('Error adding attendee:', error);
    }
  };

  const handleRemoveAttendee = async (attendeeId: string) => {
    try {
      await removeAttendee(attendeeId);
    } catch (error) {
      console.error('Error removing attendee:', error);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <EventHeader 
          event={event} 
          onBackClick={() => router.push('/')} 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Add Attendee Form */}
          <Card padding="lg">
            <AddAttendeeForm 
              onSubmit={handleAddAttendee}
              isLoading={isAddingAttendee}
            />
          </Card>

          {/* Attendee List */}
          <Card padding="lg">
            <AttendeeList
              attendees={event.attendees}
              onRemoveAttendee={handleRemoveAttendee}
              isRemoving={isRemovingAttendee}
            />
          </Card>
        </div>
      </div>
    </main>
  );
}
