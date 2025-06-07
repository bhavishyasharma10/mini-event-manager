import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const startServer = async () => {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(
    '/graphql',
    cors(),
    bodyParser.json(),
    expressMiddleware(server)
  );

  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`🚀 GraphQL server ready at http://localhost:${PORT}/graphql`);
  });
};

startServer();
