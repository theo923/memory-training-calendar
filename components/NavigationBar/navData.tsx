import { QUIZBOOK_URL, TODOLIST_URL, TASKS_URL, CALENDAR_URL, DASHBOARD_URL, QUIZBOOK_RANKING_URL } from "lib/data/pageUrl";
import { FaTasks } from "react-icons/fa";
import { ImCalendar, ImList } from "react-icons/im";
import { MdQuiz, MdSpaceDashboard } from "react-icons/md";
import { RiVipCrownFill } from "react-icons/ri";

export interface NavDataProps {
  name: string,
  destination: string,
  icon: React.ReactNode
}

export const navData: NavDataProps[] = [
  {
    name: 'Dashboard',
    destination: DASHBOARD_URL,
    icon: <MdSpaceDashboard size='30px' />,
  },
  {
    name: 'Calendar',
    destination: CALENDAR_URL,
    icon: <ImCalendar size='25px' />,
  },
  {
    name: 'Tasks',
    destination: TASKS_URL,
    icon: <ImList size='25px' />,
  },
  {
    name: 'TodoList',
    destination: TODOLIST_URL,
    icon: <FaTasks size='30px' />,
  },
  {
    name: 'QuizBook Ranking',
    destination: QUIZBOOK_RANKING_URL,
    icon: <RiVipCrownFill size='30px' />,
  },
  {
    name: 'My QuizBook',
    destination: QUIZBOOK_URL,
    icon: <MdQuiz size='30px' />,
  },
]
