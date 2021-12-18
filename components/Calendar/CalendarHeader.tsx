import { BsArrowLeftSquareFill, BsArrowRightSquareFill } from "react-icons/bs";
import { CgCalendarDates } from "react-icons/cg";
import styled from "styled-components";
import Button from "../../styled/Button";
import Flex from "../../styled/Flex";
import Text from "../../styled/Text";
import { months } from "../../lib/data/dates";
import { setAddMonthFirstDay, setSubMonthFirstDay, setToday } from "../../lib/controller/controlDate";

const Header = styled(Flex)`
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
      justifyContent='space-evenly'
      pt='10px'
      pb='30px'
      fontSize={'30px'}
    >
      <Button onClick={() => setSubMonthFirstDay(setTarget)}><BsArrowLeftSquareFill size='40px' /></Button>
      <Text>{`${months[target?.getMonth()]} ${target?.getFullYear()}`}</Text>
      <Button onClick={() => setToday(setTarget)}><CgCalendarDates size='40px' /></Button>
      <Button onClick={() => setAddMonthFirstDay(setTarget)}><BsArrowRightSquareFill size='40px' /></Button>
    </Header>
  )
}

export default CalendarHeader
