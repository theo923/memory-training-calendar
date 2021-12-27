import { client, DEFAULT_HEADERS } from "lib/apollo"
import { DELETE_TASK_MUTATION } from "lib/queries/delete-task"

const createTask = async (req: any, res: any) => {
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
