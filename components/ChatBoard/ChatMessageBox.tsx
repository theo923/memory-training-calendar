import { setTextColor } from 'lib/controller/controlColor'
import React from 'react'
import styled from 'styled-components'
import Text from 'styled/Text'
import GlassBox from 'styled/GlassBox'
import Flex from 'styled/Flex'

const DashboardTaskWrapper = styled(GlassBox)`
  display: flex;
  position: relative;
  border-radius: 5px;
  font-weight: 700;
`

const ChatMessageBox = ({
  me,
  user,
  message
}: any) => {
  return (
    <DashboardTaskWrapper
      my={['5px']}
      mx={['5px', '0px']}
      flexDirection='column'
      justifyContent='center'
      alignItems={me === user ? 'flex-end' : 'flex-start'}
    >
      <Flex
        mx='2px'
        p={['3px']}
      >
        <Text
          fontSize='10px'
          color={setTextColor(7)}
        >
          {me === user ? 'me' : user}
        </Text>
      </Flex>
      <Flex
        mx='2px'
        my='5px'
        p={['3px']}
      >
        <Text
          fontSize='18px'
          color={setTextColor(7)}
        >
          {message.message}
        </Text>
      </Flex>
    </DashboardTaskWrapper>
  )
}

export default ChatMessageBox

