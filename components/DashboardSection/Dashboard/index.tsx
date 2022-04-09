import React, { useContext } from 'react'
import Flex from 'styled/Flex';
import Text from 'styled/Text';
import Box from 'styled/Box';
import CircleProgress from 'components/Progress/CircleProgress';
import Grid from 'styled/Grid';
import { TaskProps, UserTasksProps } from 'lib/interface';
import { getFullDate } from 'lib/get/getDate';
import { checkNum } from 'lib/utils/check_valid_num';
import DashboardTask from './DashboardTask';
import TodayTask, { TodayTaskDescription } from './TodayTask';
import { UserContext } from 'components/User';
import { setTextColor } from 'lib/controller/controlColor';
import GlassBox from 'styled/GlassBox';
import styled from 'styled-components';
import IconWrapper from 'styled/IconWrapper';
import { GrValidate } from 'react-icons/gr'
import { BiPieChart, BiTask } from 'react-icons/bi'
import { BsPieChartFill } from 'react-icons/bs'

const GlassCard = styled(GlassBox)`
  min-height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const SpanGlassCard = styled(GlassCard)`
  @media only screen and (max-width: 768px) {
    grid-column: 1 / 3;
  }
`

interface Props {
  tasks: UserTasksProps
  unsorted: TaskProps[]
}

const Dashboard: React.FC<Props> = ({
  tasks,
  unsorted
}) => {
  const userInfo = useContext(UserContext)
  const today = new Date()
  let numOfTasks = 0
  let monthDone = 0
  let percentageDay = 0
  if (tasks != null) {
    for (const [_, val] of Object.entries(tasks)) {
      val.forEach((task) => {
        numOfTasks++
        if (task.t_finished)
          monthDone++
      })

      if (tasks![getFullDate(today)]) {
        const totalTasks = tasks![getFullDate(today)].length
        const successfulTask = tasks![getFullDate(today)].filter(task => task?.t_finished === true).length
        percentageDay = Math.ceil(Math.abs(successfulTask / totalTasks * 100))
      }
    }
  }
  const percentageMonth = Math.ceil(Math.abs(monthDone / numOfTasks * 100))

  const entry = (icon: React.ReactNode, title: string, content: React.ReactNode, paddingX?: string) => {
    return (
      <>
        <Flex mx='30px' mt='30px' mb='30px' alignSelf='flex-start'>
          <IconWrapper>
            {icon}
          </IconWrapper>
        </Flex>
        <Flex
          width='100%'
          height='100%'
          flexDirection='column'
        >
          <Text px={['30px', '50px']} mb='20px' fontSize={['20px', '30px']}>
            {title}
          </Text>
          <Box px={paddingX ? paddingX : '0'}>
            {content}
          </Box>
        </Flex>
      </>
    )
  }

  return (
    <Box data-test='component-dashboard' textAlign='center'>
      <Flex
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
      >
        <Flex my='50px'>
          <Text fontSize="50px">
            {`Welcome back! ${userInfo?.user?.username || ''}`}
          </Text>
        </Flex>
      </Flex>
      <Grid gridTemplateColumns={['1fr 1fr', null, null, '1fr 1fr', '1fr 1fr 1fr 1fr']} gridGap='30px' my='20px'>
        <GlassCard round>
          {entry(
            <GrValidate size='30px' />,
            'Tasks Finished (Day)',
            <CircleProgress
              percents={checkNum(percentageDay)}
              emptyStroke={checkNum(percentageDay) === 0 ? '#e2e2e2' : 'transparent'}
            />
          )}
        </GlassCard>
        <GlassCard round>
          {entry(
            <BiPieChart size='30px' />,
            'Tasks Finished (Month)',
            <CircleProgress
              percents={checkNum(percentageMonth)}
              emptyStroke={checkNum(percentageMonth) === 0 ? '#e2e2e2' : 'transparent'}
            />
          )}
        </GlassCard>
        <SpanGlassCard round>
          {entry(
            <BiTask size='30px' />,
            "Today's Task",
            tasks != null &&
              tasks![getFullDate(today)] ?
              <TodayTask
                task={tasks![getFullDate(today)][Math.floor(Math.random() * tasks![getFullDate(today)].length)]}
              />
              :
              <TodayTaskDescription
                my={['10px']}
                mx={['10px', '0px']}
                setTaskColor={'#fff'}
              >
                <Box
                  mx='10px'
                  my='8px'
                  p={['3px']}
                  height='300px'
                  width='auto'
                  maxWidth={['400px', '600px', '425px']}
                >
                  <Text
                    fontSize='18px'
                    color={setTextColor(7)}

                  >
                    No Tasks for Today!
                  </Text>
                </Box>
              </TodayTaskDescription>
          )}
        </SpanGlassCard>
        <SpanGlassCard round>
          {entry(
            <BsPieChartFill size='30px' />,
            "Task's Progress",
            unsorted?.length > 0 &&
            unsorted.filter((_: any, idx: number) => idx < 5).map((task: any, iidx: number) =>
              <DashboardTask
                key={`dashboardTask_${iidx}`}
                task={task}
                successTasks={task?.successTasks || 0}
                totalTasks={task?.totalTasks || 0}
              />
            ),
            '20px'
          )}
        </SpanGlassCard>
      </Grid>
    </Box>
  )
}

export default Dashboard
