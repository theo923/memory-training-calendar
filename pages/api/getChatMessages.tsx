import { db } from "lib/firebase"

const getChatMessages = async (req: any, res: any) => {
  try {
    const { startChat } = req.body
    const ref = db.collection('chats').doc(startChat);
    const messageRes = await ref
      .collection('messages')
      .orderBy('timestamp', 'asc')
      .get()
    const messages = messageRes.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })).map((messages: any) => ({
      ...messages,
      timestamp: messages?.timestamp.toDate().getTime()
    }))

    const chatRes = await ref.get();
    const chat = {
      id: chatRes.id,
      ...chatRes.data()
    }

    res.json({
      data: {
        messages: JSON.stringify(messages),
        chat
      },
      success: true
    })
  }
  catch (err) {
    console.log(err)
    res.json({ success: false })
  }
}

export default getChatMessages
