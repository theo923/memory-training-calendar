import styled from "styled-components";
import { color } from "styled-system";
import Box from "styled/Box";
import { typography, TypographyProps } from "../styled-system";

const Text = styled(Box)<TypographyProps>`
    font-family: MPLUSRounded1c;
    word-wrap: break-word;
    ${typography}
    ${color}
`;

export default Text;
