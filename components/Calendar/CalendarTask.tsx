import axios from "axios";
import { setTextColor, targetIdentifier, dayIdentifier, setBooleanColor } from "lib/controller/controlColor";
import { useWindowDimensions } from "lib/get/getWindowDimensions";
import { TaskProps, UserProps } from "lib/interface";
import { refreshData } from "lib/utils/refresh_data";
import { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import ReactTooltip from "react-tooltip";
import styled, { css } from "styled-components";
import Box from "styled/Box";
import Flex from "styled/Flex";
import TaskGlassBox from "styled/TaskGlassBox";
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

const CalendarTaskWrapper = styled(TaskGlassBox) <{ setTaskColor: string }>`
  display: flex;
  border-radius: 5px;
  font-weight: 700;

  ${({ setTaskColor }) => css`
    background: ${setTaskColor || ''}
  `}
`

const CalendarText = styled(Text)`
  font-size: 18px;
  user-select: none;
`

const Symbol = styled(Flex)`
  opacity: 0;
  &:hover {
    opacity: 1;
  }
`;

interface Props {
  task: TaskProps
  day: Date
  target: Date
  targetedTask: TaskProps
  setTargetedTask: React.Dispatch<React.SetStateAction<TaskProps>>
  currentUser: UserProps
}

const CalendarTask: React.FC<Props> = ({
  task,
  day,
  target,
  targetedTask,
  setTargetedTask,
  currentUser
}) => {
  const width = useWindowDimensions()?.width
  const [textlimit, setTextlimit] = useState<number>(0);
  const taskColor = (targetedTask === task ? setTextColor(targetIdentifier(task, targetedTask)) : task?.taskColor) || '#fff'

  useEffect(() => {
    if (width >= 1012) setTextlimit(7 + 1)
    else if (width >= 768) setTextlimit(3 + 1)
    else if (width >= 540) setTextlimit(1 + 1)
    else setTextlimit(0)
  }, [width])

  const handleFinished = async (task: TaskProps) => {
    try {
      await axios.post('/api/updateFinished', {
        taskID: task?.id,
        targetedDate: task!['targetedDate'].map((entry) => {
          if (entry!['t_date'] == task['t_date']) {
            entry!['t_finished'] = !Boolean(entry!['t_finished'])
          }
          return {
            t_date: entry!['t_date'],
            t_period: entry!['t_period'],
            t_finished: entry!['t_finished']
          }
        }),
        ip: currentUser?.ip || '',
        userID: currentUser?.id || '',
        userName: currentUser?.username || ''
      }).then(({ data: { success } }) => {
        if (success) {
          refreshData()
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <CalendarTaskWrapper
        data-test="calendar-calendarTask"
        onClick={() => setTargetedTask(task)}
        mb={['7px']}
        mx={['10px', '0px']}
        setTaskColor={taskColor}
        data-tip data-for={`taskTip-${task?.taskTitle}`}
      >
        <FinishedIdentifier
          finished={task?.t_finished}
          onClick={() => handleFinished(task)}
        >
          {task?.t_finished ?
            <Symbol>
              <AiOutlineClose size='20px' />
            </Symbol>
            :
            <Symbol>
              <AiOutlineCheck size='20px' />
            </Symbol>
          }
        </FinishedIdentifier>
        <Box
          mx='3px'
          p={['3px']}
        >
          <CalendarText

            color={task === targetedTask ? setTextColor(6) : setTextColor(dayIdentifier(day, target))}
          >
            {
              textlimit ?
                task?.taskTitle?.length > textlimit ?
                  task?.taskTitle?.substring(0, textlimit) + '...'
                  : task?.taskTitle?.substring(0, textlimit)
                : task?.taskTitle
            }
          </CalendarText>
        </Box>
      </CalendarTaskWrapper>
      <ReactTooltip
        id={`taskTip-${task?.taskTitle}`} place="top" effect="solid"
      >
        <Text>
          {task?.taskTitle}
        </Text>
      </ReactTooltip>
    </>
  )
}

export default CalendarTask
