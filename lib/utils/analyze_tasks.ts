export const analyze_tasks = (tasks: any) => {
  return tasks
    .map((task: any) => {
      const totalTasks = task?.attributes?.targetedDate.length
      const successTasks = task?.attributes?.targetedDate.filter(
        (tk: any) => tk?.t_finished === true
      ).length
      return {
        ...task?.attributes,
        id: task.id,
        totalTasks,
        successTasks,
      }
    })
    .sort((a: any, b: any) => b?.successTasks - a?.successTasks)
}
