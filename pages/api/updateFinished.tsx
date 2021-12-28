import { client, DEFAULT_HEADERS } from "lib/apollo"
import { UPDATE_TASK_FINISHED_MUTATION } from "lib/queries/update-task-finished"

const updateFinished = async (req: any, res: any) => {
  try {
    const {
      taskID,
      targetedDate
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
