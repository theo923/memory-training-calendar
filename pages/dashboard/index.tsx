import Head from "next/head";
import React from "react";
import { NextRouter } from "next/router";
import Layout from "components/Layout";
import NavigationBar from "components/NavigationBar";
import MainComponent from "components/MainComponent";
import Dashboard from "components/Dashboard";
import Board from "components/Board";
import JobBoard from "components/JobBoard";
import { GetServerSideProps } from "next";
import { initializeUser } from "lib/initialize";
import { ServerSettingsProps, UserProps, UserSettingsProps } from "lib/interface";
import { getUserInfo } from "lib/get/getUserInfo";
import { getUserSettings } from "lib/get/getUserSettings";
import { getServerSettings } from "lib/get/getServerSettings";

interface Props {
  router: NextRouter
  serverSettings: ServerSettingsProps
  user: UserProps
  userSettings: UserSettingsProps
  status: boolean
}

const dashboard: React.FC<Props> = ({ router, serverSettings, user, userSettings, status }): JSX.Element => {

  return (
    <>
      <Head>
        <title>Dashboard | Memory Training Calendar</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout main userSettings={userSettings}>
        <NavigationBar
          router={router}
          user={user}
          userSettings={userSettings}
          colorPalette={serverSettings?.bgColor}
        />
        <MainComponent>
          <Dashboard user={user} />
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
          userSettings: {},
          status: false
        }
      }

    const { user } = await getUserInfo(req)
    const userSettings = await getUserSettings(user?.id, req)

    return {
      props: {
        serverSettings,
        user,
        userSettings,
        status: true
      }
    }

  } catch (err) {
    return {
      props: {
        serverSettings: {},
        user: initializeUser,
        userSettings: {},
        status: false
      }
    }
  }
}

export default dashboard;
