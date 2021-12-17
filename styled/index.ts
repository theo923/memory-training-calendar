import styled, { StyledComponent } from "styled-components";
import tw from "twin.macro";
import { FlexProps } from "../interface/styled-interface";

export const flex = tw`flex justify-center items-center`;
export const grid = tw`grid`;

export const StyledForm: StyledComponent<
    "div",
    any,
    { Flex },
    never
> = styled.div<FlexProps>`
    ${(props) => props?.Flex && flex}
    ${tw`flex-col`}
    & {
        form {
            ${tw`bg-white text-center rounded py-8 px-5 shadow max-w-xs`}
        }
        input {
            ${tw`border-gray-300 mb-4 w-full border-solid border rounded py-2 px-4`}
        }
        button {
            ${tw`bg-green-500 text-white font-bold py-2 px-4 border border-blue-700 rounded`}

            &:hover {
                ${tw`bg-green-700`}
            }
        }
    }
`;
