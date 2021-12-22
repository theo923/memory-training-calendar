import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import React, { useState } from "react";
import Layout from "../components/Layout";
import Calendar from "../components/Calendar";
import JobBoard from "../components/JobBoard";
import TaskBoard from "../components/Tasks";
import Board, { UserTaskProps } from "../components/Board";
import JobCreationBoard, { initialCard } from "../components/JobCreationBoard";
import ModifyBoard from "../components/ModifyBoard";
import axios from "axios";
import { DEFAULT_KEY, NEXT_PUBLIC_API_URL, RETREIVE_STRING } from "../lib/env";

const App = ({ tasks = {} }): JSX.Element => {
  const [target, setTarget] = useState(new Date());
  const [userTasks, setUserTasks] = useState(tasks || {})
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

export const getServerSideProps: GetServerSideProps = async () => {
  const config = {
    headers: {
      "Authorization": `Bearer ${DEFAULT_KEY}`
    }
  }

  const tasksData = await axios.get(`${NEXT_PUBLIC_API_URL}/${RETREIVE_STRING}`, config)
  const tasks = tasksData.data

  const returnVal = {}
  tasks.forEach((task) => {
    if (task?.attributes && returnVal[task?.attributes!["targetedDate"]])
      returnVal[task?.attributes!["targetedDate"]].push(task?.attributes)
    else returnVal[task?.attributes!["targetedDate"]] = [task?.attributes]
  })

  return {
    props: {
      tasks: returnVal
    }
  }
}

export default App;
