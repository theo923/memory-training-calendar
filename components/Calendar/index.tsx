import React, { useEffect, useState } from "react";
import moment from "moment";
import Text from "../../styled/Text";
import Box from "../../styled/Box";
import styled from "styled-components";
import Grid from "../../styled/Grid";
import Flex from "../../styled/Flex";
import Button from "../../styled/Button";
import { BsArrowLeftSquareFill, BsArrowRightSquareFill } from 'react-icons/bs'

const Header = styled(Flex)`
  background-color: #FAFAFA;
  border: .5px solid #808080;
  border-radius: 50px 50px 0 0;
`;

const CalendarColumn = styled(Flex)`
  background-color: #FAFAFA;
  border: .5px solid #808080 ;
`;

const Calendar = () => {
  const [target, setTarget] = useState(moment());
  const [calendar, setCalendar] = useState<any[]>([]);
  const startMonth = target.clone().startOf("month").startOf("week");
  const endMonth = target.clone().endOf("month").endOf("week");

  useEffect(() => {
    const initialCalendar = startMonth.clone().subtract(1, "day");
    const a = []
    while (initialCalendar.isBefore(endMonth)) {
      if (initialCalendar.clone().add(1, "day").isAfter(endMonth))
        break
      a.push(
        Array(7)
          .fill("0")
          .map(() => initialCalendar.add(1, "day").clone())
      );
    }
    setCalendar(a)
  }, [target])

  return (
    <Box
      data-test="component-calendar"
      width={['100%', null, "50vw"]}
    >
      <Header
        justifyContent='space-evenly'
        pt='10px'
        pb='30px'
        fontSize={'30px'}
      >
        <Button onClick={() => setTarget(prev => prev.clone().subtract(1, 'month'))}><BsArrowLeftSquareFill size='40px' /></Button>
        <Text>{target.format('MMMM')}</Text>
        <Button onClick={() => setTarget(prev => prev.clone().add(1, 'month'))}><BsArrowRightSquareFill size='40px' /></Button>
      </Header>
      {calendar.map((week) => {
        return (
          <Grid gridTemplateColumns={["1fr 1fr 1fr 1fr 1fr 1fr 1fr"]}>
            {week.map((day) => (
              <CalendarColumn>
                <Flex
                  my='5px'
                  mx='5px'
                  height={["100px"]}>
                  <Text fontSize='20px'
                  >{day.format("D").toString()}</Text>
                </Flex>
              </CalendarColumn>
            ))}
          </Grid>
        );
      })}
    </Box>
  );
};

export default Calendar;
