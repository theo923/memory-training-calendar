import styled from "styled-components";
import tw from "twin.macro";
import { AnyProps, any } from "./styled-system";

const Box = styled.div<AnyProps>`
    ${tw`gap-2`}
    ${any}
`;

export default Box;
