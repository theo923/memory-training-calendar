import { gql } from '@apollo/client'

export const SERVER_SETTINGS_QUERY = gql`
  query ServerSettings {
    colorPalette {
      data {
        attributes {
          color_static {
            colorName
            colorValue
            secondary_colorValue
            tertiary_colorValue
            button_textColor
          }
          color_gradient {
            colorName
            colorValue
            secondary_colorValue
            tertiary_colorValue
            button_textColor
          }
        }
      }
    }
  }
`
