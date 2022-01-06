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
  e?: ChangeEvent<HTMLInputElement>,
  value?: string
) => {
  console.log('1122', value)
  if (!e && value) {
    setInputVal((prev) => {
      return { ...prev, taskDescription: value }
    })
  } else if (e) {
    setInputVal((prev) => {
      return { ...prev, taskDescription: e.target.value }
    })
  }
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
