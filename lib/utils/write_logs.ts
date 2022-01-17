import { client, DEFAULT_HEADERS } from 'lib/apollo'
import { WRITE_ACTIVITY_LOGS_MUTATION } from 'lib/queries/write-activity-logs'

export const write_logs = async (
  activity: string,
  category: string,
  userID: string,
  userName: string,
  ip: string,
  data: Object,
  mem_req: any
) => {
  try {
    await client.mutate({
      mutation: WRITE_ACTIVITY_LOGS_MUTATION,
      variables: {
        userID,
        userName,
        activity,
        category,
        ip,
        date: new Date(),
        data,
        publishedAt: new Date(),
      },
      context: mem_req
        ? DEFAULT_HEADERS(mem_req.cookies['calendar-user-token'])
        : '',
    })
  } catch (err) {
    console.log(err)
  }
}
