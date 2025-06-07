import * as Yup from 'yup';
import { RSVP } from '@/lib/types/graphql';

export const attendeeValidationSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be at most 100 characters'),
  email: Yup.string()
    .email('Invalid email address')
    .max(255, 'Email must be at most 255 characters'),
  rsvp: Yup.string()
    .required('RSVP status is required')
    .oneOf(['YES', 'NO', 'MAYBE'] as RSVP[], 'Invalid RSVP status'),
}); 