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
import { toGraphQLError, validateIds, validateCreateEventInput, validateAddAttendeeInput, hasDuplicateEmail, EventManagerError, ErrorCode } from '@/lib/utils/validation';

export const resolvers: Resolvers = {
  Query: {
    /**
     * Returns all events in the system
     * @returns Array of all events
     */
    events: () => {
      try {
        return events;
      } catch (error) {
        throw toGraphQLError(error);
      }
    },

    /**
     * Returns a specific event by ID
     * @param _ - Unused parent object
     * @param id - ID of the event to find
     * @returns The event if found, null otherwise
     */
    event: (_: unknown, { id }: { id: string }) => {
      try {
        validateIds(id);
        const event = events.find(e => e.id === id);
        if (!event) {
          throw new EventManagerError(`Event with ID ${id} not found`, ErrorCode.NOT_FOUND);
        }
        return event;
      } catch (error) {
        throw toGraphQLError(error);
      }
    },
  },
  Mutation: {
    /**
     * Creates a new event
     * @param _ - Unused parent object
     * @param input - Event creation data
     * @returns The newly created event
     */
    createEvent: (_: unknown, { input }: { input: CreateEventInput }): Event => {
      try {
        validateCreateEventInput(input);

        const newEvent: Event = {
          id: uuidv4(),
          title: input.title.trim(),
          date: input.date,
          tags: [],
          attendees: [],
        };
        events.push(newEvent);
        return newEvent;
      } catch (error) {
        throw toGraphQLError(error);
      }
    },

    /**
     * Adds an attendee to an event
     * @param _ - Unused parent object
     * @param input - Attendee data and event ID
     * @returns The newly created attendee
     */
    addAttendee: (_: unknown, { input }: { input: AddAttendeeInput }): Attendee => {
      try {
        validateAddAttendeeInput(input);

        const event = events.find(e => e.id === input.eventId);
        if (!event) {
          throw new EventManagerError(`Event with ID ${input.eventId} not found`, ErrorCode.NOT_FOUND);
        }

        const existingEmails = event.attendees.map(a => a.email);
        
        if (hasDuplicateEmail(input.email, existingEmails)) {
          throw new EventManagerError('An attendee with this email already exists', ErrorCode.DUPLICATE_EMAIL);
        }

        const newAttendee: Attendee = {
          id: uuidv4(),
          name: input.name.trim(),
          email: input.email?.trim().toLowerCase(),
          rsvp: input.rsvp,
        };
        
        event.attendees.push(newAttendee);
        
        return newAttendee;
      } catch (error) {
        throw toGraphQLError(error);
      }
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
      try {
        validateIds(eventId, attendeeId);

        const event = events.find(e => e.id === eventId);
        if (!event) {
          throw new EventManagerError(`Event with ID ${eventId} not found`, ErrorCode.NOT_FOUND);
        }

        const attendeeExists = event.attendees.some(a => a.id === attendeeId);
        if (!attendeeExists) {
          throw new EventManagerError(`Attendee with ID ${attendeeId} not found in event`, ErrorCode.NOT_FOUND);
        }

        event.attendees = event.attendees.filter(a => a.id !== attendeeId);
        return true;
      } catch (error) {
        throw toGraphQLError(error);
      }
    },
  },
};
