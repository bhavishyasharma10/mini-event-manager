/**
 * GraphQL Resolvers
 * 
 * This module contains the resolvers that implement the GraphQL schema operations.
 * Currently using an in-memory store (events array) for data persistence.
 * In a production environment, this would be replaced with a database.
 */

import { v4 as uuidv4 } from 'uuid';
import { events } from './data';
import { Event, Attendee, CreateEventInput, AddAttendeeInput } from '@/lib/types/graphql';
import { Resolvers } from '@/lib/types/graphql';

export const resolvers: Resolvers = {
  Query: {
    /**
     * Returns all events in the system
     * @returns Array of all events
     */
    events: () => events,

    /**
     * Returns a specific event by ID
     * @param _ - Unused parent object
     * @param id - ID of the event to find
     * @returns The event if found, null otherwise
     */
    event: (_: unknown, { id }: { id: string }) => events.find(e => e.id === id) || null,
  },
  Mutation: {
    /**
     * Creates a new event
     * @param _ - Unused parent object
     * @param input - Event creation data
     * @returns The newly created event
     */
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
    /**
     * Adds an attendee to an event
     * @param _ - Unused parent object
     * @param input - Attendee data and event ID
     * @returns The newly created attendee
     * @throws Error if event is not found
     */
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
    /**
     * Removes an attendee from an event
     * @param _ - Unused parent object
     * @param eventId - ID of the event
     * @param attendeeId - ID of the attendee to remove
     * @returns true if attendee was removed, false if event not found
     */
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
