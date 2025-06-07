import { gql } from '@apollo/client';

export const CREATE_EVENT = gql`
  mutation CreateEvent($input: CreateEventInput!) {
    createEvent(input: $input) {
      id
      title
      date
    }
  }
`;

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

export const REMOVE_ATTENDEE = gql`
  mutation RemoveAttendee($eventId: ID!, $attendeeId: ID!) {
    removeAttendee(eventId: $eventId, attendeeId: $attendeeId)
  }
`; 