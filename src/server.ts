import './container';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { resolve } from 'node:path';
import { container } from 'tsyringe';
import { buildSchema } from 'type-graphql';
import { ErrorInterceptor as formatError } from './application/middlewares/error-interceptor';
import { SetsResolver } from './application/resolvers/sets-resolver';

export const createApolloServer = async () => {
  const schema = await buildSchema({
    resolvers: [SetsResolver],
    container: {
      get: (cls) => container.resolve(cls)
    },
  });

  const server = new ApolloServer({
    schema,
    formatError,
  });

  const { url } = await startStandaloneServer(server);

  console.log(`🚀 Server ready on ${url} 🚀`);

  return { server, url };
};
