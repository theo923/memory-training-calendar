import { gql } from '@apollo/client'

export const CALENDAR_QUERY = gql`
  query UserTask($id: String!, $t_date_gte: Date, $t_date_lte: Date) {
    userTasks(filters: { userID: { eq: $id } }) {
      data {
        id
        attributes {
          userID
          userName
          tasks {
            data {
              id
              attributes {
                taskTitle
                taskDescription
                taskColor
                targetedDate(
                  filters: { t_date: { gte: $t_date_gte, lte: $t_date_lte } }
                  pagination: { limit: 50 }
                ) {
                  t_date
                  t_period
                  t_finished
                }
              }
            }
          }
        }
      }
    }
  }
`
