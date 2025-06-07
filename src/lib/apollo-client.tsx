/**
 * Apollo Client
 * 
 * This module contains the Apollo Client configuration.
 * It uses the Apollo Client library to create a GraphQL client.
 * 
 * @module lib/apollo-client
 */

import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { apiConfig } from './config';

/**
 * The HTTP link for the Apollo Client
 */
const httpLink = new HttpLink({
  uri: apiConfig.graphqlEndpoint,
  credentials: 'same-origin',
});

/**
 * The Apollo Client
 */
export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: apiConfig.defaultFetchPolicy,
    },
  },
}); 