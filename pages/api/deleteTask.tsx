import { client, DEFAULT_HEADERS } from "lib/apollo"
import { DELETE_TASK_MUTATION } from "lib/queries/delete-task"
import { write_logs } from "lib/utils/write_logs"

const deleteTask = async (req: any, res: any) => {
  const { userName, userID, ip } = req.body
  try {
    const {
      id
    } = req.body
    const { data } =
      await client.mutate({
        mutation: DELETE_TASK_MUTATION,
        variables: {
          id
        },
        context: DEFAULT_HEADERS(req.cookies['calendar-user-token'])
      })
    await write_logs('delete', 'calendar', userID, userName, ip, data, req)
    res.json({
      data,
      success: true
    })
  }
  catch (err) {
    console.log(err)
    res.json({ success: false })
  }
}

export default deleteTask
