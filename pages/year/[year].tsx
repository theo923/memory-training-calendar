import { GetServerSideProps } from "next";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import Board from "components/Board";
import Calendar from "components/Calendar";
import JobBoard from "components/JobBoard";
import JobCreationBoard from "components/JobCreationBoard";
import Layout from "components/Layout";
import ModifyBoard from "components/ModifyBoard";
import TaskBoard from "components/TaskBoard";
import { client, DEFAULT_HEADERS } from "lib/apollo";
import { CALENDAR_QUERY } from "lib/queries/graphql-calendar";
import { TaskProps, UserProps, UserTasksProps } from "lib/interface";
import { initializeTask, initializeUser } from "lib/initialize";
import { startOfWeek, startOfYear, endOfYear, addDays, isSameMonth } from "date-fns";
import { getFullDate, getYearMonth } from "lib/get/getDate";
import { USER_INFO_QUERY } from "lib/queries/user-info";
import { Server_TaskDateProps, Server_TaskProps } from "lib/interface/server";
import { NextRouter } from "next/router";
// import NavigationBar from "components/NavigationBar";

interface Props {
  router: NextRouter
  status: boolean
  tasks: UserTasksProps
  targetYear: Date
  user: UserProps
}

const App: React.FC<Props> = ({ router, user, targetYear, status, tasks }): JSX.Element => {
  const currentYear: Date = targetYear ? new Date(targetYear) : new Date()
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
        {/* <NavigationBar /> */}
        <Calendar
          router={router}
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
              router={router}
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

    const { data: { userTasks: { data: userData } } } =
      await client.query({
        query: CALENDAR_QUERY,
        variables: {
          id,
          t_date_gte: getFullDate(startYear),
          t_date_lte: getFullDate(endYear),
        },
        context: DEFAULT_HEADERS(req.cookies['calendar-user-token'])
      })

    const { attributes: { tasks: { data: tasksData } } } = userData[0]
    const sortedDateTask: UserTasksProps = {}

    if (tasksData.length > 0) {
      const tasks = tasksData.filter((task: Server_TaskProps) => task?.attributes['targetedDate'].length > 0)
      tasks.forEach((task: Server_TaskProps) => {
        task?.attributes!['targetedDate'].forEach((date: Server_TaskDateProps) => {
          const { t_date, t_finished } = date
          const returnObject = {
            ...task?.attributes,
            id: task.id,
            userID: id as string,
            userName: username as string,
            t_date,
            t_finished
          }
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
