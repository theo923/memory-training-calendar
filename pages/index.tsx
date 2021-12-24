import { GetServerSideProps } from "next";
import Head from "next/head";
import React, { useState } from "react";
import Layout from "../components/Layout";
import Calendar from "../components/Calendar";
import JobBoard from "../components/JobBoard";
import TaskBoard from "../components/Tasks";
import Board from "../components/Board";
import JobCreationBoard, { initialCard } from "../components/JobCreationBoard";
import ModifyBoard from "../components/ModifyBoard";
import { client, DEFAULT_HEADERS } from "../lib/apollo";
// import { useCookies } from "react-cookie";
import { CALENDAR_QUERY } from "../lib/queries/graphql-calendar";
import { TaskProps, UserTasksProps } from "lib/interface";

const App = ({ tasks = {} }): JSX.Element => {
  const [target, setTarget] = useState<any>(new Date());
  const [userTasks, setUserTasks] = useState<UserTasksProps>(tasks || {})
  const [targetedTask, setTargetedTask] = useState<TaskProps>(initialCard)
  // const [cookies, setCookie, removeCookie] = useCookies(['calendar-user-token']);
  // setCookie('calendar-user-token', '', {
  //   path: "/",
  //   maxAge: 3600,
  //   sameSite: true,
  // })

  // console.log(tasks)
  // console.log(userTasks)


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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    if (!req.cookies['calendar-user-token'])
      return {
        props: {
          tasks: {}
        }
      }

    const { data: { tasks: { data } } } =
      await client.query({
        query: CALENDAR_QUERY,
        context: DEFAULT_HEADERS(req.cookies['calendar-user-token'])
      })

    const tasks = data.filter((each: any) => each?.attributes!['targetedDate'].length > 0)

    const returnVal: any = {}
    tasks.forEach((task: any) => {
      task.attributes.targetedDate.forEach((date: any) => {
        const { t_date } = date
        const returnObject = { id: parseInt(task.id), ...task?.attributes }
        if (returnVal![t_date])
          returnVal[t_date].push(returnObject)
        else returnVal[t_date] = [returnObject]
      })
    })

    return {
      props: {
        tasks: returnVal
      }
    }
  } catch (err) {
    console.log(err)
    return {
      props: {
        tasks: {}
      }
    }
  }
}

export default App;
