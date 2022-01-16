import { gql } from '@apollo/client'

export const UPDATE_USER_TODO = gql`
  mutation UpdateUserTodo($id: ID!, $todo: [ComponentTodoTodoContentInput]) {
    updateUserTask(id: $id, data: { todo: $todo }) {
      data {
        id
      }
    }
  }
`
