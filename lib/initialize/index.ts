import { getFullDate } from 'lib/get/getDate'
import { LoginInfoProps, RegisterInfoProps, TaskProps, UserProps } from 'lib/interface'

export const initializeUserTask = (
  setUserTasks: React.Dispatch<React.SetStateAction<{}>>,
  target: Date
) => {
  setUserTasks((prev) => {
    return { ...prev, [getFullDate(target)]: [] }
  })
}

export const initializeLoginInfo: LoginInfoProps = {
  email: '',
  password: '',
}

export const initializeRegisterInfo: RegisterInfoProps = {
  email: '',
  username: '',
  password: '',
  confirmPassword: ''
}

export const initializeTask: TaskProps = {
  taskTitle: '',
  taskDescription: '',
}

export const initializeUser: UserProps = {
  id: '',
  username: ''
}
