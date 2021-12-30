import {
  // setBgColor,
  dayIdentifier, setTextColor
} from "lib/controller/controlColor";
import { getCalendar } from "lib/get/getCalendar";
import { getFullDate } from "lib/get/getDate";
import { useWindowDimensions } from "lib/get/getWindowDimensions";
import { UserTasksProps, TaskProps } from "lib/interface";
import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import Box from "styled/Box";
import Flex from "styled/Flex";
import Text from "styled/Text";
import Grid from "styled/Grid";
import CalendarHeader from "./CalendarHeader";
import { NextRouter } from "next/router";
import TaskBox from "./CalendarTask";
// import GlassBox from "styled/GlassBox";

type CalendarColumnProps = {
  setColor: string
}

const CalendarColumn = styled(Flex) <CalendarColumnProps>`
  border: .5px solid #808080;
  cursor: pointer;

  ${({ setColor }) => css`
    background-color: ${setColor}
  `}
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
              // setColor={setBgColor(dayIdentifier(day, target)) || '#fff'}
              setColor='transparent'
              onClick={() => setTarget(day)}
            >
              <Flex
                flexWrap={['wrap', 'unset',]}
                flexDirection={['row', 'column']}
                my='5px'
                mx='5px'
                minWidth={["20px", '70px', "100px", "120px"]}
                minHeight={['0', "150px"]}
              >
                {<Box width='25px'>
                  <Text
                    fontSize='20px'
                    color={setTextColor(dayIdentifier(day, target))}
                  >
                    {day.getDate()}
                  </Text>
                </Box>
                }
                {userTasks![getFullDate(day)] && userTasks![getFullDate(day)].map(
                  (task: TaskProps, tidx: number) => {
                    if (tidx >= 3 && width >= 540) return null
                    return (
                      <TaskBox
                        key={tidx}
                        router={router}
                        task={task}
                        day={day}
                        target={target}
                        targetedTask={targetedTask}
                        setTargetedTask={setTargetedTask}
                      />
                    )
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
