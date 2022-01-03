import { setBgColor, dayIdentifier, setTextColor } from "lib/controller/controlColor";
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
import { days } from "lib/data/dates";
import ProgressBar from "components/Progress/ProgressBar";
import { MdAutoAwesome } from "react-icons/md";

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

const DoneAll = styled(Box)`
  justify-self: flex-end;
  align-self: center;
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
  const [calendar, setCalendar] = useState<Date[][]>([]);
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
      {width >= 540 &&
        <Grid
          gridTemplateColumns={["1fr", "1fr 1fr 1fr 1fr 1fr 1fr 1fr"]}
        >
          {[...Array(7)].map((_, dnidx: number) =>
            <Text key={dnidx} textAlign='center'>{days[dnidx]}</Text>
          )}
        </Grid>
      }
      {calendar.map((week: Date[], cidx: number) => (
        <Grid
          key={cidx}
          gridTemplateColumns={["1fr", "1fr 1fr 1fr 1fr 1fr 1fr 1fr"]}
        >
          {week.map((day: Date, didx: number) => {
            let successRate = ''
            if (userTasks![getFullDate(day)]?.length > 0) {
              const totalTasks = userTasks![getFullDate(day)].length
              const successfulTask = userTasks![getFullDate(day)].filter(task => task?.t_finished === true).length
              successRate = `${Math.abs(successfulTask / totalTasks * 100)}%`
            }
            return (
              <CalendarColumn
                key={didx}
                setColor={setBgColor(dayIdentifier(day, target)) || 'transparent'}
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
                  {<Grid gridTemplateColumns='1fr 1fr 1fr' width={['110px', null, '100%']}>
                    <Text
                      fontSize='20px'
                      color={setTextColor(dayIdentifier(day, target))}
                    >
                      {day.getDate()}
                    </Text>

                    {width <= 540 ?
                      <Text
                        fontSize='20px'
                        color={setTextColor(dayIdentifier(day, target))}
                      >
                        {days[didx % 7]}
                      </Text>
                      :
                      <Box></Box>
                    }

                    {successRate === '100%' &&
                      <DoneAll>
                        <MdAutoAwesome color='green' size='20px' />
                      </DoneAll>
                    }

                  </Grid>
                  }

                  {successRate.length > 0 &&
                    <ProgressBar successRate={successRate} />
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
                    })
                  }
                </Flex>
              </CalendarColumn>
            )
          })}
        </Grid>
      )
      )}
    </Box >
  );
};

export default Calendar;
