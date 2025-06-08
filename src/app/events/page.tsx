/**
 * Events Page
 * 
 * This page displays a list of all events and provides functionality to manage them.
 * 
 * @module app/events/page
 */
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { EventCard } from '@/components/events/EventCard';
import { Button } from '@/components/ui/Button';
import { useEvent } from '@/hooks/useEvent';

export default function EventsPage() {
  const { events, isLoadingEvents, eventsError } = useEvent();
  const router = useRouter();

  if (isLoadingEvents) return <div>Loading...</div>;
  if (eventsError) return <div>Error: {eventsError.message}</div>;

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-blue-600">Events</h1>
            <p className="text-gray-600">Manage your events and attendees</p>
          </div>
          <Button
            onClick={() => router.push('/events/new')}
            size="lg"
            leftIcon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            }
          >
            Add New Event
          </Button>
        </div>

        {/* Event List */}
        <div className="space-y-6">
          {events?.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-gray-600 text-lg">No events found</p>
              <Button
                onClick={() => router.push('/events/new')}
                className="mt-4"
                variant="secondary"
              >
                Create your first event
              </Button>
            </div>
          ) : (
            events?.map((event) => (
              <EventCard key={event.id} event={event} />
            ))
          )}
        </div>
      </div>
    </main>
  );
}
