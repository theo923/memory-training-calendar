import React, { useState } from 'react'
import Box from '../../styled/Box'
import styled, { css } from "styled-components";
import { getFullDate } from '../../lib/get/getFullDate';
import JobCard from '../JobCard';
import tw from 'twin.macro'
import Button from '../../styled/Button';
import { FaCompressArrowsAlt, FaExpandArrowsAlt } from 'react-icons/fa';
import Flex from '../../styled/Flex';
import Text from '../../styled/Text';

const Wrapper = styled(Box)`
  background-color: white;
  ${tw`border-2 border-black shadow-md rounded-md px-2 py-1 mb-5`}
`

interface Props {
  userTasks: any,
  target: Date,
}

interface UserTaskProps {
  taskTitle: string,
  taskDescription: string
}

const TaskBoard: React.FC<Props> = ({
  userTasks,
  target,
}): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <Wrapper>
      <Flex justifyContent='space-between' alignItems='center'>
        <Box mr='5px'>
          <Text fontSize={'20px'} fontWeight='600'>
            Task Board
          </Text>
        </Box>
        <Button onClick={() => setOpen(prev => !prev)}>
          {open ?
            <FaCompressArrowsAlt size='20px' />
            :
            <FaExpandArrowsAlt size='20px' />}
        </Button>
      </Flex>
      {open &&
        <Box
          width={['100%', null, '40vw', '40vw', '20vw']}
          height={['100%', null, '85%']}
        >
          <Box
            maxHeight={[null, null, '50vh']}
            overflowY='auto'
          >
            {userTasks![getFullDate(target)] ?
              userTasks![getFullDate(target)]?.map(
                (task: UserTaskProps, idx: number) => (
                  <JobCard
                    key={idx}
                    taskTitle={task.taskTitle}
                    taskDescription={task.taskDescription}
                  />))
              : <Box>
                No Tasks is founded. You must create one first.
              </Box>
            }
          </Box>
        </Box>
      }
    </Wrapper>
  )
}

export default TaskBoard
