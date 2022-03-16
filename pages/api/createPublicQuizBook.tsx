import { client, DEFAULT_HEADERS } from "lib/apollo"
import { CREATE_PUBLIC_QUIZBOOK_MUTATION } from "lib/queries/create-public-quizbook"
// import { UPDATE_USER_TASK_IDs } from "lib/queries/update-user-task-ids"
// import { write_logs } from "lib/utils/write_logs"

const createPublicQuizBook = async (req: any, res: any) => {
  try {
    const {
      // userID,
      // userName,
      quizBook,
      // ip
    } = req.body
    console.log(quizBook)

    const { data } =
      await client.mutate({
        mutation: CREATE_PUBLIC_QUIZBOOK_MUTATION,
        variables: {
          quizBook,
          publishedAt: new Date()
        },
        context: DEFAULT_HEADERS(req.cookies['calendar-user-token'])
      })
    
    console.log(data)

    // await write_logs('create', 'calendar', userID, userName, ip, returnData, req)

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

export default createPublicQuizBook
