import { gql } from '@apollo/client'

export const DELETE_TASK_MUTATION = gql`
  mutation DeleteTask(
    $id: ID!
  ) {
    deleteTask(id: $id) {
      data {
        id
        attributes {
          userID
          userName
          targetedDate {
            t_date
            t_period
          }
          taskTitle
          taskDescription
          publishedAt
        }
      }
    }
  }
`
