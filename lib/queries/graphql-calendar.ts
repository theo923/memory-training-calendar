import { gql } from '@apollo/client'

//template
export const CALENDAR_QUERY = gql`
  query Task {
    tasks(filters: { userID: { eq: 1 } }) {
      data {
        id
        attributes {
          taskTitle
          taskDescription
          targetedDate(
            filters: { t_date: { gt: "2021-12-28", lt: "2021-12-31" } }
          ) {
            t_date
            t_period
          }
        }
      }
    }
  }
`
