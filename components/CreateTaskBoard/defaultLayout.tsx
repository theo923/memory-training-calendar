import React, { ChangeEvent, useEffect, useState } from 'react'
import { TaskColorProps, TaskProps, UserProps, UserTasksProps } from 'lib/interface'
import {
  controlTaskDescription,
  controlTaskTitle,
} from 'lib/controller/controlTask'
import { initializeUserTask, initializeTask } from 'lib/initialize'
import { getFullDate } from 'lib/get/getDate'
import styled from 'styled-components'
import Box from 'styled/Box'
import Button from 'styled/Button'
import Flex from 'styled/Flex'
import Input from 'styled/Input'
import Text from 'styled/Text'
import default_schedule from 'lib/utils/default_schedule'
import axios from 'axios'
import { refreshData } from 'lib/utils/refresh_data'
import ColorPanel from 'components/ServerSettings/ColorPalette'
import SlateTextBox from 'styled/SlateTextBox/'

const InputText = styled(Box)`
  align-self: center;
`

interface Props {
  userTasks: UserTasksProps,
  setUserTasks: React.Dispatch<React.SetStateAction<UserTasksProps>>,
  target: Date,
  currentUser: UserProps,
  colorPalette: TaskColorProps,
}

const CreateTaskBoardDefaultLayout: React.FC<Props> = ({
  userTasks,
  setUserTasks,
  target,
  currentUser,
  colorPalette,
}): JSX.Element => {
  const [inputVal, setInputVal] = useState<TaskProps>(initializeTask)
  const [loading, setLoading] = useState<boolean | undefined>()
  const [status, setStatus] = useState<string>('')

  useEffect(() => {
    if (!userTasks![getFullDate(target)])
      initializeUserTask(setUserTasks, target)
  }, [target])

  const handleSubmit = async () => {
    setLoading(true)
    setStatus('Loading...')
    try {
      await axios.post('/api/createTask', {
        userID: currentUser.id,
        userName: currentUser.username,
        taskTitle: inputVal.taskTitle,
        taskDescription: inputVal.taskDescription,
        targetedDate: default_schedule(target),
        taskColor: inputVal.taskColor
      }).then(({ data: { success } }) => {
        if (success) {
          refreshData()
          setStatus('Done')
        }
        else
          setStatus('Failed to add task, please try again...')
      })
      setLoading(false)
    }
    catch (err) {
      console.log('Failed to add task...')
      setStatus('Failed to add task, please try again...')
    }
  }

  return (
    <>
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
      <SlateTextBox callChangeFunction={controlTaskDescription} insideObject changeHook={setInputVal} />
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
        <Button disabled={loading} onClick={() => handleSubmit()}>Submit</Button>
        <Button disabled={loading} onClick={() => setInputVal(initializeTask)}>Reset</Button>
      </Flex>
      {status.length > 0 && <Text color='red'>{status}</Text>}
    </>
  )
}

export default CreateTaskBoardDefaultLayout
