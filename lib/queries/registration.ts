import { gql } from '@apollo/client'

export const REGISTRATION_USER_QUERY = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    register(
      input: { username: $username, email: $email, password: $password }
    ) {
      jwt
      user {
        id
        username
        email
      }
    }
  }
`

export const REGISTRATION_USER_INFO_QUERY = gql`
  mutation createUserInfo(
    $userID: String!
    $userName: String!
    $publishedAt: DateTime
  ) {
    createUserTask(
      data: {
        userID: $userID
        userName: $userName
        tasks: []
        publishedAt: $publishedAt
      }
    ) {
      data {
        id
        attributes {
          userName
          userID
          tasks {
            data {
              id
            }
          }
          createdAt
        }
      }
    }
    createUserSetting(
      data: {
        userID: $userID
        userName: $userName
        publishedAt: $publishedAt
      }
    ) {
      data {
        id
        attributes {
          userName
          userID
          bgColor
          createdAt
        }
      }
    }
  }
`
