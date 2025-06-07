import * as Yup from 'yup';
import { appConfig } from '@/lib/config';

export const eventValidationSchema = Yup.object({
  title: Yup.string()
    .required('Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(appConfig.maxEventTitleLength, `Title must be at most ${appConfig.maxEventTitleLength} characters`),
  date: Yup.date()
    .required('Date is required')
    .min(new Date(), 'Event date must be in the future'),
});

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
    .oneOf(['YES', 'NO', 'MAYBE'], 'Invalid RSVP status'),
}); 