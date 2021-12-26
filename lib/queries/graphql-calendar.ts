import { gql } from '@apollo/client'

export const CALENDAR_QUERY = gql`
  query Task(
    $userID: String
    $userName: String
    $t_date_gte: Date
    $t_date_lte: Date
  ) {
    tasks(
      filters: { userID: { eq: $userID }, userName: { eq: $userName } }
      pagination: { limit: 3000 }
    ) {
      data {
        id
        attributes {
          taskTitle
          taskDescription
          targetedDate(
            filters: { t_date: { gte: $t_date_gte, lte: $t_date_lte } }
            pagination: { limit: 50 }
          ) {
            t_date
            t_period
          }
          userID
          userName
        }
      }
    }
  }
`
