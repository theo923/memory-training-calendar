import { getFullDate } from 'lib/get/getDate'
import { LoginInfoProps, RegisterInfoProps, TaskDateProps, TaskProps, UserProps } from 'lib/interface'

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
  id: '',
  taskTitle: '',
  taskDescription: '',
  targetedDate: [],
  userID: '',
  userName: ''
}

export const initializeUser: UserProps = {
  id: '',
  username: ''
}

export const initializeTaskDate: TaskDateProps = {
  t_date: new Date(),
  t_period: '',
}
