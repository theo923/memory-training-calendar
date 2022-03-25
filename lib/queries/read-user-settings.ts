import { gql } from '@apollo/client'

export const READ_USER_SETTINGS = gql`
  query ReadUserSettings($userID: String!) {
    userSettings(filters: { userID: { eq: $userID } }) {
      data {
        id
        attributes {
          bgColor
          secondary_colorValue
          tertiary_colorValue
          button_textColor
        }
      }
    }
  }
`
