import { useContext } from 'react'
import styled from "styled-components";
import tw from "twin.macro";
import { motion } from "framer-motion";
import { buttonVariant } from "../../assets/animationVariant";
import Box from "../Box";
import { UserContext } from 'components/User';

const StyledButton = styled(Box)`
    font-family: MPLUSRounded1c;
    outline: none;
    ${tw`text-base m-2`}
`;

const Button = ({ disabled, ...props }: any): JSX.Element => {
  const { userSettings: { secondary_colorValue, button_textColor } } = useContext(UserContext)
  return (
    <motion.button
      variants={buttonVariant(button_textColor, secondary_colorValue)}
      animate={disabled ? "disabledSearch" : "initialSearch"}
      whileHover={disabled ? "disabledHoverSearch" : "hoverSearch"}
      {...props}
    >
      <StyledButton>{props.children}</StyledButton>
    </motion.button>
  );
};

export default Button;
