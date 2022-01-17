import { client, DEFAULT_HEADERS } from 'lib/apollo'
import { QuizBookProps, UserProps } from 'lib/interface'
import { READ_USER_QUIZ_QUERY } from 'lib/queries/read-user-quiz'

export const getQuizBook = async (user: UserProps, req: any) => {
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
        quizBooks: returnArr,
      }
    } else return { quizBooks: [] }
  }

  return {
    quizBooks: [],
  }
}
