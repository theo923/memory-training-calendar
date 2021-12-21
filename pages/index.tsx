import { NextPage } from "next";
import Head from "next/head";
import React, { useState } from "react";
import Layout from "../components/Layout";
import Calendar from "../components/Calendar";
import JobBoard from "../components/JobBoard";
import TaskBoard from "../components/Tasks";
import Board, { UserTaskProps } from "../components/Board";
import JobCreationBoard, { initialCard } from "../components/JobCreationBoard";
import ModifyBoard from "../components/ModifyBoard";

const App: NextPage = (): JSX.Element => {
  const [target, setTarget] = useState(new Date());
  const [userTasks, setUserTasks] = useState({})
  const [targetedTask, setTargetedTask] = useState<UserTaskProps>(initialCard)

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
          targetedTask={targetedTask}
          setTargetedTask={setTargetedTask}
        />
        <JobBoard>
          <Board title={'Create Task Board'}>
            <JobCreationBoard
              userTasks={userTasks}
              setUserTasks={setUserTasks}
              target={target}
            />
          </Board>
          <Board title={'Task Board'}>
            <TaskBoard
              userTasks={userTasks}
              target={target}
            />
          </Board>
          <Board title={'Modify Board'}>
            <ModifyBoard
              targetedTask={targetedTask}
              setTargetedTask={setTargetedTask}
              target={target}
            />
          </Board>
        </JobBoard>
      </Layout>
    </>
  );
};

export default App;
