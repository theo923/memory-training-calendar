import { gql } from '@apollo/client'

export const UPDATE_TASK_INFO_MUTATION = gql`
  mutation UpdateTask(
    $id: ID!
    $taskTitle: String!
    $taskDescription: String!
    $taskColor: String!
  ) {
    updateTask(
      id: $id
      data: {
        taskTitle: $taskTitle
        taskDescription: $taskDescription
        taskColor: $taskColor
      }
    ) {
      data {
        id
        attributes {
          userID
          userName
          taskTitle
          taskDescription
          taskColor
          updatedAt
        }
      }
    }
  }
`
