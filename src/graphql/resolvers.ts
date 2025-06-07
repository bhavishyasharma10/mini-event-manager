import { v4 as uuidv4 } from 'uuid';
import { events } from './data';
import { Event, Attendee, CreateEventInput, AddAttendeeInput } from '@/lib/types/graphql';
import { Resolvers } from '@/lib/types/graphql';

export const resolvers: Resolvers = {
  Query: {
    events: () => events,
    event: (_: unknown, { id }: { id: string }) => events.find(e => e.id === id) || null,
  },
  Mutation: {
    createEvent: (_: unknown, { input }: { input: CreateEventInput }): Event => {
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
      _: unknown,
      { input }: { input: AddAttendeeInput }
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
      _: unknown,
      { eventId, attendeeId }: { eventId: string; attendeeId: string }
    ): boolean => {
      const event = events.find(e => e.id === eventId);
      if (!event) return false;
      event.attendees = event.attendees.filter(a => a.id !== attendeeId);
      return true;
    },
  },
};
