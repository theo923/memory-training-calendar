export interface numberIndex {
  [id: number]: string
}

export interface UserTasksProps {
  [FullDate: string]: TaskProps[]
}

export interface TaskProps {
  taskTitle: string
  taskDescription: string
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
