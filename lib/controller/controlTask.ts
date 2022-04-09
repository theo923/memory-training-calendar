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
  changeHook: React.Dispatch<React.SetStateAction<any>>,
  insideObject: boolean,
  value?: string,
  property?: string
) => {
  if (property && insideObject)
    changeHook((prev: any) => {
      return { ...prev, [property]: value }
    })
  else if (insideObject) {
    changeHook((prev: any) => {
      return { ...prev, taskDescription: value }
    })
  } else {
    changeHook(value)
  }
}

export const controlTaskColor = (
  setInputVal: React.Dispatch<React.SetStateAction<TaskProps>>,
  color: ColorProps,
  inputProperties: string
) => {
  setInputVal((prev) => {
    return { ...prev, [inputProperties]: color.colorValue, ...color }
  })
}
