import React from 'react';
import Link from 'next/link';
import { Event } from '@/lib/types/graphql';
import { Card } from '@/components/ui/Card';

interface EventCardProps {
  event: Event;
  className?: string;
}

export const EventCard: React.FC<EventCardProps> = ({ event, className = '' }) => {
  return (
    <Card className={className} hover>
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
    </Card>
  );
}; 