import styled from "styled-components";
import tw from "twin.macro";
import { normal } from "../styled-system";

const StyledTextArea = styled.textarea`
    font-family: MPLUSRounded1c;
    outline: none;
    max-width: 100%;
    ${tw`border-2 border-black shadow-md rounded-md px-2 my-2`}
    ${normal}
`;

const TextArea = ({ ...props }): JSX.Element => {
    return <StyledTextArea {...props} className="border-black" />;
};

export default TextArea;
