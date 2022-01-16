import { gql } from '@apollo/client'

export const READ_USER_TODO_QUERY = gql`
  query UserTask($id: String!) {
    userTasks(filters: { userID: { eq: $id } }) {
      data {
        id
        attributes {
          userID
          userName
          todo {
            title
            description
            finished
          }
        }
      }
    }
  }
`
