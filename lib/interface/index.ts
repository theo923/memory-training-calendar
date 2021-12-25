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
