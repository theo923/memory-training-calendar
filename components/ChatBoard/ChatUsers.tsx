import { setTextColor } from "lib/controller/controlColor"
import styled from "styled-components"
import Box from "styled/Box"
import Text from "styled/Text"
import GlassBox from "styled/GlassBox"
import { getRecipientEmail } from "lib/firebase/utils"
import { auth } from "lib/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import Flex from "styled/Flex"
import Avatar from "./Avatar"

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
  const recipientEmail = getRecipientEmail(chat.data().users, user?.email || '') || ''
  return (
    <DashboardTaskWrapper
      onClick={() => setStartChat(chat.id)}
      my={['10px']}
      mx={['10px', '0px']}
    >
      <Flex
        justifyContent='center'
        alignItems='center'
        mx='3px'
        my='8px'
        p={['3px']}
      >
        <Box ml='5px' mr='10px'>
          <Avatar user={recipientEmail} />
        </Box>
        <Box>
          <Text
            fontSize='14px'
            color={setTextColor(7)}
          >
            {recipientEmail}
          </Text>
        </Box>
      </Flex>
    </DashboardTaskWrapper>
  )
}

export default ChatUser
