import { startOfMonth, addDays, startOfWeek } from 'date-fns'

export const getCalendar = (target: Date): any[] => {
  const startMonth = startOfWeek(startOfMonth(target))
  let pointer = startMonth
  const a = []
  for (let i = 0; i < 6; i++){
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
