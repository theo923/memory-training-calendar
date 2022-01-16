import { client, DEFAULT_HEADERS } from 'lib/apollo'
import { TodoProps, UserProps } from 'lib/interface'
import { READ_USER_TODO_QUERY } from 'lib/queries/read-user-todo'

export const getTodoList = async (user: UserProps, req: any) => {
  const {
    data: {
      userTasks: { data: todoData },
    },
  } = await client.query({
    query: READ_USER_TODO_QUERY,
    variables: {
      id: user?.id,
    },
    context: DEFAULT_HEADERS(req.cookies['calendar-user-token']),
  })
  if (todoData.length > 0) {
    const returnArr = todoData![0].attributes.todo
    if (returnArr.length > 0)
      return {
        todoList: returnArr.map((t: TodoProps) => {
          return {
            title: t.title,
            description: t.description,
            finished: t.finished,
          }
        }),
      }
    else return { todoList: [] }
  }

  return {
    todoList: [],
  }
}
