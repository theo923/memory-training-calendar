import React, { useEffect, useState } from "react";
import Text from "../../styled/Text";
import Box from "../../styled/Box";
import styled, { css } from "styled-components";
import Grid from "../../styled/Grid";
import Flex from "../../styled/Flex";
import { getCalendar } from "../../lib/get/getCalendar";
import CalendarHeader from "./CalendarHeader";
import { setTextColor, setBgColor, dayIdentifier } from "../../lib/controller/controlColor";

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

const Calendar = () => {
  const [target, setTarget] = useState(new Date());
  const [calendar, setCalendar] = useState([]);

  useEffect(() => {
    setCalendar(getCalendar(target))
  }, [target])

  return (
    <Box
      data-test="component-calendar"
      width={['100%', null, "50vw"]}
    >
      <CalendarHeader
        setTarget={setTarget}
        target={target}
      />
      {calendar.map((week, cidx) => (
        <Grid
          key={cidx}
          gridTemplateColumns={["1fr 1fr 1fr 1fr 1fr 1fr 1fr"]}
        >
          {week.map((day, didx) => (
            <CalendarColumn
              key={didx}
              setColor={setBgColor(dayIdentifier(day, target))}
              onClick={() => setTarget(day)}
            >
              <Flex
                my='5px'
                mx='5px'
                height={["100px"]}>
                {<Text
                  fontSize='20px'
                  className={setTextColor(dayIdentifier(day, target))}
                >
                  {day.getDate()}
                </Text>}
              </Flex>
            </CalendarColumn>)
          )}
        </Grid>
      )
      )}
    </Box>
  );
};

export default Calendar;
