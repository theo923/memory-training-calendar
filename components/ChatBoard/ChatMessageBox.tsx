import { setTextColor } from 'lib/controller/controlColor'
import React from 'react'
import styled from 'styled-components'
import Text from 'styled/Text'
import GlassBoxX2 from 'styled/GlassBoxX2'
import Flex from 'styled/Flex'
import { formatRelative } from 'date-fns'
import Avatar from './Avatar'
import Box from 'styled/Box'
import ReadSlateText from 'styled/ReadSlateText'

const DashboardTaskWrapper = styled(GlassBoxX2)`
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
        {user !== me && <Avatar width={['20px']} height={['20px']} radius='20px' user={user} />}
        <Box mx='5px'>
          <Text
            fontSize='10px'
            color={setTextColor(7)}
          >
            {me === user ? 'me' : user}
          </Text>
        </Box>
        {user === me && <Avatar width={['20px']} height={['20px']} user={user} />}
      </Flex>
      <Flex
        mx='2px'
        p={['3px']}
      >
        <Text
          fontSize='18px'
          color={setTextColor(7)}
        >
          <ReadSlateText
            values={JSON.parse(message?.message)}
          />
        </Text>
      </Flex>
      <Flex
        mx='2px'
        p={['3px']}
      >
        <Text fontSize='10px'>
          {message?.timestamp && formatRelative(
            message?.timestamp?.toDate(), new Date()
          )}
        </Text>
      </Flex>
    </DashboardTaskWrapper >
  )
}

export default ChatMessageBox

