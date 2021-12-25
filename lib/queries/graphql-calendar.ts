import { gql } from '@apollo/client'

export const CALENDAR_QUERY = gql`
  query Task($t_date_gte: Date, $t_date_lte: Date) {
    tasks {
      data {
        id
        attributes {
          taskTitle
          taskDescription
          targetedDate(
            filters: { t_date: { gte: $t_date_gte, lte: $t_date_lte } }
          ) {
            t_date
            t_period
          }
        }
      }
    }
  }
`
