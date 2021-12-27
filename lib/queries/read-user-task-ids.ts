import { gql } from '@apollo/client'

export const READ_USER_TASK_IDs = gql`
  query ReadUserTaskIDs($id: ID!) {
    userTask(id: $id) {
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
