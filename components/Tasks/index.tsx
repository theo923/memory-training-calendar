import JobCard from 'components/JobCard'
import { getFullDate } from 'lib/get/getFullDate'
import { TaskProps } from 'lib/interface'
import React from 'react'
import Box from 'styled/Box'

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
          (task: TaskProps, idx: number) => (
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
