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
import { TaskProps, UserProps, UserTasksProps } from "lib/interface";
import { initializeTask, initializeUser } from "lib/initialize";
import { addDays, endOfYear, isSameMonth, startOfWeek, startOfYear } from "date-fns";
import { getYearMonth } from "lib/get/getDate";
import { NextRouter } from "next/router";
import NavigationBar from "components/NavigationBar";
import MainComponent from "components/MainComponent";
import { getUserInfo } from "lib/get/getUserInfo";
import { getSortedDateTask } from "lib/get/getSortedDateTask";

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
        <title>Calendar | Memory Training Calendar</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <NavigationBar router={router} />
        <MainComponent>
          <Calendar
            router={router}
            target={target}
            setTarget={setTarget}
            userTasks={userTasks}
            targetedTask={targetedTask}
            setTargetedTask={setTargetedTask}
          />
        </MainComponent>
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
          {user?.id && user?.username &&
            <Board title={'Create Task Board'}>
              <JobCreationBoard
                router={router}
                currentUser={currentUser}
                userTasks={userTasks}
                setUserTasks={setUserTasks}
                target={target}
              />
            </Board>
          }
          {user?.id && user?.username &&
            <Board title={'Task Board'}>
              <TaskBoard
                router={router}
                userTasks={userTasks}
                target={target}
              />
            </Board>
          }
          {user?.id && user?.username &&
            <Board title={'Modify Board'}>
              <ModifyBoard
                router={router}
                targetedTask={targetedTask}
                target={target}
              />
            </Board>
          }
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

    if (!req.cookies['calendar-user-token'])
      return {
        props: {
          user: initializeUser,
          targetYear: targetYear.toString(),
          status: false,
          tasks: {}
        }
      }
    
    const startYear = startOfWeek(startOfYear(targetYear))
    const endYear = endOfYear(targetYear)

    const { user } = await getUserInfo(req)
    const tasks = await getSortedDateTask(user, startYear, endYear, req)

    return {
      props: {
        user,
        targetYear: targetYear.toString(),
        status: true,
        tasks
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
