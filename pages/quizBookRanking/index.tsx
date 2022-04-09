import Head from "next/head";
import React from "react";
import Layout from "components/Layout";
import NavigationBar from "components/NavigationBar";
import MainComponent from "components/MainComponent";
import Board from "components/Board";
import JobBoard from "components/JobBoard";
import { GetServerSideProps } from "next";
import { initializeUser } from "lib/initialize";
import { PublicQuizBookProps, ServerSettingsProps, UserProps, UserSettingsProps } from "lib/interface";
import { getUserInfo } from "lib/get/getUserInfo";
import { getUserSettings } from "lib/get/getUserSettings";
import { getServerSettings } from "lib/get/getServerSettings";
import Modal from "components/Modal";
import { QUIZBOOK_RANKING_TOP_FETCH_COUNT } from "lib/data/fetch_numbers";
import { getPublicQuizBooks } from "lib/get/getPublicQuizBooks";
import QuizBooks from "components/QuizBooksRanking";

interface Props {
  serverSettings: ServerSettingsProps
  user: UserProps
  userSettings: UserSettingsProps
  publicQuizBooks: PublicQuizBookProps[]
  status: boolean
}

const quizBook: React.FC<Props> = ({
  serverSettings,
  user,
  userSettings,
  publicQuizBooks,
  status
}): JSX.Element => {
  return (
    <>
      <Head>
        <title>QuizBook Ranking | Memory Training Calendar</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Modal />
      <Layout main
        user={user}
        serverSettings={serverSettings}
        userSettings={userSettings}
      >
        <NavigationBar />
        <MainComponent>
          <QuizBooks
            quizBooks={publicQuizBooks}
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
    const itemsForPages = QUIZBOOK_RANKING_TOP_FETCH_COUNT;

    if (!req.cookies['calendar-user-token'])
      return {
        props: {
          serverSettings,
          user: initializeUser,
          publicQuizBooks: [],
          userSettings: {},
          status: false,
          pageArray: [1]
        }
      }

    const { user } = await getUserInfo(req)
    const { metadata, publicQuizBooks } = await getPublicQuizBooks(0, itemsForPages)
    console.log(metadata)

    const userSettings = await getUserSettings(user?.id, req)

    return {
      props: {
        serverSettings,
        user,
        publicQuizBooks,
        userSettings,
        status: true
      }
    }

  } catch (err) {
    return {
      props: {
        serverSettings: {},
        user: initializeUser,
        publicQuizBooks: [],
        userSettings: {},
        status: false
      }
    }
  }
}

export default quizBook;
