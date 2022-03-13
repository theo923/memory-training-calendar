import { gql } from '@apollo/client'

export const READ_USER_QUIZ_QUERY = gql`
  query UserTask($id: String!, $start: Int) {
    userTasks(filters: { userID: { eq: $id } }) {
      data {
        id
        attributes {
          userID
          userName
          quizbook(pagination: { start: $start, limit: 3 }) {
            id
            name
            description
            attempt
            slug
            quiz {
              id
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

export const READ_USER_QUIZ_ALL_QUERY = gql`
  query UserTask($id: String!) {
    userTasks(filters: { userID: { eq: $id } }) {
      data {
        id
        attributes {
          userID
          userName
          quizbook(pagination: { start: 0, limit: 99999 }) {
            id
            name
            description
            attempt
            slug
            quiz {
              id
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
