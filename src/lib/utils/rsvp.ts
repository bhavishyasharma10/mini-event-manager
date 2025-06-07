import { RSVP } from '@/lib/types/graphql';

export const getRsvpStyles = (rsvp: RSVP): string => {
  switch (rsvp) {
    case 'YES':
      return 'bg-green-100 text-green-800';
    case 'NO':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-yellow-100 text-yellow-800';
  }
};

export const getRsvpLabel = (rsvp: RSVP): string => {
  switch (rsvp) {
    case 'YES':
      return 'Attending';
    case 'NO':
      return 'Not Attending';
    case 'MAYBE':
      return 'Maybe';
    default:
      return rsvp;
  }
}; 