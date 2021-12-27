import React, { ChangeEvent, useEffect, useState } from 'react'
import { TaskProps, UserProps, UserTasksProps } from 'lib/interface'
import { controlTaskTitle, controlTaskDescription } from 'lib/controller/controlTask'
import { initializeUserTask, initializeTask } from 'lib/initialize'
import { getFullDate, getYearMonth } from 'lib/get/getDate'
import styled from 'styled-components'
import Box from 'styled/Box'
import Button from 'styled/Button'
import Flex from 'styled/Flex'
import Grid from 'styled/Grid'
import Input from 'styled/Input'
import TextArea from 'styled/TextArea'
import default_schedule, { addDays } from 'lib/utils/default_schedule'
import axios from 'axios'
import { NextRouter } from 'next/router'

const InputText = styled(Box)`
  align-self: center;
`

interface Props {
  router: NextRouter,
  userTasks: UserTasksProps,
  setUserTasks: React.Dispatch<React.SetStateAction<UserTasksProps>>,
  target: Date,
  currentUser: UserProps
}

const JobCreationBoard: React.FC<Props> = ({
  router,
  userTasks,
  setUserTasks,
  target,
  currentUser
}): JSX.Element => {
  const [inputVal, setInputVal] = useState<TaskProps>(initializeTask)

  useEffect(() => {
    if (!userTasks![getFullDate(target)])
      initializeUserTask(setUserTasks, target)
  }, [target])

  const handleSubmit = async () => {
    try {
      await axios.post('/api/createTask', {
        userID: currentUser.id,
        userName: currentUser.username,
        taskTitle: inputVal.taskTitle,
        taskDescription: inputVal.taskDescription,
        targetedDate: default_schedule(target)
      }).then(({ data: { success } }) => {
        if (success) {
          router.push({
            pathname: `/year/${getYearMonth(addDays(target, 1))}`,
          })
        }
      })
    }
    catch (err) {
      console.log('Failed to add task...')
    }
  }

  return (
    <Box data-test="component-jobCreationBoard">
      <Grid
        gridTemplateColumns={['0.7fr 1.3fr']}
        verticalAlign={['center']}
        m={['10px']}
      >
        <InputText
          fontSize={['20px', null, '20px']}
          lineHeight={['20px', null, '28px']}
        >
          Title:
        </InputText>
        <Input
          value={inputVal.taskTitle}
          onChange={(e: ChangeEvent<HTMLInputElement>) => controlTaskTitle(setInputVal, e)}
        />
        <InputText
          fontSize={['20px', null, '20px']}
          lineHeight={['20px', null, '28px']}
        >
          Description:
        </InputText>
        <TextArea
          value={inputVal.taskDescription}
          onChange={(e: ChangeEvent<HTMLInputElement>) => controlTaskDescription(setInputVal, e)}
        />
        <Box />
        <Flex justifyContent='space-around'>
          <Button onClick={() => handleSubmit()}>Submit</Button>
          <Button onClick={() => setInputVal(initializeTask)}>Reset</Button>
        </Flex>
      </Grid>
    </Box>
  )
}

export default JobCreationBoard
