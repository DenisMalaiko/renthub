import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core'
import fetch from 'cross-fetch'

export const getApolloClient = (apiUrl: string) => {
  return new ApolloClient({
    link: new HttpLink({
      uri: `${apiUrl}/graphql`,
      fetch
    }),
    cache: new InMemoryCache()
  })
}