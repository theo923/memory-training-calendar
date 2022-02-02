import React, { useContext } from 'react'
import Flex from 'styled/Flex';
import Text from 'styled/Text';
import Box from 'styled/Box';
import { TaskProps } from 'lib/interface';
import TaskEntry from './TaskEntry';
import { UserContext } from 'components/User';

interface Props {
  unsorted: TaskProps[]
}

const Tasks: React.FC<Props> = ({
  unsorted
}) => {
  const userInfo = useContext(UserContext)
  return (
    <Box
      data-test='component-tasks'
      textAlign='center'
    >
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
          {unsorted?.length > 0 &&
            unsorted.map((tk: TaskProps, idx: number) =>
              <TaskEntry
                key={idx}
                task={{ ...tk, userID: userInfo?.user.id, userName: userInfo?.user.username }}
              />)
          }
        </Flex>
      </Flex>
    </Box>
  )
}

export default Tasks
