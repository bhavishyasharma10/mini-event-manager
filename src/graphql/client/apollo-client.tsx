/**
 * Apollo Client
 * 
 * This module contains the Apollo Client configuration.
 * It uses the Apollo Client library to create a GraphQL client.
 * Supports both client-side and server-side operations.
 * 
 * @module lib/apollo-client
 */

import { ApolloClient, InMemoryCache, HttpLink, from, ApolloLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { RetryLink } from '@apollo/client/link/retry';
import { apiConfig } from '@/lib/config';

/**
 * Error handling link for Apollo Client
 */
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

/**
 * Retry link for handling transient failures
 */
const retryLink = new RetryLink({
  delay: {
    initial: apiConfig.retryConfig.initialDelay,
    max: apiConfig.retryConfig.maxDelay,
    jitter: true
  },
  attempts: {
    max: apiConfig.retryConfig.maxAttempts,
    retryIf: (error, _operation) => !!error
  }
});

/**
 * The HTTP link for the Apollo Client
 * Uses a relative URL for client-side requests to hit the Next.js API route
 */
const httpLink = new HttpLink({
  uri: '/api/graphql', // Use relative URL for client-side requests
  credentials: 'same-origin',
});

/**
 * The Apollo Client
 */
export const client = new ApolloClient({
  link: from([
    errorLink,
    retryLink,
    new ApolloLink((operation, forward) => {
      // Add any custom headers or context here if needed
      return forward(operation);
    }),
    httpLink
  ]),
  cache: new InMemoryCache({
    typePolicies: {
      Event: {
        keyFields: ['id'],
        fields: {
          attendees: {
            merge: false // Don't merge attendees array, replace it
          }
        }
      }
    }
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: apiConfig.defaultFetchPolicy,
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: apiConfig.defaultFetchPolicy,
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
}); 