import TaskCard from 'components/CalendarSection/TaskBoard/TaskCard'
import { getFullDate } from 'lib/get/getDate'
import { TaskProps, UserTasksProps } from 'lib/interface'
import React from 'react'
import Box from 'styled/Box'

interface Props {
  userTasks: UserTasksProps,
  target: Date,
}

const TaskBoard: React.FC<Props> = ({
  userTasks,
  target,
}): JSX.Element => {
  return (
    <Box data-test="component-taskBoard">
      {userTasks![getFullDate(target)] ?
        userTasks![getFullDate(target)]?.map(
          (task: TaskProps, idx: number) => (
            <TaskCard
              key={idx}
              taskID={task.id}
              taskTitle={task.taskTitle}
              taskDescription={task.taskDescription}
              finished={task.t_finished}
            />
          ))
        : <Box>
          No Tasks is founded. You must create one first.
        </Box>}
    </Box>
  )
}

export default TaskBoard
