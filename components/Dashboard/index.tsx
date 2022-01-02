import React from 'react'
import Flex from 'styled/Flex';
import Text from 'styled/Text';
import Box from 'styled/Box';
import CircleProgress from './CircleProgress';
import Grid from 'styled/Grid';
import { UserProps, UserTasksProps } from 'lib/interface';
import { getFullDate } from 'lib/get/getDate';
import { checkNum } from 'lib/utils/check_valid_num';

interface Props {
  user: UserProps
  tasks: UserTasksProps
  unsorted: any
}

const Dashboard: React.FC<Props> = ({
  user,
  tasks,
  // unsorted
}) => {
  const today = new Date()
  let numOfTasks = 0
  let monthDone = 0
  for (const [_, val] of Object.entries(tasks)) {
    val.forEach((task) => {
      numOfTasks++
      if (task.t_finished)
        monthDone++
    })
  }

  let percentageDay = 0
  if (tasks![getFullDate(today)]) {
    const totalTasks = tasks![getFullDate(today)].length
    const successfulTask = tasks![getFullDate(today)].filter(task => task?.t_finished === true).length
    percentageDay = Math.ceil(Math.abs(successfulTask / totalTasks * 100))
  }
  const percentageMonth = Math.ceil(Math.abs(monthDone / numOfTasks * 100))

  return (
    <Box textAlign='center'>
      <Flex
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
      >
        <Flex my='50px' fontSize="50px">
          {`Welcome back! ${user.username}`}
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
          <CircleProgress percents={checkNum(percentageDay)} />
          <Text fontSize={['20px', '30px']}>
            {`${checkNum(percentageDay)}% Tasks Finished (Day)`}
          </Text>
        </Flex>
        <Flex
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
        >
          <CircleProgress percents={checkNum(percentageMonth)} />
          <Text fontSize={['20px', '30px']}>
            {`${checkNum(percentageMonth)}% Tasks Finished (Month)`}
          </Text>
        </Flex>
      </Grid>
    </Box>
  )
}

export default Dashboard
