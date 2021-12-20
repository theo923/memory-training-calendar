import React, { useState } from 'react'
import Box from '../../styled/Box'
import styled from "styled-components";
import tw from 'twin.macro'
import JobCreationBoard from '../JobCreationBoard'
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
  setUserTasks: React.Dispatch<React.SetStateAction<{}>>,
  target: Date,
}

export interface UserTaskProps {
  taskTitle: string,
  taskDescription: string
}

const CreateTaskBoard: React.FC<Props> = ({
  userTasks,
  setUserTasks,
  target,
}): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <Wrapper>
      <Flex justifyContent='space-between' alignItems='center'>
        <Box mr='5px'>
          <Text fontSize={'20px'} fontWeight='600'>
            Create Task Board
          </Text>
        </Box>
        <Button onClick={() => setOpen(prev => !prev)}>
          {open ?
            <FaCompressArrowsAlt size='20px' />
            :
            <FaExpandArrowsAlt size='20px' />}
        </Button>
      </Flex>
      {
        open &&
        <Box
          width={['100%', null, '40vw', '40vw', '20vw']}
          height={['100%', null, '85%']}
        >
          <JobCreationBoard
            userTasks={userTasks}
            setUserTasks={setUserTasks}
            target={target}
          />
        </Box>
      }
    </Wrapper>
  )
}

export default CreateTaskBoard
