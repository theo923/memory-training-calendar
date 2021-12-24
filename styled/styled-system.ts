import {
  space,
  SpaceProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
  typography,
  TypographyProps,
  flexbox,
  FlexboxProps,
  shadow,
  ShadowProps,
  border,
  BorderProps,
  display,
  DisplayProps,
  background,
  BackgroundProps,
  grid,
  GridProps,
  TextColorProps,
  compose,
  system,
  color,
  ColorProps,
} from 'styled-system'

export const normal = compose(space, layout, display)

export const any = compose(
  space,
  layout,
  display,
  position,
  typography,
  flexbox,
  shadow,
  border,
  background
)

export type AnyProps = SpaceProps &
  LayoutProps &
  DisplayProps &
  PositionProps &
  TypographyProps &
  FlexboxProps &
  ShadowProps &
  BorderProps &
  BackgroundProps

export {
  space,
  layout,
  position,
  typography,
  flexbox,
  shadow,
  border,
  display,
  background,
  grid,
  compose,
  system,
}

export type {
  SpaceProps,
  LayoutProps,
  PositionProps,
  TypographyProps,
  FlexboxProps,
  ShadowProps,
  BorderProps,
  DisplayProps,
  BackgroundProps,
  GridProps,
  color as ssColor,
  ColorProps as SSColorProps,
  TextColorProps,
}
