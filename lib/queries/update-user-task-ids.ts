import { gql } from '@apollo/client'

export const UPDATE_USER_TASK_IDs = gql`
  mutation UpdateUserTaskIDs($id: ID!, $idArr: [ID]) {
    updateUserTask(id: $id, data: { tasks: $idArr }) {
      data {
        attributes {
          tasks {
            data {
              attributes {
                taskTitle
                taskDescription
              }
            }
          }
        }
      }
    }
  }
`
