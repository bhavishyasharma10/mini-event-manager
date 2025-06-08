import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { typeDefs } from '@/graphql/server/schema';
import { resolvers } from '@/graphql/server/resolvers';
import { appConfig } from '@/lib/config';
import { NextRequest } from 'next/server';
import { GraphQLError } from 'graphql';

/**
 * Create Apollo Server instance with enhanced configuration
 */
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: appConfig.environment === 'development',
  formatError: (error) => {
    console.error('GraphQL Error:', error);

    if (appConfig.environment === 'production' && !error.extensions?.code) {
      return new GraphQLError('Internal server error', {
        extensions: { code: 'INTERNAL_SERVER_ERROR' }
      });
    }

    return error;
  },
  plugins: [
    {
      async serverWillStart() {
        console.log('Apollo Server starting up!');
      },
      async requestDidStart() {
        return {
          async willSendResponse(requestContext) {
            const { response } = requestContext;
            if (response.http) {
              response.http.headers.set('x-graphql-server', 'mini-event-manager');
            }
          },
        };
      },
    },
  ],
});

/**
 * Create and export the handler with CORS support
 */
const handler = startServerAndCreateNextHandler(server, {
  context: async (req: NextRequest) => {
    return {
      req,
    };
  },
});

export { handler as GET, handler as POST }; 