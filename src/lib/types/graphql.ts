export type RSVP = 'YES' | 'NO' | 'MAYBE';

/**
 * A tag for an event
 */
export interface Tag {
    id: string;
    name: string;
}

/**
 * An attendee for an event
 */
export interface Attendee {
    id: string;
    name: string;
    email?: string;
    rsvp: RSVP;
}

/**
 * An event
 */
export interface Event {
    id: string;
    title: string;
    date: string; // ISO date
    tags: Tag[];
    attendees: Attendee[];
}

/**
 * The input for creating an event
 */
export interface CreateEventInput {
    title: string;
    date: string;
}

/**
 * The input for adding an attendee to an event
 */
export interface AddAttendeeInput {
    eventId: string;
    name: string;
    email?: string;
    rsvp: RSVP;
}

/**
 * The resolvers for the GraphQL schema
 */
export type Resolvers = {
    Query: {
      events: () => Event[];
      event: (_: unknown, args: { id: string }) => Event | null;
    };
    Mutation: {
      createEvent: (_: unknown, args: { input: CreateEventInput }) => Event;
      addAttendee: (_: unknown, args: { input: AddAttendeeInput }) => Attendee;
      removeAttendee: (_: unknown, args: { eventId: string; attendeeId: string }) => boolean;
    };
  };

export interface GetEventsQuery {
  events: Array<{
    id: string;
    title: string;
    date: string;
    attendees: Array<{
      id: string;
    }>;
  }>;
}

export interface GetEventQuery {
  event: {
    id: string;
    title: string;
    date: string;
    attendees: Array<{
      id: string;
      name: string;
      email: string | null;
      rsvp: 'YES' | 'NO' | 'MAYBE';
    }>;
  } | null;
} 