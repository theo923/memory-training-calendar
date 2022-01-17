import Head from "next/head";
import React from "react";
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

interface Props {
  serverSettings: ServerSettingsProps
  user: UserProps
  userSettings: UserSettingsProps
  todoList: TodoProps[]
  status: boolean
}

const todoList: React.FC<Props> = ({
  serverSettings,
  user,
  userSettings,
  todoList,
  status
}): JSX.Element => {
  return (
    <>
      <Head>
        <title>TodoList | Memory Training Calendar</title>
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
          <TodoList
            user={user}
            todoList={todoList}
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
          todoList: [],
          userSettings: {},
          status: false
        }
      }

    const { user } = await getUserInfo(req)
    const { todoList } = await getTodoList(user, req)
    const userSettings = await getUserSettings(user?.id, req)

    return {
      props: {
        serverSettings,
        user,
        todoList,
        userSettings,
        status: true
      }
    }

  } catch (err) {
    return {
      props: {
        serverSettings: {},
        user: initializeUser,
        todoList: [],
        userSettings: {},
        status: false
      }
    }
  }
}

export default todoList;
