import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string
      secondary: string
      danger: string
      dark: string
      light: string
    }
    spacing: {
      small: string
      medium: string
      large: string
    }
  }
}