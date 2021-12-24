import { startOfMonth, endOfMonth, addDays, startOfWeek } from 'date-fns'

export const getCalendar = (target: Date): any[] => {
  const startMonth = startOfWeek(startOfMonth(target))
  const endMonth = endOfMonth(target)
  let pointer = startMonth
  const a = []
  while (pointer < endMonth) {
    a.push(
      [...Array(7)].map(() => {
        const rVal = pointer
        pointer = addDays(pointer, 1)
        return rVal
      })
    )
  }

  return a
}
