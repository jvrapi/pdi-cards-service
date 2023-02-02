import 'dotenv/config';
import 'reflect-metadata';
import './container';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { CardsResolver } from '@application/resolvers/cards-resolver';
import { SetsResolver } from '@application/resolvers/sets-resolver';
import { resolve } from 'node:path';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';
import { ErrorInterceptor as formatError } from '@application/middlewares/error-interceptor';


export const createApolloServer = async () => {
  const schema = await buildSchema({
    resolvers: [CardsResolver, SetsResolver],
    emitSchemaFile: resolve(__dirname, './schema.gql'),
    container: Container,
  });

  const server = new ApolloServer({
    schema,
    formatError,
  });

  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => ({ token: req.headers.authorization, user: { id: '' } }),

  });

  console.log(`🚀 Server ready on ${url} 🚀`);

  return { server, url };
};
