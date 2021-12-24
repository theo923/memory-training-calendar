// Extend the styled-component DefaultTheme with our extended SDS theme
declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends CustomeTheme {}
}

export interface CustomeTheme {
  breakpoints: string[]
}

export const theme: CustomeTheme = {
  breakpoints: ['544px', '768px', '1012px', '1280px', '1440px', '1920px'],
}
