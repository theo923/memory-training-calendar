import { client, DEFAULT_HEADERS } from 'lib/apollo'
import { QuizBookProps, QuizProps, UserProps } from 'lib/interface'
import {
  READ_USER_QUIZ_QUERY,
  READ_USER_QUIZ_ALL_QUERY,
} from 'lib/queries/read-user-quiz'

export const getQuizBooks = async (user: UserProps, page: number, req: any) => {
  try {
    const {
      data: {
        userTasks: { data: quizAllData },
      },
    } = await client.query({
      query: READ_USER_QUIZ_ALL_QUERY,
      variables: {
        id: user?.id,
      },
      context: DEFAULT_HEADERS(req.cookies['calendar-user-token']),
    })

    const {
      data: {
        userTasks: { data: quizData },
      },
    } = await client.query({
      query: READ_USER_QUIZ_QUERY,
      variables: {
        id: user?.id,
        start: page,
      },
      context: DEFAULT_HEADERS(req.cookies['calendar-user-token']),
    })

    if (quizData.length > 0) {
      const returnArr: QuizBookProps[] = quizData![0].attributes.quizbook
      const returnAllArr: QuizBookProps[] = quizAllData![0].attributes.quizbook
      if (returnArr.length > 0) {
        return {
          quizBooks: returnArr.map((q: QuizBookProps) => {
            return {
              id: q.id,
              name: q.name,
              description: q.description,
              attempt: q.attempt,
              slug: q.slug,
              public: q.public,
              quiz: q.quiz.map((qz: QuizProps) => {
                return {
                  id: qz.id,
                  question: qz.question,
                  answer: qz.answer,
                  prompt: qz.prompt,
                  finished_date: qz.finished_date,
                  last_answer: qz.last_answer,
                }
              }),
            }
          }),
          allQuizBooks: returnAllArr.map((q: QuizBookProps) => {
            return {
              id: q.id,
              name: q.name,
              description: q.description,
              attempt: q.attempt,
              slug: q.slug,
              public: q.public,
              quiz: q.quiz.map((qz: QuizProps) => {
                return {
                  id: qz.id,
                  question: qz.question,
                  answer: qz.answer,
                  prompt: qz.prompt,
                  finished_date: qz.finished_date,
                  last_answer: qz.last_answer,
                }
              }),
            }
          }),
        }
      }

      if (quizAllData.length > 0) {
        const returnAllArr: QuizBookProps[] =
          quizAllData![0].attributes.quizbook
        if (returnAllArr.length > 0) {
          return {
            quizBooks: [],
            allQuizBooks: returnAllArr.map((q: QuizBookProps) => {
              return {
                id: q.id,
                name: q.name,
                description: q.description,
                attempt: q.attempt,
                slug: q.slug,
                public: q.public,
                quiz: q.quiz.map((qz: QuizProps) => {
                  return {
                    id: qz.id,
                    question: qz.question,
                    answer: qz.answer,
                    prompt: qz.prompt,
                    finished_date: qz.finished_date,
                    last_answer: qz.last_answer,
                  }
                }),
              }
            }),
          }
        }
      }
    }

    return {
      quizBooks: [],
      allQuizBooks: [],
    }
  } catch (err) {
    console.log(err)
    return {
      quizBooks: [],
      allQuizBooks: [],
    }
  }
}
