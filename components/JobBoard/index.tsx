import React from 'react'
import Box from '../../styled/Box'
import styled from "styled-components";
import { getFullDate } from '../../lib/get/getFullDate';
import JobCard from '../JobCard';
import tw from 'twin.macro'
import JobCreationBoard from '../JobCreationBoard'

const JobBoardWrapper = styled(Box)`
      ${tw`border-2 border-black shadow-md rounded-md px-2 my-2`}
`

interface Props {
  userTasks: any,
  setUserTasks: React.Dispatch<React.SetStateAction<{}>>,
  target: Date,
  setTarget: React.Dispatch<React.SetStateAction<Date>>
}

interface UserTaskProps {
  taskTitle: string,
  taskDescription: string
}

const JobBoard: React.FC<Props> = ({
  userTasks,
  setUserTasks,
  target,
  // setTarget,
}): JSX.Element => {
  return (
    <JobBoardWrapper
      m={['10px']}
      height={['100%', null, '85%']}
      width='100%'
    >
      <Box m={['10px']}>
        CreateTask:
      </Box>
      <JobCreationBoard
        userTasks={userTasks}
        setUserTasks={setUserTasks}
        target={target}
      />
      <Box m={['10px']}>
        Tasks:
      </Box>
      <Box
        maxHeight={[null, null, '50vh']}
        overflowY='auto'
      >
        {userTasks![getFullDate(target)]?.map(
          (task: UserTaskProps, idx: number) => (
            <JobCard
              key={idx}
              taskTitle={task.taskTitle}
              taskDescription={task.taskDescription}
            />)
        )}
      </Box>
    </JobBoardWrapper >
  )
}

export default JobBoard
