import React, { ChangeEvent, forwardRef, useEffect, useState } from 'react'
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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import tw from 'twin.macro'


const InputText = styled(Box)`
  align-self: center;
`

const Border = styled(Box)`
  ${tw`border-2 border-black shadow-md rounded-md  mb-5`}
`

interface Props {
  userTasks: UserTasksProps,
  setUserTasks: React.Dispatch<React.SetStateAction<UserTasksProps>>,
  target: Date,
  setTarget: React.Dispatch<React.SetStateAction<Date>>,
  currentUser: UserProps,
  colorPalette: TaskColorProps,
}

const CreateTaskBoardDefaultLayout: React.FC<Props> = ({
  userTasks,
  setUserTasks,
  target,
  setTarget,
  currentUser,
  colorPalette,
}): JSX.Element => {
  const [colorPicker, setColorPicker] = useState<string>('gradient')
  const [inputVal, setInputVal] = useState<TaskProps>(initializeTask)
  const [loading, setLoading] = useState<boolean | undefined>()
  const [status, setStatus] = useState<string>('')
  const CustomDatePicker = forwardRef(({ value, onClick }: any, ref) => (
    // @ts-ignore
    <Button className="example-custom-input" onClick={onClick} ref={ref}>
      {value}
    </Button>
  ));

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
    <Box data-test="createTaskBoard-defaultLayout">
      <Flex justifyContent='center' mt='10px'>
        <Box width='100%'>
          <InputText
            fontSize={['20px', null, '20px']}
            lineHeight={['20px', null, '28px']}
          >
            Modify Selected Date:
          </InputText>
        </Box>
        <Border>
          <DatePicker
            customInput={<CustomDatePicker />}
            selected={target}
            onChange={(date: Date) => setTarget(date)}
          />
        </Border>
      </Flex>
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
      <Flex>
        <InputText
          fontSize={['20px', null, '20px']}
          lineHeight={['20px', null, '28px']}
          mr='10px'
        >
          Task Color:
        </InputText>
        <Box mr='10px'>
          <Button
            fontSize={['20px', null, '20px']}
            lineHeight={['20px', null, '28px']}
            onClick={() => setColorPicker('gradient')}
          >
            Gradient
          </Button>
        </Box>
        <Button
          fontSize={['20px', null, '20px']}
          lineHeight={['20px', null, '28px']}
          onClick={() => setColorPicker('static')}
        >
          Static
        </Button>
      </Flex>
      {colorPicker === 'static'
        ? <ColorPanel
          currentValue={inputVal?.taskColor}
          setInputVal={setInputVal}
          colors={colorPalette?.color_static}
          inputProperties='taskColor' />
        : colorPicker === 'gradient'
          ? <ColorPanel
            currentValue={inputVal?.taskColor}
            setInputVal={setInputVal}
            colors={colorPalette?.color_gradient}
            inputProperties='taskColor' />
          : null
      }
      <Box />
      <Flex justifyContent='space-around'>
        <Button disabled={loading || inputVal?.taskTitle === ''} onClick={() => handleSubmit()}>Submit</Button>
        <Button disabled={loading} onClick={() => setInputVal(initializeTask)}>Reset</Button>
      </Flex>
      {status.length > 0 && <Text color='red'>{status}</Text>}
    </Box>
  )
}

export default CreateTaskBoardDefaultLayout
