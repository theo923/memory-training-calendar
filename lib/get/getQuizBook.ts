import { client, DEFAULT_HEADERS } from 'lib/apollo'
import { QuizBookProps, QuizProps, UserProps } from 'lib/interface'
import { READ_USER_QUIZ_ALL_QUERY } from 'lib/queries/read-user-quiz'

export const getQuizBook = async (
  user: UserProps,
  req: any,
  targetedQuizBook: string
) => {
  try {
    const {
      data: {
        userTasks: { data: quizData },
      },
    } = await client.query({
      query: READ_USER_QUIZ_ALL_QUERY,
      variables: {
        id: user?.id,
      },
      context: DEFAULT_HEADERS(req.cookies['calendar-user-token']),
    })
    if (quizData.length > 0) {
      const returnArr: QuizBookProps[] = quizData![0].attributes.quizbook
      if (returnArr.length > 0) {
        return {
          quizBook: returnArr
            .filter((q: QuizBookProps) => q.slug === targetedQuizBook)
            .map((q: QuizBookProps) => {
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
      } else return { quizBook: [] }
    }

    return {
      quizBook: [],
    }
  } catch (err) {
    console.log(err)
    return {
      quizBook: [],
    }
  }
}
