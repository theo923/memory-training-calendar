import React from 'react'
import Flex from 'styled/Flex';
import Text from 'styled/Text';
import Box from 'styled/Box';
import CircleProgress from './CircleProgress';
import Grid from 'styled/Grid';


const Dashboard = () => {
  return (
    <Box textAlign='center'>
      <Flex
        
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
      >
        <Flex my='50px' fontSize="50px">
          Welcome back! username
        </Flex>
        <Flex my='50px' fontSize="30px">
          Here is Your Progress
        </Flex>
      </Flex>
      <Grid gridTemplateColumns={['1fr 1fr']}>
        <Flex
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
        >
          <CircleProgress percents={80} />
          <Text fontSize={['20px', '30px']}>
            80% Tasks Finished (Day)
          </Text>
        </Flex>
        <Flex
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
        >
          <CircleProgress percents={60} />
          <Text fontSize={['20px', '30px']}>
            60% Tasks Finished (Month)
          </Text>
        </Flex>
      </Grid>

    </Box>
  )
}

export default Dashboard
