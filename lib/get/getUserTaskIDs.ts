import { client, DEFAULT_HEADERS } from 'lib/apollo'
import { READ_USER_TASK_IDs } from 'lib/queries/read-user-task-ids'

export const getUserTaskIDs = async (userID: string, req: any) => {
  const {
    data: {
      userTasks: { data: userData },
    },
  } = await client.query({
    query: READ_USER_TASK_IDs,
    variables: {
      userID,
    },
    context: DEFAULT_HEADERS(req.cookies['calendar-user-token']),
  })

  return userData
}
