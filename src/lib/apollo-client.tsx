import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { apiConfig } from './config';

const httpLink = new HttpLink({
  uri: apiConfig.graphqlEndpoint,
  credentials: 'same-origin',
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: apiConfig.defaultFetchPolicy,
    },
  },
}); 