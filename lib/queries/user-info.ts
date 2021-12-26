import { gql } from '@apollo/client'

export const USER_INFO_QUERY = gql`
  query GetInfo {
    me {
      id
      username
    }
  }
`
