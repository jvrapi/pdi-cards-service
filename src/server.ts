import 'dotenv/config'
import './container'

import { ApolloServer, ApolloServerPlugin } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import createNewRelicPlugin from '@newrelic/apollo-server-plugin'
import { container } from 'tsyringe'
import { buildSchema } from 'type-graphql'

import { formatError } from './application/middlewares/error-middleware'
import { CardResolver } from './application/resolvers/card-resolver'
import { RabbitMQ } from './infra/messaging/rabbitmq'

export async function initServer() {
  const schema = await buildSchema({
    resolvers: [CardResolver],
    container: { get: (cls) => container.resolve(cls) },
  })

  const newRelicPlugin = createNewRelicPlugin<ApolloServerPlugin>({})

  const server = new ApolloServer({
    schema,
    formatError,
    plugins: [newRelicPlugin],
  })

  const port = process.env.APP_PORT ? +process.env.APP_PORT : 4000

  await RabbitMQ.init()

  const { url } = await startStandaloneServer(server, {
    listen: {
      port,
    },
  })

  console.log(`🚀 Server ready on ${url} 🚀`)

  return { server, url }
}
