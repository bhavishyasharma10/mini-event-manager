import { useQuery, useMutation } from '@apollo/client';
import { GET_EVENTS, GET_EVENT } from '@/graphql/operations/queries';
import { CREATE_EVENT } from '@/graphql/operations/mutations';
import { Event } from '@/lib/types/graphql';

interface UseEventOptions {
  eventId?: string;
}

export const useEvent = ({ eventId }: UseEventOptions = {}) => {
  // Query for all events
  const { 
    data: eventsData, 
    loading: isLoadingEvents,
    error: eventsError,
    refetch: refetchEvents 
  } = useQuery(GET_EVENTS, {
    skip: !!eventId,
  });

  // Query for a single event
  const { 
    data: eventData, 
    loading: isLoadingEvent,
    error: eventError,
    refetch: refetchEvent 
  } = useQuery(GET_EVENT, {
    variables: { id: eventId },
    skip: !eventId,
  });

  // Mutation for creating a new event
  const [createEventMutation, { loading: isCreatingEvent }] = useMutation(CREATE_EVENT, {
    onCompleted: () => {
      refetchEvents();
    },
  });

  const createEvent = async (input: { title: string; date: string }) => {
    try {
      const { data } = await createEventMutation({
        variables: { input },
      });
      return data.createEvent;
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  };

  return {
    // Data
    events: eventsData?.events as Event[] | undefined,
    event: eventData?.event as Event | undefined,
    
    // Loading states
    isLoadingEvents,
    isLoadingEvent,
    isCreatingEvent,
    
    // Error states
    eventsError,
    eventError,
    
    // Operations
    createEvent,
    refetchEvents,
    refetchEvent,
  };
}; 