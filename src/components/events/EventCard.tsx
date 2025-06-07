/**
 * EventCard Component
 * 
 * A card component that displays event information in a concise format.
 * Shows the event title, date, and attendee count.
 * 
 * @example
 * ```tsx
 * <EventCard
 *   event={{
 *     id: "1",
 *     title: "Team Meeting",
 *     date: "2024-03-20T10:00:00Z",
 *     attendees: []
 *   }}
 * />
 * ```
 */

import React from 'react';
import Link from 'next/link';
import { Event } from '@/lib/types/graphql';
import { Card } from '@/components/ui/Card';
import { formatDate } from '@/lib/utils/date';

interface EventCardProps {
  event: Event;
  className?: string;
}

/**
 * EventCard component that displays event information in a card format
 * 
 * @param {Object} props - Component props
 * @param {Event} props.event - The event data to display
 * @param {string} [props.className=''] - The class name to apply to the card
 * @returns {JSX.Element} The rendered event card component
 */
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
            {formatDate(event.date)}
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