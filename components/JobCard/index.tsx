import React from 'react'
import Box from '../../styled/Box'
import Text from '../../styled/Text'
import Flex from '../../styled/Flex';

interface Props {
  taskTitle: string
  taskDescription: string
}

const JobCard: React.FC<Props> = ({
  taskTitle,
  taskDescription
}): JSX.Element => {
  return (
    <Box height={['10vw']} m={['10px']}>
      <Flex
        flexDirection='column'
        justifyContent='center'
        overflowX='hidden'
        width='100%'
      >
        <Text
          fontSize={['20px', null, '20px']}
          lineHeight={['20px', null, '28px']}
        >
          {taskTitle}
        </Text>
        <Text
          fontSize={['15px', null, '15px']}
          lineHeight={['20px', null, '28px']}
        >
          {taskDescription}
        </Text>
      </Flex>
    </Box>
  )
}

export default JobCard
