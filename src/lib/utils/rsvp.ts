import { RSVP } from '@/lib/types/graphql';

/**
 * Get the styles for an RSVP
 * @param rsvp - The RSVP status
 * @returns The styles for the RSVP
 */
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

/**
 * Get the label for an RSVP
 * @param rsvp - The RSVP status
 * @returns The label for the RSVP
 */
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