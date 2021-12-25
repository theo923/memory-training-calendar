import { gql } from '@apollo/client'

//template
export const CALENDAR_QUERY = gql`
  query Task {
    tasks {
      data {
        id
        attributes {
          taskTitle
          taskDescription
          targetedDate(
            filters: { t_date: { gt: "2021-12-20", lt: "2021-12-31" } }
          ) {
            t_date
            t_period
          }
        }
      }
    }
  }
`
