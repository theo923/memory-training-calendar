import styled, { StyledComponent } from "styled-components";
import tw from "twin.macro";
import { motion } from "framer-motion";
import { buttonVariant } from "../assets/animationVariant";
import Box from "./Box";

const StyledButton: StyledComponent<"div", any, {}, never> = styled(Box)`
    font-family: Mukta;
    outline: none;
    ${tw`text-base m-2`}
`;

const Button = ({ ...props }): JSX.Element => {
    return (
        <motion.button
            variants={buttonVariant}
            animate="initialCart"
            whileHover="hoverCart"
            {...props}
        >
            <StyledButton>{props.children}</StyledButton>
        </motion.button>
    );
};

export default Button;
