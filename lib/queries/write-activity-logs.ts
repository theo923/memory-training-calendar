import { gql } from '@apollo/client'

export const WRITE_ACTIVITY_LOGS_MUTATION = gql`
  # Write your query or mutation here
  mutation WriteActivityLogs(
    $activity: String!
    $category: String!
    $userID: String!
    $userName: String!
    $ip: String!
    $date: DateTime
    $data: JSON
    $publishedAt: DateTime
  ) {
    createActivityLog(
      data: {
        activity: $activity
        category: $category
        userID: $userID
        userName: $userName
        ip: $ip
        date: $date
        data: $data
        publishedAt: $publishedAt
      }
    ) {
      data {
        id
      }
    }
  }
`
