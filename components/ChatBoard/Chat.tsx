import axios from 'axios'
import { auth, db } from 'lib/firebase'
import { getRecipientEmail } from 'lib/firebase/utils'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import { BiMailSend } from 'react-icons/bi'
import Box from 'styled/Box'
import Button from 'styled/Button'
import Flex from 'styled/Flex'
import Input from 'styled/Input'
import ChatMessageBox from './ChatMessageBox'
import { serverTimestamp } from "firebase/firestore";

interface Props {
  startChat: string
}

const Chat: React.FC<Props> = ({ startChat }) => {
  // @ts-ignore
  const [user] = useAuthState(auth)
  const [recipient, setRecipient] = useState<string>('')
  const [messages, setMessages] = useState<string[]>([])
  const [messageSnapshot] = useCollection(
    // @ts-ignore
    db
      .collection('chats')
      .doc(startChat)
      .collection('messages')
      .orderBy('timestamp', 'asc')
  )
  const [messageToSend, setMessageToSend] = useState<string>('')

  const showMessages = () => {
    if (messageSnapshot) {
      return messageSnapshot.docs.map((message) =>
        <ChatMessageBox
          key={message.id}
          me={user?.email || ''}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp,
          }}
        />
      )
    }
    else {
      return messages.map((message: any) => {
        <ChatMessageBox
          key={message.id}
          me={user?.email || ''}
          user={message.user}
          message={message}
        />
      })
    }
  }

  const sendMessages = () => {
    if (user && messageToSend.length > 0) {
      db.collection('chats').doc(startChat).collection('messages').add({
        timestamp: serverTimestamp(),
        message: messageToSend,
        user: user.email
      })
    }

    setMessageToSend('')
  }

  useEffect(() => {
    axios.post('/api/getChatMessages', {
      startChat
    }).then(({ data: { data, success } }) => {
      if (success) {
        setMessages(data?.messages)
        setRecipient(getRecipientEmail(data?.chat?.users, user?.email || ''))
      }
    })
  }, [])

  return (
    <Box height='300px'>
      <Flex
        height='100%'
        flexDirection='column'
        justifyContent='space-between'
        overflowY='auto'
      >
        <Flex
          flexDirection='column'
          justifyContent='center'
          mb='10px'
        >
          <Flex
            mb='10px'
            overflowY='auto'
          >
            {recipient}
          </Flex>
          <Flex
            flexDirection='column'
            mb='10px'
            overflowY='auto'
          >
            {showMessages()}
          </Flex>
        </Flex>
        <Flex
          justifyContent='center'
          alignItems='center'
          mb='10px'
        >
          <Input onChange={(e: ChangeEvent<HTMLInputElement>) => setMessageToSend(e.target.value)} />
          <Flex
            justifyContent='center'
            alignItems='center'
            ml='5px'>
            <Button onClick={() => sendMessages()}><BiMailSend size='25px' /></Button>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Chat
