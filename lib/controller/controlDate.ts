import { addMonths, subMonths, addDays, subDays } from 'date-fns'
import { Dispatch, SetStateAction } from 'react'

export const setToday = (setTarget: Dispatch<SetStateAction<Date>>) => {
  setTarget(new Date())
}

export const setAddDay = (setTarget: Dispatch<SetStateAction<Date>>) => {
  setTarget((prev) => addDays(prev, 1))
}

export const setSubDay = (setTarget: Dispatch<SetStateAction<Date>>) => {
  setTarget((prev) => subDays(prev, 1))
}

export const setAddMonth = (setTarget: Dispatch<SetStateAction<Date>>) => {
  setTarget((prev) => addMonths(prev, 1))
}

export const setSubMonth = (setTarget: Dispatch<SetStateAction<Date>>) => {
  setTarget((prev) => subMonths(prev, 1))
}

export const setAddMonthFirstDay = (
  setTarget: Dispatch<SetStateAction<Date>>
) => {
  setTarget((prev) => {
    const pointer = addMonths(prev, 1)
    return new Date(pointer.getFullYear(), pointer.getMonth(), 1)
  })
}

export const setSubMonthFirstDay = (
  setTarget: Dispatch<SetStateAction<Date>>
) => {
  setTarget((prev) => {
    const pointer = subMonths(prev, 1)
    return new Date(pointer.getFullYear(), pointer.getMonth(), 1)
  })
}
