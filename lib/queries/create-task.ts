import { gql } from '@apollo/client'

export const CREATE_TASK_MUTATION = gql`
  mutation CreateTask(
    $userID: String
    $userName: String
    $targetedDate: [ComponentSingleTaskTaskDateInput]
    $taskTitle: String!
    $taskDescription: String!
    $taskColor: String!
    $publishedAt: DateTime
  ) {
    createTask(
      data: {
        userID: $userID
        userName: $userName
        targetedDate: $targetedDate
        taskTitle: $taskTitle
        taskDescription: $taskDescription
        taskColor: $taskColor
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
          taskColor
          publishedAt
        }
      }
    }
  }
`
