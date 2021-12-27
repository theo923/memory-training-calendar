import { gql } from '@apollo/client'

export const UPDATE_TASK_INFO_MUTATION = gql`
  mutation UpdateTask(
    $id: ID!
    $taskTitle: String
    $taskDescription: String
  ) {
    updateTask(
      id: $id
      data: {
        taskTitle: $taskTitle
        taskDescription: $taskDescription
      }
    ) {
      data {
        id
        attributes {
          taskTitle
          taskDescription
          updatedAt
        }
      }
    }
  }
`
