import { GraphQLFormattedError } from 'graphql';

export const ErrorInterceptor = (formattedError: GraphQLFormattedError): GraphQLFormattedError => {
  console.log(formattedError)
  return {message: formattedError.message,
  extensions: {
    status: formattedError?.extensions?.status,
  },}
};
