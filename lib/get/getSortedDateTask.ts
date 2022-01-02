import { client, DEFAULT_HEADERS } from 'lib/apollo'
import { UserProps, UserTasksProps } from 'lib/interface'
import { Server_TaskProps, Server_TaskDateProps } from 'lib/interface/server'
import { CALENDAR_QUERY } from 'lib/queries/graphql-calendar'
import { analyze_tasks } from 'lib/utils/analyze_tasks'
import { getFullDate } from './getDate'

export const getSortedDateTask = async (
  user: UserProps,
  startDate: Date,
  endDate: Date,
  req: any,
  sorted: boolean = true
) => {
  const {
    data: {
      userTasks: { data: userData },
    },
  } = await client.query({
    query: CALENDAR_QUERY,
    variables: {
      id: user?.id,
      t_date_gte: getFullDate(startDate),
      t_date_lte: getFullDate(endDate),
    },
    context: DEFAULT_HEADERS(req.cookies['calendar-user-token']),
  })

  const {
    attributes: {
      tasks: { data: tasksData },
    },
  } = userData[0]

  const dateTask: UserTasksProps = {}
  if (tasksData.length > 0) {
    const tasks = tasksData.filter(
      (task: Server_TaskProps) => task?.attributes['targetedDate'].length > 0
    )
    tasks.forEach((task: Server_TaskProps) => {
      task?.attributes!['targetedDate'].forEach(
        (date: Server_TaskDateProps) => {
          const { t_date, t_finished } = date
          const returnObject = {
            ...task?.attributes,
            id: task.id,
            userID: user?.id as string,
            userName: user?.username as string,
            t_date,
            t_finished,
          }
          if (dateTask![t_date as string])
            dateTask[t_date as string].push(returnObject)
          else dateTask[t_date as string] = [returnObject]
        }
      )
    })

    const sortedDateTask: UserTasksProps = {}

    for (const [key, val] of Object.entries(dateTask)) {
      sortedDateTask[key] = val.sort((a, b) =>
        a.t_finished === b.t_finished ? 0 : a.t_finished ? 1 : -1
      )
    }

    if (sorted) return sortedDateTask
    return {
      sortedDateTask,
      unsortedDateTask: analyze_tasks(tasks),
    }
  }

  if (sorted) return {}
  return {
    sortedDateTask: {},
    unsortedDateTask: {},
  }
}
