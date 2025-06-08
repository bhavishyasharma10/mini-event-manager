/**
 * GraphQL Mutation Operations
 * 
 * This module contains the GraphQL mutation operations used by the client.
 * Each mutation is defined using the gql tag and includes the fields needed for each operation.
 */

import { gql } from '@apollo/client';

/**
 * Mutation to create a new event
 * Used in the event creation form
 * @param input - The event creation data (title and date)
 */
export const CREATE_EVENT = gql`
  mutation CreateEvent($input: CreateEventInput!) {
    createEvent(input: $input) {
      id
      title
      date
    }
  }
`;

/**
 * Mutation to add an attendee to an event
 * Used in the event details page
 * @param input - The attendee data (name, email, RSVP status) and event ID
 */
export const ADD_ATTENDEE = gql`
  mutation AddAttendee($input: AddAttendeeInput!) {
    addAttendee(input: $input) {
      id
      name
      email
      rsvp
    }
  }
`;

/**
 * Mutation to remove an attendee from an event
 * Used in the event details page
 * @param eventId - The ID of the event
 * @param attendeeId - The ID of the attendee to remove
 */
export const REMOVE_ATTENDEE = gql`
  mutation RemoveAttendee($eventId: ID!, $attendeeId: ID!) {
    removeAttendee(eventId: $eventId, attendeeId: $attendeeId)
  }
`; 