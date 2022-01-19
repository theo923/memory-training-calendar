import Head from "next/head";
import React from "react";
import Layout from "components/Layout";
import NavigationBar from "components/NavigationBar";
import MainComponent from "components/MainComponent";
import QuizBooks from "components/QuizBooks";
import Board from "components/Board";
import JobBoard from "components/JobBoard";
import { GetServerSideProps } from "next";
import { initializeUser } from "lib/initialize";
import { QuizBookProps, ServerSettingsProps, UserProps, UserSettingsProps } from "lib/interface";
import { getUserInfo } from "lib/get/getUserInfo";
import { getUserSettings } from "lib/get/getUserSettings";
import { getServerSettings } from "lib/get/getServerSettings";
import { getQuizBook } from "lib/get/getQuizBook";
import Modal from "components/Modal";
import { calculatePageArray } from "lib/utils/calculate_page_arr";

interface Props {
  serverSettings: ServerSettingsProps
  user: UserProps
  userSettings: UserSettingsProps
  quizBooks: QuizBookProps[]
  status: boolean
  pageArray: number[]
}

const quizBook: React.FC<Props> = ({
  serverSettings,
  user,
  userSettings,
  quizBooks,
  status,
  pageArray
}): JSX.Element => {
  return (
    <>
      <Head>
        <title>QuizBook | Memory Training Calendar</title>
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
          <QuizBooks
            pageArray={pageArray}
            user={user}
            quizBooks={quizBooks}
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
    const itemsForPages = 3;

    if (!req.cookies['calendar-user-token'])
      return {
        props: {
          serverSettings,
          user: initializeUser,
          quizBooks: [],
          userSettings: {},
          status: false,
          pageArray: [1]
        }
      }

    const { user } = await getUserInfo(req)
    const { quizBooks } = await getQuizBook(user, req)
    const userSettings = await getUserSettings(user?.id, req)

    const pageArray = calculatePageArray(
      parseInt('1'),
      Math.ceil(quizBooks.length / itemsForPages)
    );

    return {
      props: {
        serverSettings,
        user,
        quizBooks,
        userSettings,
        status: true,
        pageArray
      }
    }

  } catch (err) {
    return {
      props: {
        serverSettings: {},
        user: initializeUser,
        quizBooks: [],
        userSettings: {},
        status: false,
        pageArray: [1]
      }
    }
  }
}

export default quizBook;
