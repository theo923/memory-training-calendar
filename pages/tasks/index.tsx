import Head from "next/head";
import React from "react";
import Layout from "components/Layout";
import NavigationBar from "components/NavigationBar";
import MainComponent from "components/MainComponent";
import Tasks from "components/Tasks";
import Board from "components/Board";
import JobBoard from "components/JobBoard";
import { GetServerSideProps } from "next";
import { initializeUser } from "lib/initialize";
import { ServerSettingsProps, UserProps, UserSettingsProps } from "lib/interface";
import { getUserInfo } from "lib/get/getUserInfo";
import { getUserSettings } from "lib/get/getUserSettings";
import { getServerSettings } from "lib/get/getServerSettings";
import { getStartMonthEndMonth } from "lib/get/getDate";
import { getSortedDateTask } from "lib/get/getSortedDateTask";

interface Props {
  serverSettings: ServerSettingsProps
  user: UserProps
  userSettings: UserSettingsProps
  unsorted: any
  status: boolean
}

const tasks: React.FC<Props> = ({
  serverSettings,
  user,
  userSettings,
  unsorted,
  status
}): JSX.Element => {
  console.log(unsorted)
  return (
    <>
      <Head>
        <title>Tasks | Memory Training Calendar</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout main userSettings={userSettings}>
        <NavigationBar
          user={user}
          userSettings={userSettings}
          colorPalette={serverSettings?.bgColor}
        />
        <MainComponent>
          <Tasks
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

export default tasks;
