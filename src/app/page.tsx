'use client';

import React from 'react';
import { useQuery } from '@apollo/client';
import { Event } from '@/lib/types/graphql';
import { useRouter } from 'next/navigation';
import { GET_EVENTS } from '@/graphql/operations/queries';
import { EventCard } from '@/components/events/EventCard';
import { Button } from '@/components/ui/Button';

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
          {data?.events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </main>
  );
}
