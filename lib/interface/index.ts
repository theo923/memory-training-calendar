export interface numberIndex {
  [id: number]: string
}

export interface UserTasksProps {
  [FullDate: string]: TaskProps[]
}

export interface TaskProps {
  id: string
  taskTitle: string
  taskDescription: string
  targetedDate: TaskDateProps[]
  taskColor: string
  userID: string
  userName: string
  t_date: string
  t_finished: boolean
  successTasks?: number
  totalTasks?: number
}

export interface childNode {
  props?: {
    children?: React.ReactNode
  }
  children?: React.ReactNode
}

export interface LoginInfoProps {
  email: string
  password: string
}

export interface RegisterInfoProps {
  email: string
  username: string
  password: string
  confirmPassword: string
}

export interface UserProps {
  id: string
  username: string
}

export interface TaskDateProps {
  t_date: Date | string
  t_period: string
  t_finished: boolean
}

export interface ServerSettingsProps {
  taskColor: TaskColorProps
  bgColor: BgColorProps
}

export interface TaskColorProps {
  color_static: ColorProps[]
  color_gradient: ColorProps[]
}

export interface BgColorProps {
  color_static?: ColorProps[]
  color_gradient: ColorProps[]
}

export interface ColorProps {
  colorName: string
  colorValue: string
}

export interface UserSettingsProps {
  bgColor: string
}

export interface TodoProps {
  title: string
  description: string
  finished: boolean
}

export interface QuizBookProps {
  id?: string
  name: string
  description: string
  attempt: number
  slug: string
  public: boolean
  quiz: QuizProps[]
}

export interface QuizProps {
  id?: string
  question: string
  answer: string
  prompt: string
  finished_date: Date | null
  last_answer: string | null
}

export interface ScheduleProps {
  daily: number
  bidaily: number
  weekly: number
  monthly: number
}
