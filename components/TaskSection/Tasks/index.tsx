import React from 'react'
import Flex from 'styled/Flex';
import Text from 'styled/Text';
import Box from 'styled/Box';
import { ServerSettingsProps, TaskProps, UserProps } from 'lib/interface';
import TaskEntry from './TaskEntry';

interface Props {
  user: UserProps
  serverSettings: ServerSettingsProps
  unsorted: TaskProps[]
}

const Tasks: React.FC<Props> = ({
  user,
  serverSettings,
  unsorted
}) => {
  return (
    <Box textAlign='center'>
      <Flex
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        my='50px'
      >
        <Text fontSize="50px">
          Your Current Tasks
        </Text>
      </Flex>
      <Flex
        flexDirection='column'
        alignItems='center'
      >
        <Flex
          flexDirection='column'
          my='20px'
          width={['100%', null, '50%']}
        >
          {unsorted.length > 0 &&
            unsorted.map((tk: TaskProps, idx: number) =>
              <TaskEntry
                key={idx}
                serverSettings={serverSettings}
                task={{ ...tk, userID: user.id, userName: user.username }}
              />)
          }
        </Flex>
      </Flex>
    </Box>
  )
}

export default Tasks
