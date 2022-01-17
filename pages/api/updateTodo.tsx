import { client, DEFAULT_HEADERS } from "lib/apollo"
import { getUserTaskIDs } from "lib/get/getUserTaskIDs"
import { UPDATE_USER_TODO } from "lib/queries/update-user-todo"
import { write_logs } from "lib/utils/write_logs"

const updateTodo = async (req: any, res: any) => {
  try {
    const {
      userID,
      userName,
      ip,
      todoList
    } = req.body

    const userData = await getUserTaskIDs(userID, req)
    const { id } = userData[0]

    const { data } =
      await client.mutate({
        mutation: UPDATE_USER_TODO,
        variables: {
          id,
          todo: todoList
        },
        context: DEFAULT_HEADERS(req.cookies['calendar-user-token'])
      })

    await write_logs('update', 'TodoList', userID, userName, ip, data, req)

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

export default updateTodo
