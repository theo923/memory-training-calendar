import { setSubMonthFirstDay, setToday, setAddMonthFirstDay } from "lib/controller/controlDate";
import { months } from "lib/data/dates";
import { BsArrowLeftSquareFill, BsArrowRightSquareFill } from "react-icons/bs";
import { CgCalendarDates } from "react-icons/cg";
import styled from "styled-components";
import Box from "styled/Box";
import Button from "styled/Button";
import Flex from "styled/Flex";
import Text from "styled/Text";

const Header = styled(Box)`
  background-color: #FAFAFA;
  border: .5px solid #808080;
  border-radius: 50px 50px 0 0;
`;

interface Props {
  target: Date
  setTarget: React.Dispatch<React.SetStateAction<Date>>
}

const CalendarHeader: React.FC<Props> = ({ target, setTarget }) => {
  return (
    <Header
      data-test="calendar-calendarHeader"
    >
      <Flex
        justifyContent='space-evenly'
        my='30px'
        fontSize={'30px'}
      >
        <Button onClick={() => setSubMonthFirstDay(setTarget)}><BsArrowLeftSquareFill size='20px' /></Button>
        <Text>{`${months![target?.getMonth()]} ${target?.getFullYear()}`}</Text>
        <Button onClick={() => setToday(setTarget)}><CgCalendarDates size='20px' /></Button>
        <Button onClick={() => setAddMonthFirstDay(setTarget)}><BsArrowRightSquareFill size='20px' /></Button>
      </Flex>
    </Header>
  )
}

export default CalendarHeader
