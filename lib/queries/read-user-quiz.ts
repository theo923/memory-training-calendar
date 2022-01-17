import { gql } from '@apollo/client'

export const READ_USER_QUIZ_QUERY = gql`
  query UserTask($id: String!) {
    userTasks(filters: { userID: { eq: $id } }) {
      data {
        id
        attributes {
          userID
          userName
          quizbook {
            name
            description
            attempt
            quiz {
              question
              answer
              prompt
              finished_date
              last_answer
            }
          }
        }
      }
    }
  }
`
