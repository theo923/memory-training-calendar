export interface Server_TaskProps {
  id: string
  attributes: {
    taskTitle: string
    taskDescription: string
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
