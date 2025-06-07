import * as Yup from 'yup';
import { appConfig } from '@/lib/config';

/**
 * The validation schema for an event
 */
export const eventValidationSchema = Yup.object({
  title: Yup.string()
    .required('Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(appConfig.maxEventTitleLength, `Title must be at most ${appConfig.maxEventTitleLength} characters`),
  date: Yup.date()
    .required('Date is required')
    .min(new Date(), 'Event date must be in the future'),
});