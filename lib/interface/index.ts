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
