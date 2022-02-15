import Head from "next/head";
import React from "react";
import Layout from "components/Layout";
import NavigationBar from "components/NavigationBar";
import MainComponent from "components/MainComponent";
// import QuizBooks from "components/QuizBooks";
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
// import { calculatePageArray } from "lib/utils/calculate_page_arr";
import Quiz from "components/Quiz";

interface Props {
  serverSettings: ServerSettingsProps
  user: UserProps
  userSettings: UserSettingsProps
  quizBook: QuizBookProps
  status: boolean
}

const quizBook: React.FC<Props> = ({
  serverSettings,
  user,
  userSettings,
  quizBook,
  status,
}): JSX.Element => {
  return (
    <>
      <Head>
        <title>QuizBook | Memory Training Calendar</title>
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
          <Quiz quizBook={quizBook} />
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

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  try {
    const serverSettings = await getServerSettings()

    if (!req.cookies['calendar-user-token'])
      return {
        props: {
          serverSettings,
          user: initializeUser,
          quizBooks: {},
          userSettings: {},
          status: false
        }
      }

    const { user } = await getUserInfo(req)
    const { quizBook } = await getQuizBook(user, req, query.targetedQuizBook as string)
    console.log(quizBook[0])
    const userSettings = await getUserSettings(user?.id, req)

    if (quizBook.length > 0)
      return {
        props: {
          serverSettings,
          user,
          quizBook: quizBook[0],
          userSettings,
          status: true
        }
      }

    return {
      props: {
        serverSettings: {},
        user: initializeUser,
        quizBooks: {},
        userSettings: {},
        status: false
      }
    }
  } catch (err) {
    return {
      props: {
        serverSettings: {},
        user: initializeUser,
        quizBooks: {},
        userSettings: {},
        status: false
      }
    }
  }
}

export default quizBook;
