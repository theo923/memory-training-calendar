import { client, DEFAULT_HEADERS } from "lib/apollo"
import { UPDATE_TASK_INFO_MUTATION } from "lib/queries/modify-task-info"
import { write_logs } from "lib/utils/write_logs"

const modifyTaskInfo = async (req: any, res: any) => {
  try {
    const {
      id,
      taskTitle,
      taskDescription,
      taskColor,
      userID,
      userName,
      ip
    } = req.body
    const { data } =
      await client.mutate({
        mutation: UPDATE_TASK_INFO_MUTATION,
        variables: {
          id,
          taskTitle,
          taskDescription,
          taskColor
        },
        context: DEFAULT_HEADERS(req.cookies['calendar-user-token'])
      })
    
    await write_logs('modify', 'calendar', userID, userName, ip, data, req)
    
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

export default modifyTaskInfo
