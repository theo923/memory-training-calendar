import styled from "styled-components";
import { color } from "styled-system";
import { typography, TypographyProps } from "../styled-system";

const Text = styled.p<TypographyProps>`
    font-family: Mukta;
    word-wrap: break-word;
    ${typography}
    ${color}
`;

export default Text;
