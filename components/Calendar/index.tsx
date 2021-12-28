import { setBgColor, dayIdentifier, setTextColor, targetIdentifier } from "lib/controller/controlColor";
import { getCalendar } from "lib/get/getCalendar";
import { getFullDate } from "lib/get/getDate";
import { useWindowDimensions } from "lib/get/getWindowDimensions";
import { UserTasksProps, TaskProps } from "lib/interface";
import { AiOutlineClose, AiOutlineCheck } from 'react-icons/ai'
import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import Box from "styled/Box";
import Flex from "styled/Flex";
import Text from "styled/Text";
import Grid from "styled/Grid";
import tw from "twin.macro";
import CalendarHeader from "./CalendarHeader";
import axios from "axios";
import { refreshData } from "lib/utils/refresh_data";
import { NextRouter } from "next/router";


type CalendarColumnProps = {
  setColor: string
}

type FinishedIdentifier = {
  finished: boolean
}

const TaskBox = styled(Flex) <{ setTaskColor: string }>`
  width: 100%;
  font-weight: 700;
    ${tw`border-2 border-black shadow-lg rounded-md`}

  ${({ setTaskColor }) => css`
    background-color: ${setTaskColor || ''}
  `}
`

const CalendarColumn = styled(Flex) <CalendarColumnProps>`
  border: .5px solid #808080;
  cursor: pointer;
  box-sizing: content-box;

  ${({ setColor }) => css`
    background-color: ${setColor}
  `}
`;

const FinishedIdentifier = styled(Flex) <FinishedIdentifier>`
  width: 20px;
  box-sizing: content-box;
   ${tw`rounded-sm`}

  ${({ finished }) => css`
    background-color: ${finished ? '#66d4a0' : '#ef4444'};
  `}
`;

const Symbol = styled(Flex)`
  opacity: 0;
  &:hover {
    opacity: 1;
  }
`;

interface Props {
  router: NextRouter
  target: Date
  setTarget: React.Dispatch<React.SetStateAction<Date>>
  userTasks: UserTasksProps
  targetedTask: TaskProps
  setTargetedTask: React.Dispatch<React.SetStateAction<TaskProps>>
}

const Calendar: React.FC<Props> = ({
  router,
  target,
  setTarget,
  userTasks,
  targetedTask,
  setTargetedTask
}) => {
  const [calendar, setCalendar] = useState<any>([]);
  const width = useWindowDimensions()?.width
  const [textlimit, setTextlimit] = useState(0);

  useEffect(() => {
    if (width >= 1012) setTextlimit(9 + 1)
    else if (width >= 768) setTextlimit(6 + 1)
    else if (width >= 540) setTextlimit(3 + 1)
    else setTextlimit(0)
  }, [width])

  useEffect(() => {
    setCalendar(getCalendar(target))
  }, [target])

  const handleFinished = async (task: TaskProps) => {
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
  }

  return (
    <Box
      data-test="component-calendar"
      width='100%'
    >
      <CalendarHeader
        setTarget={setTarget}
        target={target}
      />
      {calendar.map((week: any, cidx: number) => (
        <Grid
          key={cidx}
          gridTemplateColumns={["1fr", "1fr 1fr 1fr 1fr 1fr 1fr 1fr"]}
        >
          {week.map((day: any, didx: number) => (
            <CalendarColumn
              key={didx}
              setColor={setBgColor(dayIdentifier(day, target)) || '#fff'}
              onClick={() => setTarget(day)}
            >
              <Flex
                flexDirection='column'
                my='5px'
                mx='5px'
                minWidth={["20px", '70px', "100px", "120px"]}
                minHeight={['0', "150px"]}
              >
                {<Text
                  fontSize='20px'
                  color={setTextColor(dayIdentifier(day, target))}
                >
                  {day.getDate()}
                </Text>}
                {userTasks![getFullDate(day)] && userTasks![getFullDate(day)].map(
                  (task: TaskProps, tidx: number) => {
                    if (tidx >= 3) return <></>
                    return <TaskBox
                      key={tidx}
                      onClick={() => setTargetedTask(task)}
                      my={['5px']}
                      setTaskColor={setTextColor(targetIdentifier(task, targetedTask)) || "#2563eb"}
                    >
                      <FinishedIdentifier
                        finished={task.t_finished}
                        onClick={() => handleFinished(task)}
                      >
                        {task.t_finished ?
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
                              task.taskTitle.length > textlimit ?
                                task.taskTitle.substring(0, textlimit) + '...'
                                : task.taskTitle.substring(0, textlimit)
                              : task.taskTitle
                          }
                        </Text>
                      </Box>
                    </TaskBox>
                  })}
              </Flex>
            </CalendarColumn>
          ))}
        </Grid>
      )
      )}
    </Box>
  );
};

export default Calendar;
