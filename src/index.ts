import { ApolloServerPlugin } from '@apollo/server'
import createNewRelicPlugin from '@newrelic/apollo-server-plugin'

import { initServer } from './server'

initServer().then(({ server }) => {
  const newRelicPlugin = createNewRelicPlugin<ApolloServerPlugin>({})

  server.addPlugin(newRelicPlugin)
})
