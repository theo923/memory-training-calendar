import { format } from 'date-fns'

export const getFullDate = (date: Date): string =>
  format(date, 'yyyy-MM-dd') || '1970-01-01'

export const getYearMonth = (date: Date): string =>
  format(date, 'yyyy-MM') || '1970-01'
