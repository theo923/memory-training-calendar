import { client, DEFAULT_HEADERS } from 'lib/apollo'
import { QuizBookProps, QuizProps, UserProps } from 'lib/interface'
import { READ_USER_QUIZ_QUERY } from 'lib/queries/read-user-quiz'

export const getQuizBooks = async (user: UserProps, req: any) => {
  const {
    data: {
      userTasks: { data: quizData },
    },
  } = await client.query({
    query: READ_USER_QUIZ_QUERY,
    variables: {
      id: user?.id,
    },
    context: DEFAULT_HEADERS(req.cookies['calendar-user-token']),
  })
  if (quizData.length > 0) {
    const returnArr: QuizBookProps[] = quizData![0].attributes.quizbook
    if (returnArr.length > 0) {
      return {
        quizBooks: returnArr.map((q: QuizBookProps) => {
          return {
            id: q.id,
            name: q.name,
            description: q.description,
            attempt: q.attempt,
            slug: q.slug,
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
    } else return { quizBooks: [] }
  }

  return {
    quizBooks: [],
  }
}
