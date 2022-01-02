import { motion } from "framer-motion";
import styled, { css } from "styled-components";
import Box from "styled/Box";

const Bar = styled(motion.div) <{ cl: string, pst: string }>`
  width: 100%;
  border: 0px solid transparent;
  border-radius: 5px;

${({ cl, pst }) => css`
    top: ${pst === 'absolute' ? '0' : 'auto'};
    position: ${pst || ''};
    background: ${cl || 'transparent'};
  `}
`

interface Props {
  successRate: string;
  height?: string;
  delay?: number
  duration?: number
  easeInOut?: number[]
}

const ProgressBar: React.FC<Props> = ({
  successRate,
  height = '10px',
  delay = 0.5,
  duration = 2,
  easeInOut = [0.12, 0.23, 0.5, 1]
}) => {
  const transition = {
    easeInOut,
    delay,
    duration
  };

  const progressVariants = {
    noshow: {
      height,
      width: '0%',
      transition
    },
    show: {
      height,
      width: successRate,
      transition
    },
    origin: {
      height,
      width: '100%'
    }
  };

  return (
    <Box position='relative'>
      <Bar
        pst='relative'
        cl='#CE5374'
        variants={progressVariants}
        initial='noshow'
        animate='origin'
      />
      <Bar
        pst='absolute'
        cl='#2A9134'
        variants={progressVariants}
        initial='noshow'
        animate='show'
      />
    </Box>
  )
}

export default ProgressBar
