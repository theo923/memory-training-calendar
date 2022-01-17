import { client, DEFAULT_HEADERS } from "lib/apollo"
import { UPDATE_TASK_FINISHED_MUTATION } from "lib/queries/update-task-finished"
import { write_logs } from "lib/utils/write_logs"

const updateFinished = async (req: any, res: any) => {
  try {
    const {
      taskID,
      targetedDate,
      ip,
      userName,
      userID
    } = req.body
    const { data } =
      await client.mutate({
        mutation: UPDATE_TASK_FINISHED_MUTATION,
        variables: {
          id: taskID,
          targetedDate
        },
        context: DEFAULT_HEADERS(req.cookies['calendar-user-token'])
      })

    await write_logs('finished', 'calendar task', userID, userName, ip, data, req)

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

export default updateFinished
