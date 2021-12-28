import { gql } from '@apollo/client'

export const READ_USER_TASK_IDs = gql`
  query ReadUserTaskIDs($userID: String!) {
    userTasks(filters: { userID: { eq: $userID } }) {
      data {
        id
        attributes {
          tasks {
            data {
              id
            }
          }
        }
      }
    }
  }
`
