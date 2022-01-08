import axios from 'axios'
import { auth, db } from 'lib/firebase'
import { getRecipientEmail } from 'lib/firebase/utils'
import React, { Dispatch, useEffect, useRef, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import { BiMailSend } from 'react-icons/bi'
import { BsArrowLeftSquare } from 'react-icons/bs'
import Box from 'styled/Box'
import Button from 'styled/Button'
import Flex from 'styled/Flex'
import ChatMessageBox from './ChatMessageBox'
import { serverTimestamp } from "firebase/firestore";
import Text from 'styled/Text'
import Avatar from './Avatar'
import SlateTextBox from 'styled/SlateTextBox'
import { controlTaskDescription } from 'lib/controller/controlTask'

interface Props {
  startChat: string
  setStartChat: Dispatch<React.SetStateAction<string>>
}

const Chat: React.FC<Props> = ({
  startChat,
  setStartChat
}) => {
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
  const endRef = useRef<null | HTMLDivElement>(null)
  const [regen, setRegen] = useState<number>(0)
  
  const scrolling = () => {
    endRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    })
  }

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

  const sendMessages = async () => {
    if (user && messageToSend.length > 0) {
      await db.collection('chats').doc(startChat).collection('messages').add({
        timestamp: serverTimestamp(),
        message: messageToSend,
        user: user.email
      })
    }
    setRegen(prev => prev + 1)
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
    <Box
      height='100%'
      width='100%'
    >
      <Flex
        height='100%'
        width='100%'
        flexDirection='column'
        justifyContent='space-between'
      >
        <Flex
          flexDirection='column'
          justifyContent='center'
        >
          <Flex alignItems='center'>
            <Flex alignItems='center' mr='10px'>
              <Button onClick={() => setStartChat('')}><BsArrowLeftSquare size='15px' /></Button>
            </Flex>
            <Avatar width={['20px']} height={['20px']} radius='20px' user={recipient} />
            <Text ml='5px'>
              {recipient}
            </Text>
          </Flex>
          <Box
            mb='10px'
            height='400px'
            overflowY='auto'
          >
            {showMessages()}
            <Box ref={endRef} />
          </Box>
        </Flex>
        <Flex
          justifyContent='center'
          alignItems='center'
          mb='10px'
        >
          <SlateTextBox
            key={regen}
            callChangeFunction={controlTaskDescription}
            changeHook={setMessageToSend}
            height='100px'
          />
          <Flex
            justifyContent='center'
            alignItems='center'
            ml='5px'>
            <Button onClick={() => { sendMessages(); scrolling(); }}><BiMailSend size='25px' /></Button>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Chat
