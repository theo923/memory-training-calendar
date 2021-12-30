import axios from "axios";
import { setTextColor, targetIdentifier, dayIdentifier, setBooleanColor } from "lib/controller/controlColor";
import { useWindowDimensions } from "lib/get/getWindowDimensions";
import { TaskProps } from "lib/interface";
import { refreshData } from "lib/utils/refresh_data";
import { NextRouter } from "next/router";
import { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import styled, { css } from "styled-components";
import Box from "styled/Box";
import Flex from "styled/Flex";
import GlassBox from "styled/GlassBox";
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

const CalendarTaskWrapper = styled(GlassBox) <{ setTaskColor: string }>`
  display: flex;
  border-radius: 5px;
  font-weight: 700;

  ${({ setTaskColor }) => css`
    background-color: ${setTaskColor || ''}
  `}
`

const Symbol = styled(Flex)`
  opacity: 0;
  &:hover {
    opacity: 1;
  }
`;

interface Props {
  router: NextRouter
  task: TaskProps
  day: Date
  target: Date
  targetedTask: TaskProps
  setTargetedTask: React.Dispatch<React.SetStateAction<TaskProps>>
}

const CalendarTask: React.FC<Props> = ({
  router,
  task,
  day,
  target,
  targetedTask,
  setTargetedTask
}) => {
  const width = useWindowDimensions()?.width
  const [textlimit, setTextlimit] = useState<number>(0);

  useEffect(() => {
    if (width >= 1012) setTextlimit(8 + 1)
    else if (width >= 768) setTextlimit(4 + 1)
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
        })
      }).then(({ data: { success } }) => {
        if (success) {
          refreshData(router)
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <CalendarTaskWrapper
      data-test="calendar-calendarTask"
      onClick={() => setTargetedTask(task)}
      my={['5px']}
      mx={['10px', '0px']}
      setTaskColor={setTextColor(targetIdentifier(task, targetedTask)) || "#2563eb"}
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
        <Text
          fontSize='18px'
          color={task === targetedTask ? setTextColor(6) : setTextColor(dayIdentifier(day, target))}
        >
          {
            textlimit ?
              task?.taskTitle.length > textlimit ?
                task?.taskTitle.substring(0, textlimit) + '...'
                : task?.taskTitle.substring(0, textlimit)
              : task?.taskTitle
          }
        </Text>
      </Box>
    </CalendarTaskWrapper>
  )
}

export default CalendarTask
