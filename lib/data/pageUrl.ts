import { addDays } from 'date-fns'
import { getYearMonth } from 'lib/get/getDate'

export const DASHBOARD_URL = '/dashboard'
export const CALENDAR_URL = `/calendar/${getYearMonth(addDays(new Date(), 1))}`
export const TASKS_URL = '/tasks'

export const TODOLIST_URL = '/todoList/1'
export const TODOLIST_URL_PAGE = (page: number) => `/todoList/${page}`

export const QUIZBOOK_URL = '/quizBook/1'
export const QUIZBOOK_URL_PAGE = (page: number) => `/quizBook/${page}`

export const QUIZBOOK_RANKING_URL = '/quizBookRanking'
export const QUIZBOOK_RANKING_URL_PAGE = (page: number) =>
  `/quizBookRanking/${page}`
