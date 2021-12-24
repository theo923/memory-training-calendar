import React, { ChangeEvent, useEffect, useState } from 'react'
import { TaskProps } from 'lib/interface'
import { controlTaskTitle, controlTaskDescription } from 'lib/controller/controlTask'
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
  targetedTask: TaskProps,
  setTargetedTask: React.Dispatch<React.SetStateAction<TaskProps>>,
  target: Date,
  // setTarget: React.Dispatch<React.SetStateAction<Date>>
}

export const initialCard = {
  taskTitle: '',
  taskDescription: ''
}

const JobCreationBoard: React.FC<Props> = ({
  targetedTask,
  // setTarget
}): JSX.Element => {
  const [inputVal, setInputVal] = useState<TaskProps>(targetedTask)

  useEffect(() => {
    setInputVal(targetedTask)
  }, [targetedTask])

  return (
    <Box data-test="component-modifyBoard">
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
          value={inputVal?.taskTitle}
          onChange={(e: ChangeEvent<HTMLInputElement>) => controlTaskTitle(setInputVal, e)}
        />
        <InputText
          fontSize={['20px', null, '20px']}
          lineHeight={['20px', null, '28px']}
        >
          Description:
        </InputText>
        <TextArea
          value={inputVal?.taskDescription}
          onChange={(e: ChangeEvent<HTMLInputElement>) => controlTaskDescription(setInputVal, e)}
        />
        <Box />
        <Flex justifyContent='space-around'>
          {/* <Button onClick={() => addTask(setUserTasks, target, inputVal)}>Submit</Button> */}
          <Button onClick={() => setInputVal(initialCard)}>Reset</Button>
        </Flex>
      </Grid>
    </Box>
  )
}

export default JobCreationBoard
