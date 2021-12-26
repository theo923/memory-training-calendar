import { getFullDate } from "lib/get/getDate";
import { TaskDateProps } from "lib/interface"

export const addDays = (date: Date, days: number) => {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

const default_schedule = (target: Date) => {
  let cTarget: Date = target
  const returnVal: TaskDateProps[] = []


  for (let i = 0; i < 7; i++) {
    returnVal.push({
      t_date: getFullDate(cTarget),
      t_period: 'Daily'
    })
    cTarget = addDays(cTarget, 1)
  }

  for (let i = 0; i < 3; i++) {
    returnVal.push({
      t_date: getFullDate(cTarget),
      t_period: 'BiDaily'
    })
    cTarget = addDays(cTarget, 2)
  }

  for (let i = 0; i < 2; i++) {
    returnVal.push({
      t_date: getFullDate(cTarget),
      t_period: 'Weekly'
    })
    cTarget = addDays(cTarget, 7)
  }

  for (let i = 0; i < 3; i++) {
    returnVal.push({
      t_date: getFullDate(cTarget),
      t_period: 'Monthly'
    })
    cTarget = addDays(cTarget, 30)
  }

  returnVal.push({
    t_date: getFullDate(cTarget),
    t_period: 'Monthly'
  })

  return returnVal
}

export default default_schedule
