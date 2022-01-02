import { TaskProps } from "lib/interface"
import { motion } from "framer-motion";
import styled, { css } from "styled-components";
import Box from "styled/Box";

const Bar = styled(motion.div) <{ cl: string, pst: string }>`
  width: 100%;
  height: 10px;
  border: 0px solid transparent;
  border-radius: 5px;

${({ cl, pst }) => css`
    top: ${pst === 'absolute' ? '0' : 'auto'};
    position: ${pst || ''};
    background: ${cl || 'transparent'};
  `}
`

interface Props {
  userTasks: TaskProps[]
  delay?: number
  duration?: number
  easeInOut?: number[]
}

const ProgressBar: React.FC<Props> = ({
  userTasks,
  delay = 0.5,
  duration = 2,
  easeInOut = [0.12, 0.23, 0.5, 1]
}) => {
  const totalTasks: number = userTasks.length
  const successfulTask: number = userTasks.filter(task => task?.t_finished === true).length

  const transition = {
    easeInOut,
    delay,
    duration
  };

  const progressVariants = {
    noshow: {
      width: '0%',
      transition
    },
    show: {
      width: `${Math.abs(successfulTask / totalTasks * 100)}%`,
      transition
    },
    origin: {
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
