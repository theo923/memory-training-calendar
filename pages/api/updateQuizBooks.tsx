import { client, DEFAULT_HEADERS } from "lib/apollo"
import { getUserTaskIDs } from "lib/get/getUserTaskIDs"
import { QuizBookProps, QuizProps } from "lib/interface"
import { UPDATE_USER_QUIZBOOKS } from "lib/queries/update-user-quizbooks"
import { write_logs } from "lib/utils/write_logs"

const updateQuizBooks = async (req: any, res: any) => {
  try {
    const {
      userID,
      userName,
      ip,
      quizbook
    } = req.body

    const userData = await getUserTaskIDs(userID, req)
    const { id } = userData[0]

    const { data } =
      await client.mutate({
        mutation: UPDATE_USER_QUIZBOOKS,
        variables: {
          id,
          quizbook: quizbook.map((qb: QuizBookProps) => {
            delete qb.id
            return {
              ...qb,
              quiz: qb.quiz.map((q: QuizProps) => {
                delete q.id
                return q
              }),
            }
          })
        },
        context: DEFAULT_HEADERS(req.cookies['calendar-user-token'])
      })

    await write_logs('update', 'QuizBooks', userID, userName, ip, data, req)

    res.json({
      data,
      success: true
    })
  }
  catch (err) {
    console.log(err)
    res.json({ success: false })
  }
}

export default updateQuizBooks
