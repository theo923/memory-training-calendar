import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { NEXT_PUBLIC_API_URL } from './env'

const httpLink = createHttpLink({
  uri: `${NEXT_PUBLIC_API_URL}/graphql`,
  // uri: "http://localhost:1337/graphql",
})

export const DEFAULT_HEADERS = (token: string) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
}

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})
