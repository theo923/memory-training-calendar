import Head from "next/head";
import React from "react";
import Layout from "components/Layout";
import NavigationBar from "components/NavigationBar";
import MainComponent from "components/MainComponent";
import Dashboard from "components/DashboardSection/Dashboard";
import Board from "components/Board";
import JobBoard from "components/JobBoard";
import { GetServerSideProps } from "next";
import { initializeUser } from "lib/initialize";
import { ServerSettingsProps, UserProps, UserSettingsProps, UserTasksProps } from "lib/interface";
import { getUserInfo } from "lib/get/getUserInfo";
import { getUserSettings } from "lib/get/getUserSettings";
import { getServerSettings } from "lib/get/getServerSettings";
import { getStartMonthEndMonth } from "lib/get/getDate";
import { getSortedDateTask } from "lib/get/getSortedDateTask";

interface Props {
  serverSettings: ServerSettingsProps
  user: UserProps
  userSettings: UserSettingsProps
  tasks: UserTasksProps
  unsorted: any
  status: boolean
}

const dashboard: React.FC<Props> = ({
  serverSettings,
  user,
  userSettings,
  tasks,
  unsorted,
  status
}): JSX.Element => {
  return (
    <>
      <Head>
        <title>Dashboard | Memory Training Calendar</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout main userSettings={userSettings}>
        <NavigationBar
          user={user}
          userSettings={userSettings}
          colorPalette={serverSettings?.bgColor}
        />
        <MainComponent>
          <Dashboard
            user={user}
            tasks={tasks}
            unsorted={unsorted}
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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    const serverSettings = await getServerSettings()

    if (!req.cookies['calendar-user-token'])
      return {
        props: {
          serverSettings,
          user: initializeUser,
          tasks: {},
          unsorted: {},
          userSettings: {},
          status: false
        }
      }

    const { user } = await getUserInfo(req)
    const { startMonth, endMonth } = getStartMonthEndMonth(new Date())
    const { sortedDateTask, unsortedDateTask } = await getSortedDateTask(user, startMonth, endMonth, req, false)
    const userSettings = await getUserSettings(user?.id, req)

    return {
      props: {
        serverSettings,
        user,
        tasks: sortedDateTask,
        unsorted: unsortedDateTask,
        userSettings,
        status: true
      }
    }

  } catch (err) {
    return {
      props: {
        serverSettings: {},
        user: initializeUser,
        tasks: {},
        unsorted: {},
        userSettings: {},
        status: false
      }
    }
  }
}

export default dashboard;
