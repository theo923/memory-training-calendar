import { ColorProps, TaskProps } from 'lib/interface'
import { ChangeEvent } from 'react'

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

export const controlTaskColor = (
  setInputVal: React.Dispatch<React.SetStateAction<TaskProps>>,
  color: ColorProps,
  inputProperties: string
) => {
  setInputVal((prev) => {
    return { ...prev, [inputProperties]: color.colorValue }
  })
}
