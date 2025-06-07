import React from 'react';
import { Event } from '@/lib/types/graphql';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface EventHeaderProps {
  event: Event;
  onBackClick?: () => void;
}

export const EventHeader: React.FC<EventHeaderProps> = ({ event, onBackClick }) => {
  return (
    <Card className="mb-8">
      <Button
        variant="ghost"
        leftIcon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
        }
        href="/"
        className="mb-6"
      >
        Back to Events
      </Button>
      
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
    </Card>
  );
}; 