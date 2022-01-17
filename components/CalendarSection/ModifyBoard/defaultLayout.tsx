import React, { ChangeEvent, useEffect, useState } from 'react'
import { TaskColorProps, TaskProps, UserProps } from 'lib/interface'
import { controlTaskDescription, controlTaskTitle } from 'lib/controller/controlTask'
import styled from 'styled-components'
import Box from 'styled/Box'
import Button from 'styled/Button'
import Flex from 'styled/Flex'
import Input from 'styled/Input'
import Text from 'styled/Text'
import axios from 'axios'
import { refreshData } from 'lib/utils/refresh_data'
import ColorPanel from 'components/ServerSettings/ColorPalette'
import SlateTextBox from 'styled/SlateTextBox'
import {getUserIP} from 'lib/get/getIP'

const InputText = styled(Box)`
  align-self: center;
`

interface Props {
  currentUser: UserProps,
  targetedTask: TaskProps,
  colorPalette: TaskColorProps,
  reload?: boolean
}

const ModifyBoardDefaultLayout: React.FC<Props> = ({
  currentUser,
  targetedTask,
  colorPalette,
  reload = false
}): JSX.Element => {
  const ip = getUserIP()
  const [colorPicker, setColorPicker] = useState<string>('gradient')
  const [loading, setLoading] = useState<boolean | undefined>()
  const [status, setStatus] = useState<string>('')
  const [inputVal, setInputVal] = useState<TaskProps>(targetedTask)

  useEffect(() => {
    setInputVal(targetedTask)
  }, [targetedTask])

  const handleSubmit = async () => {
    setLoading(true)
    setStatus('Loading...')
    if (
      currentUser.id !== targetedTask.userID ||
      currentUser.username !== targetedTask.userName
    ) {
      setLoading(false)
      setStatus('You do not have right to modify it because you are not the author of the task')
    }

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
        taskColor: inputVal.taskColor,
        ip
      }).then(({ data: { success } }) => {
        if (success) {
          if (reload) refreshData('', 'reload')
          refreshData()
          setStatus('Done')
        }
        else
          setStatus('Failed to modify the task, please try again...')
      })
    }
    else
      setStatus('Failed to modify the task, please try again...')
    setLoading(false)
  }

  return (
    <Box data-test="modifyBoard-defaultLayout">
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
        insideObject
        values={inputVal?.taskDescription ? JSON.parse(inputVal.taskDescription) : ''}
        callChangeFunction={controlTaskDescription}
        changeHook={setInputVal}
      />
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
        <Button disabled={loading || targetedTask == inputVal} onClick={() => handleSubmit()}>Submit</Button>
        <Button disabled={loading} onClick={() => setInputVal(targetedTask)}>Reset</Button>
      </Flex>
      <Box>
        {status.length > 0 && <Text color='red'>{status}</Text>}
      </Box>
    </Box>
  )
}

export default ModifyBoardDefaultLayout
