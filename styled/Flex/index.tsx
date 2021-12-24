import styled from "styled-components";
import { AnyProps, any } from "../styled-system";


const Flex = styled.div<AnyProps>`
    display: flex;
    ${any}
`;

export default Flex;
