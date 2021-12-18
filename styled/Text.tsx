import styled from "styled-components";
import { typography, TypographyProps } from "./styled-system";

const Text = styled.p<TypographyProps>`
    font-family: Mukta;
    white-space: pre-wrap;
    ${typography};
`;

export default Text;
