import { setBgColor, dayIdentifier, setTextColor, targetIdentifier } from "lib/controller/controlColor";
import { getCalendar } from "lib/get/getCalendar";
import { getFullDate } from "lib/get/getFullDate";
import { useWindowDimensions } from "lib/get/getWindowDimensions";
import { UserTasksProps, TaskProps } from "lib/interface";
import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import Box from "styled/Box";
import Flex from "styled/Flex";
import Text from "styled/Text";
import Grid from "styled/Grid";
import tw from "twin.macro";
import CalendarHeader from "./CalendarHeader";


type CalendarColumnProps = {
  setColor: string
}

const TaskBox = styled(Box) <{ setTaskColor: string }>`
  width: 100%;
  font-weight: 700;
    ${tw`border-2 border-black shadow-lg rounded-md px-2`}

  ${({ setTaskColor }) => css`
    background-color: ${setTaskColor || ''}
  `}
`

const CalendarColumn = styled(Flex) <CalendarColumnProps>`
  border: .5px solid #808080;
  cursor: pointer;

  ${({ setColor }) => css`
    background-color: ${setColor}
  `}
`;

interface Props {
  target: Date
  setTarget: React.Dispatch<React.SetStateAction<Date>>
  userTasks: UserTasksProps
  targetedTask: TaskProps
  setTargetedTask: React.Dispatch<React.SetStateAction<TaskProps>>
}

const Calendar: React.FC<Props> = ({
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
                    if (tidx >= 3) return ''
                    return <TaskBox
                      key={tidx}
                      onClick={() => setTargetedTask(task)}
                      padding={['3px']}
                      my={['5px']}
                      setTaskColor={setTextColor(targetIdentifier(task, targetedTask)) || "#2563eb"}
                    >
                      <Text
                        fontSize='18px'
                        color={task === targetedTask ? setTextColor(5) : setTextColor(6)}
                      >
                        {
                          textlimit ?
                            task.taskTitle.length > textlimit ?
                              task.taskTitle.substring(0, textlimit) + '...'
                              : task.taskTitle.substring(0, textlimit)
                            : task.taskTitle
                        }
                      </Text>
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
