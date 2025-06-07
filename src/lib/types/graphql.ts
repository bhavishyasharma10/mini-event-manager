export type RSVP = 'YES' | 'NO' | 'MAYBE';

export interface Tag {
    id: string;
    name: string;
}

export interface Attendee {
    id: string;
    name: string;
    email?: string;
    rsvp: RSVP;
}

export interface Event {
    id: string;
    title: string;
    date: string; // ISO date
    tags: Tag[];
    attendees: Attendee[];
}

export interface CreateEventInput {
    title: string;
    date: string;
}

export interface AddAttendeeInput {
    eventId: string;
    name: string;
    email?: string;
    rsvp: RSVP;
}
