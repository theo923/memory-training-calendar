import styled from "styled-components";
import tw from "twin.macro";
import { normal } from "../styled-system";

const StyledInput = styled.input`
    font-family: MPLUSRounded1c;
    outline: none;
    width: 100%;
    height: 40px;
    ${tw`border-2 border-black shadow-md rounded-md px-2 my-2`}
    ${normal}
`;

const Input = ({ ...props }): JSX.Element => {
    return <StyledInput {...props} className="border-black" />;
};

export default Input;
