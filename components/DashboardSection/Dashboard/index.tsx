import React from 'react'
import Flex from 'styled/Flex';
import Text from 'styled/Text';
import Box from 'styled/Box';
import CircleProgress from 'components/Progress/CircleProgress';
import Grid from 'styled/Grid';
import { TaskProps, UserProps, UserTasksProps } from 'lib/interface';
import { getFullDate } from 'lib/get/getDate';
import { checkNum } from 'lib/utils/check_valid_num';
import DashboardTask from './DashboardTask';
import TodayTask from './TodayTask';

interface Props {
  user: UserProps
  tasks: UserTasksProps
  unsorted: TaskProps[]
}

const Dashboard: React.FC<Props> = ({
  user,
  tasks,
  unsorted
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
        <Flex my='50px'>
          <Text fontSize="50px">
            {`Welcome back! ${user.username}`}
          </Text>
        </Flex>
        <Flex my='20px'>
          <Text fontSize="30px">
            Here is Your Progress
          </Text>
        </Flex>
      </Flex>
      <Grid gridTemplateColumns={['1fr 1fr']} my='20px'>
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
      <Grid
        mt='50px'
        gridTemplateColumns={['1fr', null, '1fr 1fr']}
      >
        <Flex
          flexDirection='column'
          alignItems='center'
        >
          <Text fontSize={['20px', '30px']}>Today's Task</Text>
          <Flex
            flexDirection='column'
            my='20px'
            width='100%'
          >
            {tasks![getFullDate(today)] &&
              <TodayTask
                task={tasks![getFullDate(today)][Math.floor(Math.random() * tasks![getFullDate(today)].length)]}
              />
            }
          </Flex>
        </Flex>
        <Flex
          flexDirection='column'
          alignItems='center'
        >
          <Text fontSize={['20px', '30px']}>Task's Progress</Text>
          <Flex
            flexDirection='column'
            my='20px'
            mx={['0', '50px', '20px']}
            width={['100%', '80%', '80%']}
          >
            {unsorted.length > 0 && unsorted.filter((_: any, idx: number) => idx < 5).map((task: any, idx: number) =>
              <DashboardTask
                key={idx}
                task={task}
                successTasks={task?.successTasks || 0}
                totalTasks={task?.totalTasks || 0}
              />
            )}
          </Flex>
        </Flex>
      </Grid>
    </Box>
  )
}

export default Dashboard
