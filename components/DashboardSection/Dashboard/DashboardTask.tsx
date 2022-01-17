import ProgressBar from "components/Progress/ProgressBar";
import { setTextColor } from "lib/controller/controlColor";
import { TaskProps } from "lib/interface";
import styled, { css } from "styled-components";
import Box from "styled/Box";
import GlassBox from "styled/GlassBox";
import Grid from "styled/Grid";
import Text from "styled/Text";

const DashboardTaskWrapper = styled(GlassBox) <{ setTaskColor: string }>`
  display: flex;
  border-radius: 5px;
  font-weight: 700;

  ${({ setTaskColor }) => css`
    background: ${setTaskColor || ''}
  `}
`

interface Props {
  task: TaskProps
  successTasks: number
  totalTasks: number
}

const DashboardTask: React.FC<Props> = ({
  task,
  successTasks,
  totalTasks
}) => {

  return (
    <Grid
      data-test="dashboard-dashboardTask"
      gridTemplateColumns='0.6fr 1.4fr'
    >
      <DashboardTaskWrapper

        my={['10px']}
        mx={['10px', '0px']}
        setTaskColor={'#fff'}
      >
        <Box
          mx='3px'
          my='8px'
          p={['3px']}
        >
          <Text
            fontSize='18px'
            color={setTextColor(7)}
          >
            {task?.taskTitle}
          </Text>
        </Box>
      </DashboardTaskWrapper>
      <Box
        mx='10px'
        alignSelf='center'
      >
        <ProgressBar
          successRate={`${successTasks / totalTasks * 100}%`}
          height="50px"
        />
      </Box>
    </Grid>
  )
}

export default DashboardTask
