import { GetServerSideProps } from "next";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Calendar from "../components/Calendar";
import JobBoard from "../components/JobBoard";
import TaskBoard from "../components/Tasks";
import Board from "../components/Board";
import JobCreationBoard from "../components/JobCreationBoard";
import ModifyBoard from "../components/ModifyBoard";
import { client, DEFAULT_HEADERS } from "../lib/apollo";
import { CALENDAR_QUERY } from "../lib/queries/graphql-calendar";
import { TaskProps, UserTasksProps } from "lib/interface";
import { initializeTask } from "lib/initialize";
import { startOfWeek, startOfYear, endOfYear, isSameYear } from "date-fns";
import { getFullDate } from "lib/get/getDate";
import { NextRouter, useRouter } from "next/router";

interface Props {
  status: boolean
  tasks: UserTasksProps
  targetYear: Date
}

const App: React.FC<Props> = ({ targetYear, status, tasks }): JSX.Element => {
  const currentYear = new Date(targetYear)
  const [target, setTarget] = useState<Date>(new Date());
  const [userTasks, setUserTasks] = useState<UserTasksProps>(tasks || {})
  const [targetedTask, setTargetedTask] = useState<TaskProps>(initializeTask)

  const router: NextRouter = useRouter()
  useEffect(() => {
    if (!isSameYear(currentYear, target)) {
      router.push({
        pathname: '/',
        query: { year: target.toString() }
      })
    }
  }, [target])

  return (
    <>
      <Head>
        <title>Memory Training Calendar</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Calendar
          target={target}
          setTarget={setTarget}
          userTasks={userTasks}
          targetedTask={targetedTask}
          setTargetedTask={setTargetedTask}
        />
        <JobBoard>
          {status === false &&
            <Board
              title={'Login'}
              type='login'
            />
          }
          {status === false &&
            <Board
              title={'Register'}
              type='register'
            />
          }
          <Board title={'Create Task Board'}>
            <JobCreationBoard
              userTasks={userTasks}
              setUserTasks={setUserTasks}
              target={target}
            />
          </Board>
          <Board title={'Task Board'}>
            <TaskBoard
              userTasks={userTasks}
              target={target}
            />
          </Board>
          <Board title={'Modify Board'}>
            <ModifyBoard
              targetedTask={targetedTask}
              setTargetedTask={setTargetedTask}
              target={target}
            />
          </Board>
          {status === true &&
            <Board
              title={'Logout'}
              type='logout'
            />
          }
        </JobBoard>
      </Layout>
    </>
  );
};


export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  try {
    let targetYear
    if (query!['year'])
      targetYear = new Date(query['year'] as string)
    else
      targetYear = new Date()
    const startYear = startOfWeek(startOfYear(targetYear))
    const endYear = endOfYear(targetYear)

    if (!req.cookies['calendar-user-token'])
      return {
        props: {
          targetYear: targetYear.toString(),
          status: false,
          tasks: {}
        }
      }

    const { data: { tasks: { data } } } =
      await client.query({
        query: CALENDAR_QUERY,
        variables: {
          t_date_gte: getFullDate(startYear),
          t_date_lte: getFullDate(endYear),
        },
        context: DEFAULT_HEADERS(req.cookies['calendar-user-token'])
      })

    const returnVal: any = {}
    if (data) {
      const tasks = data.filter((each: any) => each?.attributes!['targetedDate'].length > 0)
      tasks.forEach((task: any) => {
        task.attributes.targetedDate.forEach((date: any) => {
          const { t_date } = date
          const returnObject = { id: parseInt(task.id), ...task?.attributes }
          if (returnVal![t_date])
            returnVal[t_date].push(returnObject)

          else returnVal[t_date] = [returnObject]
        })
      })
    }

    return {
      props: {
        targetYear: targetYear.toString(),
        status: true,
        tasks: returnVal
      }
    }
  } catch (err) {
    console.log(err)
    return {
      props: {
        targetYear: '',
        status: false,
        tasks: {}
      }
    }
  }
}

export default App;
