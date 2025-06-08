/**
 * Custom hook for managing event-related operations
 * 
 * This hook provides a set of functions and state for managing events in the application.
 * It handles fetching events, creating new events, and managing event data.
 * 
 * @example
 * ```tsx
 * const { events, loading, error, createEvent } = useEvent();
 * ```
 */

import { useQuery, useMutation, ApolloQueryResult } from '@apollo/client';
import { GET_EVENTS, GET_EVENT } from '@/graphql/client/operations/queries';
import { CREATE_EVENT } from '@/graphql/client/operations/mutations';
import { Event, CreateEventInput, GetEventsQuery, GetEventQuery } from '@/lib/types/graphql';

interface UseEventOptions {
  eventId?: string;
}

interface UseEventReturn {
  // Data
  events: Event[] | undefined;
  event: Event | undefined;
  
  // Loading states
  isLoadingEvents: boolean;
  isLoadingEvent: boolean;
  isCreatingEvent: boolean;
  
  // Error states
  eventsError: Error | undefined;
  eventError: Error | undefined;
  
  // Operations
  createEvent: (input: CreateEventInput) => Promise<Event>;
  refetchEvents: () => Promise<ApolloQueryResult<GetEventsQuery>>;
  refetchEvent: () => Promise<ApolloQueryResult<GetEventQuery>>;
}

/**
 * Hook for managing event operations
 * @returns Object containing event data and operations
 */
export const useEvent = ({ eventId }: UseEventOptions = {}): UseEventReturn => {
  /**
   * Query hook for fetching all events
   */
  const { 
    data: eventsData, 
    loading: isLoadingEvents,
    error: eventsError,
    refetch: refetchEvents 
  } = useQuery(GET_EVENTS, {
    skip: !!eventId,
  });

  /**
   * Query hook for fetching a single event
   */
  const { 
    data: eventData, 
    loading: isLoadingEvent,
    error: eventError,
    refetch: refetchEvent 
  } = useQuery(GET_EVENT, {
    variables: { id: eventId },
    skip: !eventId,
  });

  /**
   * Mutation hook for creating a new event
   */
  const [createEventMutation, { loading: isCreatingEvent }] = useMutation(CREATE_EVENT, {
    onCompleted: () => {
      refetchEvents();
    },
  });

  /**
   * Creates a new event
   * @param input - The event creation data
   * @returns Promise that resolves to the created event
   * @throws Error if event creation fails
   */
  const createEvent = async (input: CreateEventInput): Promise<Event> => {
    try {
      const { data } = await createEventMutation({
        variables: { input },
      });
      return data.createEvent as Event;
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