import { NextPage } from "next";
import Head from "next/head";
import React, { useState } from "react";
import Layout from "../components/Layout";
import Calendar from "../components/Calendar";
import JobBoard from "../components/JobBoard";
import Grid from "../styled/Grid";
import Box from "../styled/Box";
import TaskBoard from "../components/TaskBoard";
import Flex from "../styled/Flex";
import CreateTaskBoard from "../components/CreateTaskComponent";

const App: NextPage = (): JSX.Element => {
  const [target, setTarget] = useState(new Date());
  const [userTasks, setUserTasks] = useState({})

  return (
    <>
      <Head>
        <title>Memory Training Calendar</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Calendar
          target={target}
          setTarget={setTarget}
          userTasks={userTasks}
        />
        <JobBoard>
          <CreateTaskBoard
            userTasks={userTasks}
            setUserTasks={setUserTasks}
            target={target}
          />
          <TaskBoard
            userTasks={userTasks}
            target={target}
          />
        </JobBoard>
      </Layout>
    </>
  );
};

export default App;
