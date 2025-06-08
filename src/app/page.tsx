/**
 * Home Page
 * 
 * This is the home page for the application.
 * It displays a welcome message and a button to navigate to events.
 * 
 * @module app/page
 */
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Welcome Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-600 mb-3">
            Welcome to EventHub
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            View or add events and attendees to your events
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button
              onClick={() => router.push('/events')}
              size="lg"
              variant="primary"
            >
              View Events
            </Button>
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
        </div>
      </div>
    </main>
  );
}
