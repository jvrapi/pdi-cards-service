import {
  ApolloServerPlugin,
  BaseContext,
  GraphQLRequestContext,
  GraphQLRequestListener,
} from '@apollo/server'
import newrelic from 'newrelic'

export class NewRelicPlugin implements ApolloServerPlugin {
  async requestDidStart(): Promise<void | GraphQLRequestListener<BaseContext>> {
    return {
      async didResolveOperation(requestContext) {
        newrelic.setTransactionName(
          requestContext.operationName || 'noOperationName',
        )
      },
    }
  }
}
