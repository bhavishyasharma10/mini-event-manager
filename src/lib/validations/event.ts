import * as Yup from 'yup';

export const eventValidationSchema = Yup.object({
  title: Yup.string()
    .required('Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be at most 100 characters'),
  date: Yup.date()
    .required('Date is required')
    .min(new Date(), 'Event date must be in the future'),
});

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
    .oneOf(['YES', 'NO', 'MAYBE'], 'Invalid RSVP status'),
}); 