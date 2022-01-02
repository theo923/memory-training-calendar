import {
  format,
  startOfYear,
  endOfYear,
  startOfMonth,
  endOfMonth,
} from 'date-fns'

export const getFullDate = (date: Date): string =>
  format(date, 'yyyy-MM-dd') || '1970-01-01'

export const getYearMonth = (date: Date): string =>
  format(date, 'yyyy-MM') || '1970-01'

export const getStartYearEndYear = (date: Date) => {
  return {
    startYear: startOfYear(date),
    endYear: endOfYear(date),
  }
}

export const getStartMonthEndMonth = (date: Date) => {
  return {
    startMonth: startOfMonth(date),
    endMonth: endOfMonth(date),
  }
}
