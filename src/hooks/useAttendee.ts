import { useMutation } from '@apollo/client';
import { ADD_ATTENDEE, REMOVE_ATTENDEE } from '@/graphql/operations/mutations';
import { GET_EVENT } from '@/graphql/operations/queries';
import { Attendee, RSVP } from '@/lib/types/graphql';

interface UseAttendeeOptions {
  eventId: string;
}

export const useAttendee = ({ eventId }: UseAttendeeOptions) => {
  // Mutation for adding an attendee
  const [addAttendeeMutation, { loading: isAddingAttendee }] = useMutation(ADD_ATTENDEE, {
    refetchQueries: [
      {
        query: GET_EVENT,
        variables: { id: eventId },
      },
    ],
  });

  // Mutation for removing an attendee
  const [removeAttendeeMutation, { loading: isRemovingAttendee }] = useMutation(REMOVE_ATTENDEE, {
    refetchQueries: [
      {
        query: GET_EVENT,
        variables: { id: eventId },
      },
    ],
  });

  const addAttendee = async (input: { name: string; email?: string; rsvp: RSVP }) => {
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

  const removeAttendee = async (attendeeId: string) => {
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