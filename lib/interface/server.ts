export interface Server_TaskProps {
  id: string
  attributes: {
    taskTitle: string
    taskDescription: string
    targetedDate: any
    userID: string
    userName: string
    __typename: string
  }
  __typename: string
}
export interface Server_TaskDateProps {
  t_date: string
  t_period: string
  __typename: string
}
