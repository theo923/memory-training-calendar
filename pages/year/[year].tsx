import { GetServerSideProps } from "next";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import Board from "components/Board";
import Calendar from "components/Calendar";
import JobBoard from "components/JobBoard";
import CreateTaskBoard from "components/CreateTaskBoard";
import Layout from "components/Layout";
import ModifyBoard from "components/ModifyBoard";
import TaskBoard from "components/TaskBoard";
import { ServerSettingsProps, TaskProps, UserProps, UserSettingsProps, UserTasksProps } from "lib/interface";
import { initializeTask, initializeUser } from "lib/initialize";
import { addDays, isSameMonth, startOfWeek } from "date-fns";
import { getStartYearEndYear, getYearMonth } from "lib/get/getDate";
import { NextRouter, useRouter } from "next/router";
import NavigationBar from "components/NavigationBar";
import MainComponent from "components/MainComponent";
import { getUserInfo } from "lib/get/getUserInfo";
import { getSortedDateTask } from "lib/get/getSortedDateTask";
import { getServerSettings } from "lib/get/getServerSettings";
import { getUserSettings } from "lib/get/getUserSettings";
import UtilsBoard from "components/UtilsBoard";
import ChatBoard from "components/ChatBoard";
import Modal from "components/Modal";

interface Props {
  serverSettings: ServerSettingsProps
  status: boolean
  tasks: UserTasksProps
  targetYear: Date
  user: UserProps
  userSettings: UserSettingsProps
}

const App: React.FC<Props> = ({
  user,
  targetYear,
  status,
  tasks,
  serverSettings,
  userSettings
}): JSX.Element => {
  const router: NextRouter = useRouter()
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
      <Modal />
      <Layout main userSettings={userSettings}>
        <NavigationBar
          user={user}
          userSettings={userSettings}
          colorPalette={serverSettings?.bgColor}
        />
        <MainComponent>
          <Calendar
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
              <CreateTaskBoard
                currentUser={currentUser}
                userTasks={userTasks}
                setUserTasks={setUserTasks}
                target={target}
                setTarget={setTarget}
                colorPalette={serverSettings.taskColor}
              />
            </Board>
          }
          {user?.id && user?.username &&
            <Board title={'Task Board'}>
              <TaskBoard
                userTasks={userTasks}
                target={target}
              />
            </Board>
          }
          {user?.id && user?.username &&
            <Board title={'Modify Board'}>
              <ModifyBoard
                targetedTask={targetedTask}
                colorPalette={serverSettings.taskColor}
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
        <UtilsBoard>
          <Board
            title={'Chat Room'}
          >
            {status === true &&
              <ChatBoard />
            }
          </Board>
        </UtilsBoard>
      </Layout>
    </>
  );
};


export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  try {
    const targetYear = new Date((query!['year'] + '-01') as string)
    const serverSettings = await getServerSettings()

    if (!req.cookies['calendar-user-token'])
      return {
        props: {
          serverSettings,
          userSettings: {},
          user: initializeUser,
          targetYear: targetYear.toString(),
          status: false,
          tasks: {}
        }
      }

    const { startYear, endYear } = getStartYearEndYear(targetYear)
    const { user } = await getUserInfo(req)
    const userSettings = await getUserSettings(user?.id, req)
    const tasks = await getSortedDateTask(user, startOfWeek(startYear), endYear, req)

    return {
      props: {
        serverSettings,
        userSettings,
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
        serverSettings: {},
        userSettings: {},
        user: initializeUser,
        targetYear: '',
        status: false,
        tasks: {}
      }
    }
  }
}

export default App;
