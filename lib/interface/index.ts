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
  ip?: string
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
  secondary_colorValue: string
  tertiary_colorValue: string
  button_textColor: string
}

export interface UserSettingsProps {
  bgColor: string
  secondary_colorValue: string
  tertiary_colorValue: string
  button_textColor: string
}

export interface TodoProps {
  id?: string
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

export interface PublicQuizBookProps {
  id?: string
  name: string
  description: string
  attempt: number
  slug: string
  quiz: QuizForPublicProps[]
}

export interface QuizProps {
  id?: string
  question: string
  answer: string
  prompt: string
  finished_date: Date | null
  last_answer: string | null
}

export interface QuizForPublicProps {
  id?: string
  question: string
  answer?: string
  prompt?: string
  finished_date?: Date | null
  last_answer?: string | null
}

export interface ScheduleProps {
  daily: number
  bidaily: number
  weekly: number
  monthly: number
}
