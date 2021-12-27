import { gql } from '@apollo/client'

export const CREATE_TASK_MUTATION = gql`
  mutation CreateTask(
    $userID: String
    $userName: String
    $targetedDate: [ComponentSingleTaskTaskDateInput]
    $taskTitle: String!
    $taskDescription: String!
    $publishedAt: DateTime
  ) {
    createTask(
      data: {
        userID: $userID
        userName: $userName
        targetedDate: $targetedDate
        taskTitle: $taskTitle
        taskDescription: $taskDescription
        publishedAt: $publishedAt
      }
    ) {
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
