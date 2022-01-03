import { setTextColor } from "lib/controller/controlColor"
import styled from "styled-components"
import Box from "styled/Box"
import Text from "styled/Text"
import GlassBox from "styled/GlassBox"
import { getRecipientEmail } from "lib/firebase/utils"
import {
  auth,
  // db
} from "lib/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
// import { useCollection } from "react-firebase-hooks/firestore"

const DashboardTaskWrapper = styled(GlassBox)`
  cursor: pointer;
  display: flex;
  border-radius: 5px;
  font-weight: 700;

  &:hover {
    background-color: #fff
  }
`

const ChatUser = ({
  chat,
  setStartChat
}: any) => {
  // @ts-ignore
  const [user] = useAuthState(auth)
  // const [recipientSnapshot] = useCollection(
  //   // @ts-ignore
  //   db.collection('users')
  //     .where('email', '==', getRecipientEmail(chat, user?.email || ''))
  // )
  // const recipient = recipientSnapshot?.docs?.[0]?.data();
  const recipientEmail = getRecipientEmail(chat.data().users, user?.email || '') || ''
  return (
    <DashboardTaskWrapper
      onClick={() => setStartChat(chat.id)}
      my={['10px']}
      mx={['10px', '0px']}
    >
      <Box
        mx='3px'
        my='8px'
        p={['3px']}
      >
        <Text
          fontSize='18px'
          color={setTextColor(7)}
        >
          {recipientEmail}
        </Text>
      </Box>
    </DashboardTaskWrapper>
  )
}

export default ChatUser
