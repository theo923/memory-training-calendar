import styled from "styled-components";
import { typography, TypographyProps } from "./styled-system";

const Text = styled.p<TypographyProps>`
    font-family: Mukta;
    ${typography};
`;

export default Text;
