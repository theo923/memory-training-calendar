import { getFullDate } from 'lib/get/getFullDate'
import { TaskProps, UserTasksProps } from 'lib/interface'
import { ChangeEvent } from 'react'

export const initailizeTask = (
  setUserTasks: React.Dispatch<React.SetStateAction<{}>>,
  target: Date
) => {
  setUserTasks((prev) => {
    return { ...prev, [getFullDate(target)]: [] }
  })
}

export const addTask = (
  setUserTasks: React.Dispatch<React.SetStateAction<UserTasksProps>>,
  target: Date,
  inputVal: TaskProps
) => {
  setUserTasks((prev: UserTasksProps) => {
    return {
      ...prev,
      [getFullDate(target)]: [...prev[getFullDate(target)], inputVal],
    }
  })
}

export const controlTaskTitle = (
  setInputVal: React.Dispatch<React.SetStateAction<TaskProps>>,
  e: ChangeEvent<HTMLInputElement>
) => {
  setInputVal((prev) => {
    return { ...prev, taskTitle: e.target.value }
  })
}

export const controlTaskDescription = (
  setInputVal: React.Dispatch<React.SetStateAction<TaskProps>>,
  e: ChangeEvent<HTMLInputElement>
) => {
  setInputVal((prev) => {
    return { ...prev, taskDescription: e.target.value }
  })
}
