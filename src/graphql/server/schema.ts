/**
 * GraphQL Schema Definition
 * 
 * This schema defines the types, queries, and mutations for the Mini Event Manager application.
 * It provides a type-safe API for managing events and attendees.
 */

import { gql } from 'graphql-tag';

export const typeDefs = gql`
  """
  Represents the RSVP status of an attendee for an event.
  """
  enum RSVP {
    """Attendee has confirmed attendance"""
    YES
    """Attendee has declined attendance"""
    NO
    """Attendee is unsure about attendance"""
    MAYBE
  }

  """
  Represents a tag that can be associated with events (e.g., "Internal", "Public").
  """
  type Tag {
    """Unique identifier for the tag"""
    id: ID!
    """Name/label of the tag"""
    name: String!
  }

  """
  Represents an attendee of an event.
  """
  type Attendee {
    """Unique identifier for the attendee"""
    id: ID!
    """Full name of the attendee"""
    name: String!
    """Optional email address of the attendee"""
    email: String
    """RSVP status of the attendee"""
    rsvp: RSVP!
  }

  """
  Represents an event in the system.
  """
  type Event {
    """Unique identifier for the event"""
    id: ID!
    """Title of the event"""
    title: String!
    """Date and time of the event (ISO 8601 format)"""
    date: String!
    """Tags associated with the event"""
    tags: [Tag!]!
    """List of attendees for the event"""
    attendees: [Attendee!]!
  }

  """
  Root query type for fetching data.
  """
  type Query {
    """Get all events"""
    events: [Event!]!
    """Get a specific event by ID"""
    event(id: ID!): Event
  }

  """
  Input type for creating a new event.
  """
  input CreateEventInput {
    """Title of the event"""
    title: String!
    """Date and time of the event (ISO 8601 format)"""
    date: String!
  }

  """
  Input type for adding an attendee to an event.
  """
  input AddAttendeeInput {
    """ID of the event to add the attendee to"""
    eventId: ID!
    """Name of the attendee"""
    name: String!
    """Optional email address of the attendee"""
    email: String
    """RSVP status of the attendee"""
    rsvp: RSVP!
  }

  """
  Root mutation type for modifying data.
  """
  type Mutation {
    """Create a new event"""
    createEvent(input: CreateEventInput!): Event!
    """Add an attendee to an event"""
    addAttendee(input: AddAttendeeInput!): Attendee!
    """Remove an attendee from an event"""
    removeAttendee(eventId: ID!, attendeeId: ID!): Boolean!
  }
`;
