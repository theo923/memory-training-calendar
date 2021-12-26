export const getFullDate = (date: Date) => date.toISOString().substr(0, 10)

export const getYearMonth = (date: Date) => date.toISOString().substr(0, 7)
