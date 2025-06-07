/**
 * GraphQL Query Operations
 * 
 * This module contains the GraphQL query operations used by the client.
 * Each query is defined using the gql tag and includes the fields needed for each operation.
 */

import { gql } from '@apollo/client';

/**
 * Query to fetch all events with their basic information and attendee count
 * Used in the events list page
 */
export const GET_EVENTS = gql`
  query GetEvents {
    events {
      id
      title
      date
      attendees {
        id
      }
    }
  }
`;

/**
 * Query to fetch detailed information about a specific event
 * Used in the event details page
 * @param id - The ID of the event to fetch
 */
export const GET_EVENT = gql`
  query GetEvent($id: ID!) {
    event(id: $id) {
      id
      title
      date
      attendees {
        id
        name
        email
        rsvp
      }
    }
  }
`; 