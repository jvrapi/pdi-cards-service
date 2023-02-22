import { GraphQLFormattedError } from 'graphql'

import { logger } from '@/utils/logger'

export const formatError = (
  formattedError: GraphQLFormattedError,
): GraphQLFormattedError => {
  const error = {
    message: formattedError.message,
    extensions: {
      status: formattedError?.extensions?.status,
    },
  }

  logger.error(formattedError)

  return error
}
