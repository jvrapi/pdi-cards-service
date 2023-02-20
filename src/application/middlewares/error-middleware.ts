import { GraphQLFormattedError } from 'graphql'

export const formatError = (
  formattedError: GraphQLFormattedError,
): GraphQLFormattedError => ({
  message: formattedError.message,
  extensions: {
    status: formattedError?.extensions?.status,
  },
})
