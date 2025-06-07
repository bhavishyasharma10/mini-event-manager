export type Attendee = {
    id: string;
    name: string;
    email?: string;
    rsvp: 'YES' | 'NO' | 'MAYBE';
};

export type Tag = {
    id: string;
    name: string;
};

export type Event = {
    id: string;
    title: string;
    date: string; // ISO date
    tags: Tag[];
    attendees: Attendee[];
};
