# NOTES.md

## Assumptions

1. **Users vs. Attendees**: Users are authenticated creators; Attendees are simple guests with minimal data. (See ENTITIES.md)
2. **Timestamps**: All `DateTime` fields use ISO 8601 strings in UTC. (See ENTITIES.md)
3. **RSVP Status**: RSVP is a strict enum (`YES`, `NO`, `MAYBE`) in the schema, not a free-form string. (See ENTITIES.md, schema.ts)
4. **Performance**: Indexes and constraints are described in ENTITIES.md for a real DB, but not enforced in the in-memory store.
5. **Scalability**: The backend uses an in-memory store for all data (see resolvers.ts, data.ts). This is temporary and not suitable for production or persistence.
6. **Validation**: Form validation is implemented using Yup schemas for both events and attendees. (See src/lib/validations/)
7. **Email Uniqueness**: Attendee emails are not required to be unique globally, but duplicate emails for the same event are prevented. (See ENTITIES.md, resolvers.ts)
8. **Environment Variables**: The app supports environment variable overrides for config, but defaults are provided. (See config.ts)
9. **Attendee Email**: Email is optional for attendees, but if provided, must be valid. (See ENTITIES.md, validation.ts)
10. **Tags**: Tag names should be unique. (See ENTITIES.md)
11. **Homepage**: A basic homepage was created to navigate to the events or create new events.

## Known Issues & Limitations

1. **In-Memory Data**: All data is lost on server restart. No persistence layer is implemented. (See resolvers.ts, data.ts)
2. **No Authentication/Authorization**: There is no user authentication or authorization implemented. All actions are open. (See ENTITIES.md, schema.ts)
3. **No Real Users**: The User entity is only described in ENTITIES.md and not implemented in the mock API or UI.
4. **No Tag Management**: Tag creation/assignment is described in ENTITIES.md but not implemented in the schema, resolvers, or UI.
5. **No Event Update/Delete**: Only event creation and attendee management are implemented. Event update and delete are not present. (See schema.ts)
6. **No Attendee Update**: Attendees can only be added or removed, not updated. (See schema.ts)
7. **No Pagination**: All events and attendees are returned in full; there is no pagination or filtering. (See queries.ts, resolvers.ts)
8. **No Error Handling UI**: Errors are thrown and returned from the API, but there is no advanced error handling or user feedback in the UI.
9. **No Real Email Validation**: Email validation is basic (checks for '@'), not RFC-compliant. (See validation.ts)
10. **No Rate Limiting or Security Controls**: The API is open and does not implement any rate limiting, security headers, or protections. 
11. **Basic Loading States**: Only simple loading indicators are implemented (e.g., "Loading...") without skeleton loaders or progressive loading. (See events/page.tsx)
12. **Missing Back Navigation**: Some Pages lacks a back button functionality


