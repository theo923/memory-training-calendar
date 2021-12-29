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
import { client, DEFAULT_HEADERS } from "lib/apollo";
import { initializeUser } from "lib/initialize";
import { USER_INFO_QUERY } from "lib/queries/user-info";
import { UserProps } from "lib/interface";

interface Props {
  router: NextRouter
  user: UserProps
  status: boolean
}

const dashboard: React.FC<Props> = ({ router, user, status }): JSX.Element => {

  return (
    <>
      <Head>
        <title>Dashboard | Memory Training Calendar</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <NavigationBar router={router} />
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

    if (!req.cookies['calendar-user-token'])
      return {
        props: {
          user: initializeUser,
          status: false
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

    return {
      props: {
        user,
        status: true
      }
    }

  } catch (err) {
    return {
      props: {
        user: initializeUser,
        status: false
      }
    }
  }
}

export default dashboard;
