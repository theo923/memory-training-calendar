import React, { ChangeEvent, useEffect, useState } from 'react'
import { TaskColorProps, TaskProps } from 'lib/interface'
import { controlTaskDescription, controlTaskTitle } from 'lib/controller/controlTask'
import styled from 'styled-components'
import Box from 'styled/Box'
import Button from 'styled/Button'
import Flex from 'styled/Flex'
import Input from 'styled/Input'
import axios from 'axios'
import { NextRouter } from 'next/router'
import { refreshData } from 'lib/utils/refresh_data'
import ColorPanel from 'components/ServerSettings/ColorPalette'
import SlateTextBox from 'styled/SlateTextBox'

const InputText = styled(Box)`
  align-self: center;
`

interface Props {
  router: NextRouter
  targetedTask: TaskProps,
  target: Date,
  colorPalette: TaskColorProps,
}

const JobCreationBoard: React.FC<Props> = ({
  router,
  targetedTask,
  colorPalette,
}): JSX.Element => {
  const [inputVal, setInputVal] = useState<TaskProps>(targetedTask)

  useEffect(() => {
    setInputVal(targetedTask)
  }, [targetedTask])

  const handleSubmit = async () => {
    if (
      targetedTask?.taskTitle !== inputVal?.taskTitle ||
      targetedTask?.taskDescription !== inputVal?.taskDescription ||
      targetedTask?.taskColor !== inputVal?.taskColor
    ) {
      await axios.post('/api/modifyTaskInfo', {
        id: targetedTask.id,
        userID: targetedTask.userID,
        userName: targetedTask.userName,
        targetedDate: targetedTask.targetedDate,
        taskTitle: inputVal.taskTitle,
        taskDescription: inputVal.taskDescription,
        taskColor: inputVal.taskColor
      }).then(({ data: { success } }) => {
        if (success)
          refreshData(router)
      })
    }
  }

  return (
    <Box data-test="component-modifyBoard">
      {targetedTask?.id ?
        <
          >
          <InputText
            fontSize={['20px', null, '20px']}
            lineHeight={['20px', null, '28px']}
            mr='2'
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
            mr='2'
          >
            Description:
          </InputText>
          <SlateTextBox
            values={JSON.parse(inputVal.taskDescription)}
            onChange={controlTaskDescription}
            changeObject={setInputVal}
          />
          <InputText
            fontSize={['20px', null, '20px']}
            lineHeight={['20px', null, '28px']}
            mr='2'
          >
            Static Colors:
          </InputText>
          <ColorPanel
            currentValue={inputVal?.taskColor}
            setInputVal={setInputVal}
            colors={colorPalette?.color_static}
            inputProperties='taskColor'
          />
          <InputText
            fontSize={['20px', null, '20px']}
            lineHeight={['20px', null, '28px']}
            mr='2'
          >
            Gradient Colors:
          </InputText>
          <ColorPanel
            currentValue={inputVal?.taskColor}
            setInputVal={setInputVal}
            colors={colorPalette?.color_gradient}
            inputProperties='taskColor'
          />
          <Box />
          <Flex justifyContent='space-around'>
            <Button onClick={() => handleSubmit()}>Submit</Button>
            <Button onClick={() => setInputVal(targetedTask)}>Reset</Button>
          </Flex>
        </>
        :
        <Box>
          No Tasks is founded. You must select one first.
        </Box>
      }
    </Box>
  )
}

export default JobCreationBoard
