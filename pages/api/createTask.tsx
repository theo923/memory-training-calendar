import { client, DEFAULT_HEADERS } from "lib/apollo"
import { getUserTaskIDs } from "lib/get/getUserTaskIDs"
import { CREATE_TASK_MUTATION } from "lib/queries/create-task"
import { UPDATE_USER_TASK_IDs } from "lib/queries/update-user-task-ids"

const createTask = async (req: any, res: any) => {
  try {
    const {
      userID,
      userName,
      targetedDate,
      taskTitle,
      taskDescription,
      taskColor
    } = req.body

    const userData = await getUserTaskIDs(userID, req)

    const { id, attributes: { tasks: { data: idData } } } = userData[0]
    const idArr = idData.length > 0 ? idData.map((id: any) => id.id) : []

    const { data: { createTask: { data: { id: newID } } } } =
      await client.mutate({
        mutation: CREATE_TASK_MUTATION,
        variables: {
          userID,
          userName,
          targetedDate,
          taskTitle,
          taskDescription,
          taskColor,
          publishedAt: new Date()
        },
        context: DEFAULT_HEADERS(req.cookies['calendar-user-token'])
      })

    idArr.push(newID)

    const { data } =
      await client.mutate({
        mutation: UPDATE_USER_TASK_IDs,
        variables: {
          id,
          idArr
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

export default createTask
