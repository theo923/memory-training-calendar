import { getFullDate } from 'lib/get/getDate'
import {
  LoginInfoProps,
  RegisterInfoProps,
  TaskDateProps,
  TaskProps,
  TodoProps,
  UserProps,
} from 'lib/interface'

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
  confirmPassword: '',
}

export const initializeTask: TaskProps = {
  id: '',
  taskTitle: '',
  taskDescription: '',
  taskColor: '#fff',
  targetedDate: [],
  userID: '',
  userName: '',
  t_date: '',
  t_finished: false,
}

export const initializeUser: UserProps = {
  id: '',
  username: '',
}

export const initializeTaskDate: TaskDateProps = {
  t_date: new Date(),
  t_period: '',
  t_finished: false,
}

export const initializeTodo: TodoProps = {
  title: '',
  description: '[{"type":"paragraph","children":[{"text":""}]}]',
  finished: false,
}

export const initializeQuizBook = {
  id: '',
  name: '',
  description: '',
  attempt: 0,
  quiz: [],
}

export const initializeQuiz = {
  id: '',
  question: '',
  answer: '',
  prompt: '',
  finished_date: new Date(),
  last_answer: '',
}

export const initializeSchedule = {
  daily: 7,
  bidaily: 3,
  weekly: 2,
  monthly: 3,
}
