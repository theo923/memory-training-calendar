import Head from "next/head";
import React, { useEffect } from "react";
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
import { getQuizBooks } from "lib/get/getQuizBooks";
import Modal from "components/Modal";
import { calculatePageArray } from "lib/utils/calculate_page_arr";
import { QUIZBOOK_RANKING_FETCH_COUNT } from "lib/data/fetch_numbers";
import { QUIZBOOK_URL_PAGE } from "lib/data/pageUrl";
import { refreshData } from "lib/utils/refresh_data";
import { split_array } from "lib/utils/split_array";

interface Props {
  serverSettings: ServerSettingsProps
  user: UserProps
  userSettings: UserSettingsProps
  quizBooks: QuizBookProps[]
  allQuizBooks: QuizBookProps[]
  status: boolean
  pageArray: number[]
}

const quizBook: React.FC<Props> = ({
  serverSettings,
  user,
  userSettings,
  quizBooks,
  allQuizBooks,
  status,
  pageArray
}): JSX.Element => {

  useEffect(() => {
    if (allQuizBooks.length > 0 && quizBooks.length == 0)
      refreshData(QUIZBOOK_URL_PAGE(
        split_array(allQuizBooks, QUIZBOOK_RANKING_FETCH_COUNT)[1] as number
      ), 'push')
  }, [allQuizBooks])

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
            pageArray={pageArray}
            quizBooks={quizBooks}
            allQuizBooks={allQuizBooks}
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

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  try {
    const serverSettings = await getServerSettings()
    const itemsForPages = QUIZBOOK_RANKING_FETCH_COUNT;

    if (!req.cookies['calendar-user-token'])
      return {
        props: {
          serverSettings,
          user: initializeUser,
          quizBooks: [],
          allQuizBooks: [],
          userSettings: {},
          status: false,
          pageArray: [1]
        }
      }

    const { user } = await getUserInfo(req)
    const { quizBooks, allQuizBooks } = await getQuizBooks(
      user,
      (parseInt(query?.page as string) - 1) * itemsForPages || 0,
      req
    )
    const userSettings = await getUserSettings(user?.id, req)

    const pageArray = calculatePageArray(
      parseInt(query.page as string),
      Math.ceil(allQuizBooks.length / itemsForPages)
    );

    return {
      props: {
        serverSettings,
        user,
        quizBooks,
        allQuizBooks,
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
        allQuizBooks: [],
        userSettings: {},
        status: false,
        pageArray: [1]
      }
    }
  }
}

export default quizBook;
