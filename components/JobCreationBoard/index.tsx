import React, { ChangeEvent, useEffect, useState } from 'react'
import { TaskProps, UserProps, UserTasksProps } from 'lib/interface'
import { controlTaskTitle, controlTaskDescription, addTask } from 'lib/controller/controlTask'
import { initializeUserTask, initializeTask } from 'lib/initialize'
import { getFullDate } from 'lib/get/getDate'
import styled from 'styled-components'
import Box from 'styled/Box'
import Button from 'styled/Button'
import Flex from 'styled/Flex'
import Grid from 'styled/Grid'
import Input from 'styled/Input'
import TextArea from 'styled/TextArea'
import default_schedule from 'lib/utils/default_schedule'
import axios from 'axios'

const InputText = styled(Box)`
  align-self: center;
`

interface Props {
  userTasks: UserTasksProps,
  setUserTasks: React.Dispatch<React.SetStateAction<UserTasksProps>>,
  target: Date,
  currentUser: UserProps
}

const JobCreationBoard: React.FC<Props> = ({
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

  const handleSubmit = () => {
    try {
      addTask(setUserTasks, target, inputVal)
      axios.post('/api/createTask', {
        userID: currentUser.id,
        userName: currentUser.username,
        taskTitle: inputVal.taskTitle,
        taskDescription: inputVal.taskDescription,
        targetedDate: default_schedule(target)
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
