import { gql } from 'graphql-tag';

export const typeDefs = gql`
  enum RSVP {
    YES
    NO
    MAYBE
  }

  type Tag {
    id: ID!
    name: String!
  }

  type Attendee {
    id: ID!
    name: String!
    email: String
    rsvp: RSVP!
  }

  type Event {
    id: ID!
    title: String!
    date: String!
    tags: [Tag!]!
    attendees: [Attendee!]!
  }

  type Query {
    events: [Event!]!
    event(id: ID!): Event
  }

  input CreateEventInput {
    title: String!
    date: String!
  }

  input AddAttendeeInput {
    eventId: ID!
    name: String!
    email: String
    rsvp: RSVP!
  }

  type Mutation {
    createEvent(input: CreateEventInput!): Event!
    addAttendee(input: AddAttendeeInput!): Attendee!
    removeAttendee(eventId: ID!, attendeeId: ID!): Boolean!
  }
`;
