import { client, DEFAULT_HEADERS } from "lib/apollo"
import { CREATE_TASK_MUTATION } from "lib/queries/create-task"

const createTask = async (req: any, res: any) => {
  try {
    const {
      userID,
      userName,
      targetedDate,
      taskTitle,
      taskDescription
    } = req.body
    const { data } =
      await client.mutate({
        mutation: CREATE_TASK_MUTATION,
        variables: {
          userID,
          userName,
          targetedDate,
          taskTitle,
          taskDescription,
          publishedAt: new Date()
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
