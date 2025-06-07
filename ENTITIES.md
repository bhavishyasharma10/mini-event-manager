# Entities

## User

* **id**: `ID!` — Unique identifier for the user (UUID)
* **name**: `String!` — Full name of the user
* **email**: `String!` — Email address, unique
* **createdAt**: `DateTime!` — Timestamp when the user was created

**Constraints & Indexes**

* `email` must be unique
* Index on `createdAt` for sorting or archival operations

---

## Event

* **id**: `ID!` — Unique identifier for the event (UUID)
* **title**: `String!` — Title or name of the event
* **date**: `DateTime!` — Scheduled date/time of the event
* **description**: `String` — Optional description or notes about the event
* **creatorId**: `ID!` — Reference to the `User.id` of the creator
* **attendeeCount**: `Int!` — Computed field reflecting number of attendees

**Relationships**

* Many-to-one: Event → User (creator)
* Many-to-many (via join): Event ↔ Attendee
* Many-to-many (via join): Event ↔ Tag

**Constraints & Indexes**

* Index on `(date)` for querying upcoming events
* Foreign key constraint on `creatorId`

---

## Attendee

* **id**: `ID!` — Unique identifier for the attendee (UUID)
* **name**: `String!` — Full name of the attendee
* **email**: `String` — Optional email address
* **createdAt**: `DateTime!` — Timestamp when the attendee record was created

**Constraints & Indexes**

* No uniqueness on `email` (same person could use multiple emails or duplicate entries)
* Index on `createdAt`

---

## Tag

* **id**: `ID!` — Unique identifier for the tag (UUID)
* **name**: `String!` — Tag label (e.g., "Internal", "Public")

**Constraints & Indexes**

* `name` should be unique to prevent duplicate tags
* Index on `name` for quick lookup

---

## EventAttendee (Join Entity)

Tracks each attendee’s RSVP and status for an event.

* **eventId**: `ID!` — References `Event.id`
* **attendeeId**: `ID!` — References `Attendee.id`
* **rsvpStatus**: `RSVP!` — RSVP status, enum: `YES`, `NO`, `MAYBE`
* **joinedAt**: `DateTime!` — Timestamp when the attendee was added

**Composite Primary Key**

* `(eventId, attendeeId)` — Ensures a user can only RSVP once per event

**Constraints & Indexes**

* Foreign keys on `eventId` and `attendeeId`
* Index on `rsvpStatus` for filtering

---

## EventTag (Join Entity)

Associates tags with events.

* **eventId**: `ID!` — References `Event.id`
* **tagId**: `ID!` — References `Tag.id`

**Composite Primary Key**

* `(eventId, tagId)` — Prevents duplicate tag assignments

**Constraints & Indexes**

* Foreign keys on `eventId` and `tagId`

---

## Assumptions

1. **Users vs. Attendees**: Users are authenticated creators; Attendees are simple guests with minimal data.
2. **Timestamps**: `DateTime` fields use ISO 8601 strings in UTC.
3. **RSVP Status**: Now defined as a proper GraphQL enum (`RSVP: YES, NO, MAYBE`) rather than a free-form string.
4. **Performance**: Indexes chosen for typical query patterns: upcoming events, filtering attendees by status, tag lookups.
5. **Scalability**: In-memory store is temporary; a real DB would enforce these constraints and indexes automatically.

---