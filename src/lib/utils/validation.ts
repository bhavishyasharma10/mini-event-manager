import { CreateEventInput, AddAttendeeInput } from '@/lib/types/graphql';
import { GraphQLError } from 'graphql';

/**
 * Custom error class for application-specific errors
 */
export class EventManagerError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = 'EventManagerError';
  }
}

/**
 * Error codes enum for better type safety
 */
export enum ErrorCode {
  INVALID_INPUT = 'INVALID_INPUT',
  NOT_FOUND = 'NOT_FOUND',
  DUPLICATE_EMAIL = 'DUPLICATE_EMAIL',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR'
}

/**
 * Helper to convert EventManagerError to GraphQLError
 */
export const toGraphQLError = (error: unknown): GraphQLError => {
  if (error instanceof EventManagerError) {
    return new GraphQLError(error.message, {
      extensions: { code: error.code }
    });
  }
  return new GraphQLError('An unexpected error occurred', {
    extensions: { code: ErrorCode.INTERNAL_SERVER_ERROR }
  });
};

/**
 * Validation helpers
 */
export const validateCreateEventInput = (input: CreateEventInput): void => {
  if (!input.title?.trim()) {
    throw new EventManagerError('Event title is required', ErrorCode.INVALID_INPUT);
  }
  if (!input.date) {
    throw new EventManagerError('Event date is required', ErrorCode.INVALID_INPUT);
  }
  if (new Date(input.date) < new Date()) {
    throw new EventManagerError('Event date cannot be in the past', ErrorCode.INVALID_INPUT);
  }
};

export const validateAddAttendeeInput = (input: AddAttendeeInput): void => {
  if (!input.name?.trim()) {
    throw new EventManagerError('Attendee name is required', ErrorCode.INVALID_INPUT);
  }
  if (!input.email?.trim()) {
    throw new EventManagerError('Attendee email is required', ErrorCode.INVALID_INPUT);
  }
  if (!input.email.includes('@')) {
    throw new EventManagerError('Invalid email format', ErrorCode.INVALID_INPUT);
  }
  if (!input.eventId?.trim()) {
    throw new EventManagerError('Event ID is required', ErrorCode.INVALID_INPUT);
  }
};

/**
 * Helper to validate IDs
 */
export const validateIds = (eventId: string, attendeeId?: string): void => {
  if (!eventId?.trim()) {
    throw new EventManagerError('Event ID is required', ErrorCode.INVALID_INPUT);
  }
  if (attendeeId && !attendeeId.trim()) {
    throw new EventManagerError('Attendee ID is required', ErrorCode.INVALID_INPUT);
  }
};

/**
 * Helper to check for duplicate emails
 */
export const hasDuplicateEmail = (email: string | undefined, existingEmails: (string | undefined)[]): boolean => {
  if (!email) return false;
  return existingEmails.some(existingEmail => 
    existingEmail && existingEmail.toLowerCase() === email.toLowerCase()
  );
}; 