import Head from "next/head";
import React, { useEffect } from "react";
import Layout from "components/Layout";
import NavigationBar from "components/NavigationBar";
import MainComponent from "components/MainComponent";
import TodoList from "components/TodoListSection/TodoList";
import Board from "components/Board";
import JobBoard from "components/JobBoard";
import { GetServerSideProps } from "next";
import { initializeUser } from "lib/initialize";
import { ServerSettingsProps, TodoProps, UserProps, UserSettingsProps } from "lib/interface";
import { getUserInfo } from "lib/get/getUserInfo";
import { getUserSettings } from "lib/get/getUserSettings";
import { getServerSettings } from "lib/get/getServerSettings";
import { getTodoList } from "lib/get/getTodoList";
import Modal from "components/Modal";
import { TODO_FETCH_COUNT } from "lib/data/fetch_numbers";
import { calculatePageArray } from "lib/utils/calculate_page_arr";
import { refreshData } from "lib/utils/refresh_data";
import { TODOLIST_URL_PAGE } from "lib/data/pageUrl";
import { split_array } from "lib/utils/split_array";

interface Props {
  serverSettings: ServerSettingsProps
  user: UserProps
  userSettings: UserSettingsProps
  todoList: TodoProps[]
  allTodoList: TodoProps[]
  status: boolean
  pageArray: number[]
}

const todoList: React.FC<Props> = ({
  serverSettings,
  user,
  userSettings,
  todoList,
  allTodoList,
  status,
  pageArray
}): JSX.Element => {

  useEffect(() => {
    if (allTodoList.length > 0 && todoList.length == 0)
      refreshData(TODOLIST_URL_PAGE(
        split_array(allTodoList, TODO_FETCH_COUNT)[1] as number
      ), 'push')
  }, [allTodoList])

  return (
    <>
      <Head>
        <title>TodoList | Memory Training Calendar</title>
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
          <TodoList
            todoList={todoList}
            allTodoList={allTodoList}
            pageArray={pageArray}
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

export const getServerSideProps: GetServerSideProps = async ({ query, req }) => {
  try {
    const serverSettings = await getServerSettings()
    const itemsForPages = TODO_FETCH_COUNT;

    if (!req.cookies['calendar-user-token'])
      return {
        props: {
          serverSettings,
          user: initializeUser,
          todoList: [],
          userSettings: {},
          status: false,
          pageArray: [1]
        }
      }

    const { user } = await getUserInfo(req)
    const { todoList, allTodoList } = await getTodoList(
      user,
      (parseInt(query?.page as string) - 1) * itemsForPages || 0,
      req
    )
    const userSettings = await getUserSettings(user?.id, req)

    const pageArray = calculatePageArray(
      parseInt(query.page as string),
      Math.ceil(allTodoList.length / itemsForPages)
    );

    return {
      props: {
        serverSettings,
        user,
        todoList,
        allTodoList,
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
        todoList: [],
        allTodoList: [],
        userSettings: {},
        status: false,
        pageArray: [1]
      }
    }
  }
}

export default todoList;
