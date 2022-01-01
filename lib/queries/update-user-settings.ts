import { gql } from '@apollo/client'

export const UPDATE_USER_SETTINGS_MUTATION = gql`
  mutation UpdateUserSettings($id: ID!, $bgColor: String!) {
    updateUserSetting(id: $id, data: { bgColor: $bgColor }) {
      data {
        id
        attributes {
          userID
          userName
          bgColor
        }
      }
    }
  }
`
