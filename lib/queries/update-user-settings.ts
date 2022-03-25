import { gql } from '@apollo/client'

export const UPDATE_USER_SETTINGS_MUTATION = gql`
  mutation UpdateUserSettings(
    $id: ID!
    $bgColor: String!
    $secondary_colorValue: String!
    $tertiary_colorValue: String!
    $button_textColor: String!
  ) {
    updateUserSetting(
      id: $id
      data: {
        bgColor: $bgColor
        secondary_colorValue: $secondary_colorValue
        tertiary_colorValue: $tertiary_colorValue
        button_textColor: $button_textColor
      }
    ) {
      data {
        id
        attributes {
          userID
          userName
          bgColor
          secondary_colorValue
          tertiary_colorValue
          button_textColor
        }
      }
    }
  }
`
