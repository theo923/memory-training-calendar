import styled, { StyledComponent } from "styled-components";
import tw from "twin.macro";
import { normal } from "./styled-system";

const Input = styled.input`
    font-family: Mukta;
    outline: none;
    width: 300px;
    height: 40px;
    ${tw`border-2 border-black shadow-md rounded-md px-2 my-2`}
    ${normal}
`;

export default Input;
