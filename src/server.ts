import 'dotenv/config'
import './container'

import { resolve } from 'node:path'

import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { container } from 'tsyringe'
import { buildSchema } from 'type-graphql'

import { formatError } from './application/middlewares/error-middleware'
import { CardResolver } from './application/resolvers/card-resolver'

export async function initServer() {
  const schema = await buildSchema({
    resolvers: [CardResolver],
    emitSchemaFile: resolve(__dirname, './schema.gql'),
    container: { get: (cls) => container.resolve(cls) },
  })

  const server = new ApolloServer({
    schema,
    formatError,
  })

  const { url } = await startStandaloneServer(server)

  console.log(`🚀 Server ready on ${url} 🚀`)

  return { server, url }
}
