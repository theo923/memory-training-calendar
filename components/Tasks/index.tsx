import React from 'react'
import Box from '../../styled/Box'
import { getFullDate } from '../../lib/get/getFullDate';
import JobCard from '../JobCard';
import { UserTaskProps } from '../Board';

interface Props {
  userTasks: any,
  target: Date,
}

const Tasks: React.FC<Props> = ({
  userTasks,
  target,
}): JSX.Element => {
  return (
    <>
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
        </Box>}
    </>
  )
}

export default Tasks
