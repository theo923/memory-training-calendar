import { setTextColor, setBooleanColor } from "lib/controller/controlColor";
import { TaskProps } from "lib/interface";
import styled, { css } from "styled-components";
import Box from "styled/Box";
import Flex from "styled/Flex";
import GlassBox from "styled/GlassBox";
import ReadSlateText from "styled/ReadSlateText";
import Text from "styled/Text";
import tw from "twin.macro";

type FinishedIdentifier = {
  finished: boolean
}

const FinishedIdentifier = styled(Flex) <FinishedIdentifier>`
  width: 20px;
   ${tw`rounded-sm`}

  ${({ finished }) => css`
    background-color: ${setBooleanColor(finished)};
  `}
`;

const TodayTaskTitle = styled(GlassBox) <{ setTaskColor: string }>`
  display: flex;
  border-radius: 5px;
  font-weight: 700;
  white-space: pre-line;

  ${({ setTaskColor }) => css`
    background: ${setTaskColor || ''}
  `}
`

const TodayTaskDescription = styled(GlassBox) <{ setTaskColor: string }>`
  display: flex;
  border-radius: 5px;
  font-weight: 700;
  white-space: pre-line;
  overflow-y: auto;

  ${({ setTaskColor }) => css`
    background: ${setTaskColor || ''}
  `}
`

interface Props {
  task: TaskProps
}

const TodayTask: React.FC<Props> = ({
  task,
}) => {

  return (
    <Box
      data-test="calendar-todayTask"
      mx='20px'
    >
      <TodayTaskTitle
        my={['10px']}
        mx={['10px', '0px']}
        setTaskColor={'#fff'}
      >
        <FinishedIdentifier
          finished={task?.t_finished}
        />
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
      </TodayTaskTitle>
      <TodayTaskDescription
        my={['10px']}
        mx={['10px', '0px']}
        setTaskColor={'#fff'}
      >
        <Box
          mx='10px'
          my='8px'
          p={['3px']}
          maxHeight='300px'
          width='auto'
          maxWidth={['400px', '600px', '425px']}
        >
          <Text
            fontSize='18px'
            color={setTextColor(7)}
          >
            <ReadSlateText
              values={JSON.parse(task?.taskDescription)}
            />
          </Text>
        </Box>
      </TodayTaskDescription>
    </Box>
  )
}

export default TodayTask
