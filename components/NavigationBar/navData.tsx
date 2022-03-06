import { addDays } from "date-fns";
import { getYearMonth } from "lib/get/getDate";
import { FaTasks } from "react-icons/fa";
import { ImCalendar, ImList } from "react-icons/im";
import { MdQuiz, MdSpaceDashboard } from "react-icons/md";

export interface NavDataProps {
  name: string,
  destination: string,
  icon: React.ReactNode
}

export const navData: NavDataProps[] = [
  {
    name: 'Dashboard',
    destination: '/dashboard',
    icon: <MdSpaceDashboard size='30px' />,
  },
  {
    name: 'Calendar',
    destination: `/year/${getYearMonth(addDays(new Date(), 1))}`,
    icon: <ImCalendar size='25px' />,
  },
  {
    name: 'Tasks',
    destination: '/tasks',
    icon: <ImList size='25px' />,
  },
  {
    name: 'TodoList',
    destination: '/todoList',
    icon: <FaTasks size='30px' />,
  },
  {
    name: 'QuizBook',
    destination: '/quizBook/1',
    icon: <MdQuiz size='30px' />,
  },
]
