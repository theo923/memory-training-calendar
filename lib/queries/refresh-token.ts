import { gql } from '@apollo/client'

export const REFRESH_TOKEN_MUTATION = gql`
  mutation refreshToken($identifier: String!, $password: String!) {
    login(input: { identifier: $identifier, password: $password }) {
      jwt
      user {
        id
        username
      }
    }
  }
`
