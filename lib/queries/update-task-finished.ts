import { gql } from '@apollo/client'

export const UPDATE_TASK_FINISHED_MUTATION = gql`
  mutation UpdateTask(
    $id: ID!
    $targetedDate: [ComponentSingleTaskTaskDateInput]
  ) {
    updateTask(id: $id, data: { targetedDate: $targetedDate }) {
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
