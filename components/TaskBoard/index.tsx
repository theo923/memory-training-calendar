import JobCard from 'components/JobCard'
import { getFullDate } from 'lib/get/getDate'
import { TaskProps } from 'lib/interface'
import { NextRouter } from 'next/router'
import React from 'react'
import Box from 'styled/Box'

interface Props {
  router: NextRouter
  userTasks: any,
  target: Date,
}

const TaskBoard: React.FC<Props> = ({
  router,
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
              router={router}
              taskID={task.id}
              taskTitle={task.taskTitle}
              taskDescription={task.taskDescription}
            />))
        : <Box>
          No Tasks is founded. You must create one first.
        </Box>}
    </>
  )
}

export default TaskBoard
