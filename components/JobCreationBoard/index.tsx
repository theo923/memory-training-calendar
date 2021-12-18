import React, { useEffect, useState } from 'react'
import Box from '../../styled/Box'
import Input from '../../styled/Input'
import Grid from '../../styled/Grid'
import Flex from '../../styled/Flex'
import styled from "styled-components";
import { getFullDate } from '../../lib/get/getFullDate';
import TextArea from '../../styled/TextArea'
import Button from '../../styled/Button'
import { controlTaskTitle, controlTaskDescription, initailizeTask, addTask } from '../../lib/controller/controlTask'

const InputText = styled(Box)`
  align-self: center;
`

interface Props {
  userTasks: any,
  setUserTasks: React.Dispatch<React.SetStateAction<{}>>,
  target: Date,
  // setTarget: React.Dispatch<React.SetStateAction<Date>>
}

const initialCard = {
  taskTitle: '',
  taskDescription: ''
}

const JobCreationBoard: React.FC<Props> = ({
  userTasks,
  setUserTasks,
  target,
  // setTarget
}): JSX.Element => {
  const [inputVal, setInputVal] = useState(initialCard)

  useEffect(() => {
    if (!userTasks![getFullDate(target)])
      initailizeTask(setUserTasks, target)
  }, [target])

  return (
    <Box>
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
          onChange={e => controlTaskTitle(setInputVal, e)}
        />
        <InputText
          fontSize={['20px', null, '20px']}
          lineHeight={['20px', null, '28px']}
        >
          Description:
        </InputText>
        <TextArea
          value={inputVal.taskDescription}
          onChange={e => controlTaskDescription(setInputVal, e)}
        />
        <Box />
        <Flex justifyContent='space-around'>
          <Button onClick={() => addTask(setUserTasks, target, inputVal)}>Submit</Button>
          <Button onClick={() => setInputVal(initialCard)}>Reset</Button>
        </Flex>
      </Grid>
    </Box>
  )
}

export default JobCreationBoard
