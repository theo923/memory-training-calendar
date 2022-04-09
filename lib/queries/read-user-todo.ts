import { gql } from '@apollo/client'

export const READ_USER_TODO_QUERY = gql`
  query UserTask($id: String!, $start: Int) {
    userTasks(filters: { userID: { eq: $id } }) {
      data {
        id
        attributes {
          userID
          userName
          todo(pagination: { start: $start, limit: 10 }) {
            id
            title
            description
            finished
          }
        }
      }
    }
  }
`

export const READ_USER_TODO_ALL_QUERY = gql`
  query UserTask($id: String!) {
    userTasks(filters: { userID: { eq: $id } }) {
      data {
        id
        attributes {
          userID
          userName
          todo(pagination: { start: 0, limit: 99999 }) {
            id
            title
            description
            finished
          }
        }
      }
    }
  }
`
