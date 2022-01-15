import React from 'react'
import Flex from 'styled/Flex';
import Box from 'styled/Box';
import { TaskProps } from 'lib/interface';
import TaskEntry from './TaskEntry';

interface Props {
  unsorted: any
}

const Dashboard: React.FC<Props> = ({
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
            unsorted.map((task: TaskProps) =>
              <TaskEntry
                task={task}
              />)
          }
        </Flex>
      </Flex>
    </Box>
  )
}

export default Dashboard
