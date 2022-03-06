import { gql } from '@apollo/client'

export const UPDATE_USER_QUIZBOOKS = gql`
  mutation UpdateUserQuizBooks(
    $id: ID!
    $quizbook: [ComponentQuizQuizBookInput]
  ) {
    updateUserTask(id: $id, data: { quizbook: $quizbook }) {
      data {
        id
        attributes {
          quizbook {
            name
            description
            quiz {
              question
              answer
              last_answer
              finished_date
              prompt
            }
            attempt
            slug
          }
        }
      }
    }
  }
`
