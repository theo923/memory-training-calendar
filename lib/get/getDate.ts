export const getFullDate = (date: Date): string =>
  date?.toISOString()?.substr(0, 10) || '1970-01-01'

export const getYearMonth = (date: Date): string =>
  date?.toISOString()?.substr(0, 7) || '1970-01'
