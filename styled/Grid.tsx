import styled, { StyledComponent } from "styled-components";
import tw from "twin.macro";
import {
    color,
    ColorProps,
    grid,
    GridProps as SGridProps,
    layout,
    LayoutProps,
    space,
    SpaceProps
} from "styled-system";

export type GridProps = SpaceProps & SGridProps & ColorProps & LayoutProps

const Grid = styled.div<GridProps>`
    display: grid;
    ${grid}
    ${space}
    ${layout}
    ${color}
`;

export default Grid;
