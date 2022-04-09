import { client, DEFAULT_HEADERS } from "lib/apollo"
import { getUserTaskIDs } from "lib/get/getUserTaskIDs"
import { QuizBookProps, QuizProps } from "lib/interface"
import { CREATE_PUBLIC_QUIZBOOK_MUTATION } from "lib/queries/create-public-quizbook"
import { UPDATE_USER_QUIZBOOKS } from "lib/queries/update-user-quizbooks"
import { slug_converter } from "lib/utils/slug_util"
import { write_logs } from "lib/utils/write_logs"

const createPublicQuizBook = async (req: any, res: any) => {
  try {
    const {
      userID,
      userName,
      quizBook,
      quizBooks,
      ip
    } = req.body

    let quizb = { ...quizBook }
    delete quizb.id
    quizb['quiz'] = quizb.quiz.map((q: QuizProps) => {
      delete q.id
      return q
    })

    const { data: data1 } =
      await client.mutate({
        mutation: CREATE_PUBLIC_QUIZBOOK_MUTATION,
        variables: {
          quizBook: quizb,
          publishedAt: new Date()
        },
        context: DEFAULT_HEADERS(req.cookies['calendar-user-token'])
      })

    await write_logs('create', 'Public Quiz Book', userID, userName, ip, data1, req)

    const userData = await getUserTaskIDs(userID, req)
    const { id } = userData[0]

    const { data: data2 } =
      await client.mutate({
        mutation: UPDATE_USER_QUIZBOOKS,
        variables: {
          id,
          quizbook: quizBooks.map((qb: QuizBookProps) => {
            const bool = qb.id === quizBook.id ? true : qb.public

            delete qb.id
            return {
              ...qb,
              slug: slug_converter(qb.name),
              public: bool,
              quiz: qb.quiz.map((q: QuizProps) => {
                delete q.id
                return q
              }),
            }
          })
        },
        context: DEFAULT_HEADERS(req.cookies['calendar-user-token'])
      })

    await write_logs('update', 'QuizBooks', userID, userName, ip, data2, req)

    res.json({
      data2,
      success: true
    })
  }
  catch (err) {
    console.log(err)
    res.json({ success: false })
  }
}

export default createPublicQuizBook
