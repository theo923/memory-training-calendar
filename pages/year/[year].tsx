import { GetServerSideProps } from "next";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Calendar from "../../components/Calendar";
import JobBoard from "../../components/JobBoard";
import TaskBoard from "../../components/Tasks";
import Board from "../../components/Board";
import JobCreationBoard from "../../components/JobCreationBoard";
import ModifyBoard from "../../components/ModifyBoard";
import { client, DEFAULT_HEADERS } from "../../lib/apollo";
import { CALENDAR_QUERY } from "../../lib/queries/graphql-calendar";
import { TaskProps, UserProps, UserTasksProps } from "lib/interface";
import { initializeTask, initializeUser } from "lib/initialize";
import { startOfWeek, startOfYear, endOfYear, addDays, isSameMonth } from "date-fns";
import { getFullDate, getYearMonth } from "lib/get/getDate";
import { USER_INFO_QUERY } from "lib/queries/user-info";
import { Server_TaskDateProps, Server_TaskProps } from "lib/interface/server";
import { NextRouter } from "next/router";

interface Props {
  router: NextRouter
  status: boolean
  tasks: UserTasksProps
  targetYear: Date
  user: UserProps
}

const App: React.FC<Props> = ({ router, user, targetYear, status, tasks }): JSX.Element => {
  const currentYear: Date = new Date(targetYear)
  const currentUser: UserProps = user || initializeUser
  const [target, setTarget] = useState<Date>(
    isSameMonth(currentYear, new Date()) ?
      new Date()
      :
      new Date(targetYear)
  );
  const [userTasks, setUserTasks] = useState<UserTasksProps>(tasks || {})
  const [targetedTask, setTargetedTask] = useState<TaskProps>(initializeTask)

  useEffect(() => {
    if (!isSameMonth(currentYear, target)) {
      router.replace(`/year/${getYearMonth(addDays(target, 1))}`)
    }
  }, [target])

  useEffect(() => {
    setUserTasks(tasks)
  }, [tasks])

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
              router={router}
              currentUser={currentUser}
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
              router={router}
              targetedTask={targetedTask}
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
    const targetYear = new Date((query!['year'] + '-01') as string)
    const startYear = startOfWeek(startOfYear(targetYear))
    const endYear = endOfYear(targetYear)

    if (!req.cookies['calendar-user-token'])
      return {
        props: {
          user: initializeUser,
          targetYear: targetYear.toString(),
          status: false,
          tasks: {}
        }
      }

    const { data: { me: { id, username } } } =
      await client.query({
        query: USER_INFO_QUERY,
        context: DEFAULT_HEADERS(req.cookies['calendar-user-token'])
      })

    const user = {
      id, username
    }

    const { data: { tasks: { data } } } =
      await client.query({
        query: CALENDAR_QUERY,
        variables: {
          userID: id,
          userName: username,
          t_date_gte: getFullDate(startYear),
          t_date_lte: getFullDate(endYear),
        },
        context: DEFAULT_HEADERS(req.cookies['calendar-user-token'])
      })

    const sortedDateTask: UserTasksProps = {}
    if (data) {
      const tasks = data.filter((task: Server_TaskProps) => task?.attributes!['targetedDate'].length > 0)
      tasks.forEach((task: Server_TaskProps) => {
        task.attributes.targetedDate.forEach((date: Server_TaskDateProps) => {
          const { t_date } = date
          const returnObject = { id: task.id, ...task?.attributes }
          if (sortedDateTask![t_date as string])
            sortedDateTask[t_date as string].push(returnObject)
          else sortedDateTask[t_date as string] = [returnObject]
        })
      })
    }

    return {
      props: {
        user,
        targetYear: targetYear.toString(),
        status: true,
        tasks: sortedDateTask
      }
    }
  } catch (err) {
    console.log(err)
    return {
      props: {
        user: initializeUser,
        targetYear: '',
        status: false,
        tasks: {}
      }
    }
  }
}

export default App;
