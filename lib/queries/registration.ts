import { gql } from '@apollo/client'

export const REGISTRATION_QUERY = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    register(
      input: { username: $username, email: $email, password: $password }
    ) {
      jwt
      user {
        username
        email
      }
    }
  }
`
