import { gql } from '@apollo/client'

export const CREATE_PUBLIC_QUIZBOOK_MUTATION = gql`
  mutation CreatePublicQuizBook(
    $quizBook: ComponentQuizQuizBookInput
    $publishedAt: DateTime
  ) {
    createPublicQuizBook(
      data: { quizBook: $quizBook, publishedAt: $publishedAt }
    ) {
      data {
        id
        attributes {
          quizBook {
            name
            description
            quiz {
              id
              question
              answer
              prompt
              finished_date
              last_answer
            }
            attempt
            slug
            public
            author {
              data {
                attributes {
                  userName
                  updatedAt
                }
              }
            }
          }
          like {
            data {
              id
            }
          }
          dislike {
            data {
              id
            }
          }
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
          createdAt
          updatedAt
          publishedAt
        }
      }
    }
  }
`
