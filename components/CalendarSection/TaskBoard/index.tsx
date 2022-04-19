import TaskCard from 'components/CalendarSection/TaskBoard/TaskCard'
import { UserContext } from 'components/User'
import { getFullDate } from 'lib/get/getDate'
import { TaskProps, UserTasksProps } from 'lib/interface'
import React, { useContext } from 'react'
import Box from 'styled/Box'
import Text from 'styled/Text'

interface Props {
  userTasks: UserTasksProps,
  target: Date,
}

const TaskBoard: React.FC<Props> = ({
  userTasks,
  target,
}): JSX.Element => {
  const userInfo = useContext(UserContext)
  return (
    <Box data-test="component-taskBoard">
      {userTasks![getFullDate(target)] ?
        userTasks![getFullDate(target)]?.map(
          (task: TaskProps, idx: number) => (
            <TaskCard
              key={`taskCard_${idx}`}
              taskID={task.id}
              taskTitle={task.taskTitle}
              taskDescription={task.taskDescription}
              finished={task.t_finished}
              currentUser={userInfo?.user}
            />
          ))
        : <Text>
          No Tasks is founded. You must create one first.
        </Text>
      }
    </Box>
  )
}

export default TaskBoard
