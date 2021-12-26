import { getFullDate } from "lib/get/getDate";
import { TaskDateProps } from "lib/interface"

const addDays = (date: Date, days: number) => {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

const default_schedule = (target: Date) => {
  let cTarget: Date = target
  const returnVal: TaskDateProps[] = []

  returnVal.push({
    t_date: getFullDate(cTarget),
    t_period: 'Daily'
  })

  for (let i = 0; i < 7; i++) {
    cTarget = addDays(cTarget, 1)
    returnVal.push({
      t_date: getFullDate(cTarget),
      t_period: 'Daily'
    })
  }

  for (let i = 0; i < 3; i++) {
    cTarget = addDays(cTarget, 2)
    returnVal.push({
      t_date: getFullDate(cTarget),
      t_period: 'BiDaily'
    })
  }

  for (let i = 0; i < 2; i++) {
    cTarget = addDays(cTarget, 7)
    returnVal.push({
      t_date: getFullDate(cTarget),
      t_period: 'Weekly'
    })
  }

  for (let i = 0; i < 3; i++) {
    cTarget = addDays(cTarget, 30)
    returnVal.push({
      t_date: getFullDate(cTarget),
      t_period: 'Monthly'
    })
  }

  return returnVal
}

export default default_schedule
