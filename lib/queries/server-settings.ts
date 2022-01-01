import { gql } from '@apollo/client'

export const SERVER_SETTINGS_QUERY = gql`
  query ServerSettings {
    colorPalette {
      data {
        attributes {
          color_static {
            colorName
            colorValue
          }
          color_gradient {
            colorName
            colorValue
          }
        }
      }
    }
  }
`
