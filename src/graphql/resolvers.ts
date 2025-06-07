import { v4 as uuidv4 } from 'uuid';
import { events } from './data';
import { Event, Attendee } from '@/lib/types/graphql';

export const resolvers = {
  Query: {
    events: () => events,
    event: (_: any, { id }: { id: string }) => events.find(e => e.id === id),
  },
  Mutation: {
    createEvent: (_: any, { input }: { input: { title: string; date: string } }): Event => {
      const newEvent: Event = {
        id: uuidv4(),
        title: input.title,
        date: input.date,
        tags: [],
        attendees: [],
      };
      events.push(newEvent);
      return newEvent;
    },
    addAttendee: (
      _: any,
      { input }: { input: { eventId: string; name: string; email?: string; rsvp: 'YES' | 'NO' | 'MAYBE' } }
    ): Attendee => {
      const event = events.find(e => e.id === input.eventId);
      if (!event) throw new Error('Event not found');
      const newAttendee: Attendee = {
        id: uuidv4(),
        name: input.name,
        email: input.email,
        rsvp: input.rsvp,
      };
      event.attendees.push(newAttendee);
      return newAttendee;
    },
    removeAttendee: (
      _: any,
      { eventId, attendeeId }: { eventId: string; attendeeId: string }
    ): boolean => {
      const event = events.find(e => e.id === eventId);
      if (!event) return false;
      event.attendees = event.attendees.filter(a => a.id !== attendeeId);
      return true;
    },
  },
};
