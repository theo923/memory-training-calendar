import { gql } from '@apollo/client'

export const READ_PUBLIC_QUIZBOOK_QUERY = gql`
  query PublicQuizBook($start: Int, $limit: Int) {
    publicQuizBooks(pagination: { start: $start, limit: $limit }) {
      meta {
        pagination {
          page
          total
          pageSize
          pageCount
        }
      }
      data {
        attributes {
          quizBook {
            name
            slug
            author {
              data {
                attributes {
                  userName
                }
              }
            }
            quiz {
              question
            }
            attempt
            description
          }
          like {
            data {
              attributes {
                userID
              }
            }
          }
          dislike {
            data {
              attributes {
                userID
              }
            }
          }
          publishedAt
          comments {
            user {
              data {
                attributes {
                  userName
                }
              }
            }
            comment
          }
        }
      }
    }
  }
`
