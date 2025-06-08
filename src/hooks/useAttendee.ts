/**
 * Custom hook for managing attendee-related operations
 * 
 * This hook provides a set of functions and state for managing attendees in the application.
 * It handles adding and removing attendees from events.
 * 
 * @example
 * ```tsx
 * const { addAttendee, removeAttendee, loading, error } = useAttendee();
 * ```
 */

import { useMutation } from '@apollo/client';
import { ADD_ATTENDEE, REMOVE_ATTENDEE } from '@/graphql/client/operations/mutations';
import { GET_EVENT } from '@/graphql/client/operations/queries';
import { Attendee, AddAttendeeInput } from '@/lib/types/graphql';

interface UseAttendeeOptions {
  eventId: string;
}

interface UseAttendeeReturn {
  // Loading states
  isAddingAttendee: boolean;
  isRemovingAttendee: boolean;
  
  // Operations
  addAttendee: (input: Omit<AddAttendeeInput, 'eventId'>) => Promise<Attendee>;
  removeAttendee: (attendeeId: string) => Promise<boolean>;
}

/**
 * Hook for managing attendee operations
 * @returns Object containing attendee operations and loading/error states
 */
export const useAttendee = ({ eventId }: UseAttendeeOptions): UseAttendeeReturn => {
  /**
   * Mutation hook for adding an attendee
   */
  const [addAttendeeMutation, { loading: isAddingAttendee }] = useMutation(ADD_ATTENDEE, {
    refetchQueries: [
      {
        query: GET_EVENT,
        variables: { id: eventId },
      },
    ],
  });

  /**
   * Mutation hook for removing an attendee
   */
  const [removeAttendeeMutation, { loading: isRemovingAttendee }] = useMutation(REMOVE_ATTENDEE, {
    refetchQueries: [
      {
        query: GET_EVENT,
        variables: { id: eventId },
      },
    ],
  });

  /**
   * Add an attendee to an event
   */
  const addAttendee = async (input: Omit<AddAttendeeInput, 'eventId'>): Promise<Attendee> => {
    try {
      const { data } = await addAttendeeMutation({
        variables: {
          input: {
            eventId,
            ...input,
          },
        },
      });
      return data.addAttendee as Attendee;
    } catch (error) {
      console.error('Error adding attendee:', error);
      throw error;
    }
  };

  /**
   * Remove an attendee from an event
   */
  const removeAttendee = async (attendeeId: string): Promise<boolean> => {
    try {
      const { data } = await removeAttendeeMutation({
        variables: {
          eventId,
          attendeeId,
        },
      });
      return data.removeAttendee as boolean;
    } catch (error) {
      console.error('Error removing attendee:', error);
      throw error;
    }
  };

  return {
    // Loading states
    isAddingAttendee,
    isRemovingAttendee,
    
    // Operations
    addAttendee,
    removeAttendee,
  };
}; 