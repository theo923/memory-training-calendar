import { motion } from "framer-motion";
import styled from "styled-components";
import tw from "twin.macro";
import { AnyProps, any } from "../styled-system";

const MotionBox = styled(motion.div) <AnyProps>`
    ${tw`gap-2`}
    ${any}
`;

export default MotionBox;
