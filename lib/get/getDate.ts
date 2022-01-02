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
  const startYear = startOfYear(date)
  const endYear = endOfYear(date)

  return {
    startYear,
    endYear,
  }
}

export const getStartMonthEndMonth = (date: Date) => {
  const startMonth = startOfMonth(date)
  const endMonth = endOfMonth(date)

  return {
    startMonth,
    endMonth,
  }
}
