import React from 'react'
import Flex from 'styled/Flex';
import Box from 'styled/Box';
import { TaskProps, UserProps } from 'lib/interface';
import TaskEntry from './TaskEntry';

interface Props {
  user: UserProps
  serverSettings: any
  unsorted: any
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
      >
        <Flex my='50px' fontSize="50px">
          Your Current Tasks
        </Flex>
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
          {unsorted &&
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
