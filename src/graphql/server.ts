/**
 * GraphQL Server
 * 
 * This module contains the Apollo Server configuration.
 * It uses the Apollo Server library to create a GraphQL server.
 * 
 * @module graphql/server
 */
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { apiConfig, appConfig } from '@/lib/config';

/**
 * Start the GraphQL server
 */
const startServer = async () => {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: appConfig.environment === 'development',
  });

  await server.start();

  app.use(
    '/graphql',
    cors({
      origin: appConfig.environment === 'development' ? 'http://localhost:3000' : undefined,
      credentials: true,
    }),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ req }),
    })
  );

  const PORT = parseInt(apiConfig.graphqlEndpoint.split(':')[2]?.split('/')[0] || '4000', 10);
  app.listen(PORT, () => {
    console.log(`🚀 GraphQL server ready at ${apiConfig.graphqlEndpoint}`);
  });
};

startServer();
