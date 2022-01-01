export interface Server_TaskProps {
  id: string
  attributes: {
    taskTitle: string
    taskDescription: string
    taskColor: string
    targetedDate: Server_TaskDateProps[]
    userID: string
    userName: string
    __typename: string
  }
  __typename: string
}

export interface Server_TaskDateProps {
  t_date: string
  t_period: string
  t_finished: boolean
}

export interface Server_ServerSettingsProps {
  color_static: Server_ColorProps[]
  color_gradient: Server_ColorProps[]
}

export interface Server_ColorProps {
  colorName: string
  colorValue: string
}
