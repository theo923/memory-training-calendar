import { ChangeEvent, useState } from "react"
import Box from "styled/Box"
import Button from "styled/Button"
import Input from "styled/Input"
import { FaUserPlus } from 'react-icons/fa'
import Flex from "styled/Flex"
import { auth, db } from "lib/firebase"
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import ChatUser from "./ChatUsers"
import Chat from "./Chat"

const ChatBoard = () => {
  //@ts-ignore
  const [user] = useAuthState(auth)
  const [addUser, setAddUser] = useState<string>('')
  const userChatRef = db.collection('chats').where('users', 'array-contains', user?.email)
  //@ts-ignore
  const [chatSnapshot] = useCollection(userChatRef)
  const [startChat, setStartChat] = useState<string>('')

  const handleAddUser = () => {
    if (user?.email != addUser &&
      !checkExistingChat(addUser) &&
      addUser.match(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/g)
    ) {
      if (user)
        db.collection('chats').add({
          users: [user.email, addUser]
        })
    }
  }

  const checkExistingChat = (rEmail: string) =>
    !!chatSnapshot?.docs.find
      (chat => chat.data().users.find(
        (user: any) => user === rEmail)?.length > 0
      )

  return (
    <Box>
      {!startChat && (
        <>
          <Flex
            justifyContent='center'
            alignItems='center'
            mb='30px'
          >
            <Input onChange={(e: ChangeEvent<HTMLInputElement>) => setAddUser(e.target.value)} />
            <Button onClick={() => handleAddUser()}><FaUserPlus size='20px' /></Button>
          </Flex>
          <Flex flexDirection='column'>
            {chatSnapshot?.docs.map(chat => (
              <ChatUser
                key={chat.id}
                setStartChat={setStartChat}
                chat={chat}
              />
            ))
            }
          </Flex>
        </>
      )}
      <Flex flexDirection='column'>
        {startChat &&
          <Chat key={startChat} startChat={startChat} />
        }
      </Flex>
    </Box>
  )
}

export default ChatBoard
