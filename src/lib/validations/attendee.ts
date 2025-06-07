import * as Yup from 'yup';
import { RSVP } from '@/lib/types/graphql';
import { appConfig } from '@/lib/config';

export const attendeeValidationSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(appConfig.maxAttendeeNameLength, `Name must be at most ${appConfig.maxAttendeeNameLength} characters`),
  email: Yup.string()
    .email('Invalid email address')
    .max(appConfig.maxAttendeeEmailLength, `Email must be at most ${appConfig.maxAttendeeEmailLength} characters`),
  rsvp: Yup.string()
    .required('RSVP status is required')
    .oneOf(['YES', 'NO', 'MAYBE'] as RSVP[], 'Invalid RSVP status'),
}); 