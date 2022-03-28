import { useContext } from 'react'
import styled, { css } from "styled-components";
import { color } from "styled-system";
import Box from "styled/Box";
import { typography, TypographyProps } from "../styled-system";
import { UserContext } from 'components/User';

interface TextProps extends TypographyProps {
  extend?: boolean
  sColor?: string
}

const StyledText = styled(Box) <TextProps>`
    font-family: MPLUSRounded1c;
    word-wrap: break-word;
    ${typography}
    ${color}
    ${({ extend, sColor }) => css`
      color: ${extend ? 'black' : sColor};
    `}
`;

const Text = ({ disabled, ...props }: any): JSX.Element => {
  const { userSettings: { tertiary_colorValue } } = useContext(UserContext)
  
  return (
    <StyledText {...props} sColor={props.color || tertiary_colorValue}>{props.children}</StyledText>
  );
};

export default Text;
