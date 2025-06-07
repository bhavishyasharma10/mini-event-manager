import React from 'react';
import { Attendee } from '@/lib/types/graphql';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { getRsvpStyles, getRsvpLabel } from '@/lib/utils/rsvp';

interface AttendeeListProps {
  attendees: Attendee[];
  onRemoveAttendee: (attendeeId: string) => Promise<void>;
  isRemoving?: boolean;
}

/**
 * Attendee List
 * 
 * This component displays a list of attendees for an event.
 * It uses the Card component from the UI library for styling.
 * 
 * @param {Object} props - Component props
 * @param {Attendee[]} props.attendees - The list of attendees to display
 * @param {Function} props.onRemoveAttendee - Function to handle removing an attendee
 * @param {boolean} [props.isRemoving=false] - Whether the attendee is being removed
 * @returns {JSX.Element} The rendered list component
 */
export const AttendeeList: React.FC<AttendeeListProps> = ({
  attendees,
  onRemoveAttendee,
  isRemoving,
}) => {
  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Attendees
        </h2>
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
          {attendees.length} {attendees.length === 1 ? 'Attendee' : 'Attendees'}
        </span>
      </div>
      
      <div className="space-y-4">
        {attendees.map((attendee) => (
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
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRsvpStyles(attendee.rsvp)}`}>
                    {getRsvpLabel(attendee.rsvp)}
                  </span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemoveAttendee(attendee.id)}
                disabled={isRemoving}
                className="text-gray-400 hover:text-red-600"
                title="Remove attendee"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}; 