import React, { ChangeEvent, useEffect, useState } from 'react'
import { TaskProps, UserTasksProps } from 'lib/interface'
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

const InputText = styled(Box)`
  align-self: center;
`

interface Props {
  userTasks: UserTasksProps,
  setUserTasks: React.Dispatch<React.SetStateAction<UserTasksProps>>,
  target: Date,
  // setTarget: React.Dispatch<React.SetStateAction<Date>>
}

const JobCreationBoard: React.FC<Props> = ({
  userTasks,
  setUserTasks,
  target,
  // setTarget
}): JSX.Element => {
  const [inputVal, setInputVal] = useState<TaskProps>(initializeTask)

  useEffect(() => {
    if (!userTasks![getFullDate(target)])
      initializeUserTask(setUserTasks, target)
  }, [target])

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
          <Button onClick={() => addTask(setUserTasks, target, inputVal)}>Submit</Button>
          <Button onClick={() => setInputVal(initializeTask)}>Reset</Button>
        </Flex>
      </Grid>
    </Box>
  )
}

export default JobCreationBoard
