import React, { ChangeEvent, useContext, useEffect, useState } from 'react'
import { TaskProps } from 'lib/interface'
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
import { ServerSettingsContext } from 'components/ServerSettings'
import { UserContext } from 'components/User'

const InputText = styled(Text)`
  align-self: center;
`

interface Props {
  targetedTask: TaskProps,
  reload?: boolean
  extend?: boolean
}

const ModifyBoardDefaultLayout: React.FC<Props> = ({
  targetedTask,
  reload = false,
  extend
}): JSX.Element => {
  const [colorPicker, setColorPicker] = useState<string>('gradient')
  const [loading, setLoading] = useState<boolean | undefined>()
  const [status, setStatus] = useState<string>('')
  const [inputVal, setInputVal] = useState<TaskProps>(targetedTask)
  const serverSettingsInfo = useContext(ServerSettingsContext)
  const userInfo = useContext(UserContext)

  useEffect(() => {
    setInputVal(targetedTask)
  }, [targetedTask])

  const handleSubmit = async () => {
    setLoading(true)
    setStatus('Loading...')
    if (
      userInfo?.user?.id !== targetedTask.userID ||
      userInfo?.user?.username !== targetedTask.userName
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
        ip: userInfo?.user?.ip
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
        extend={extend ? true : false}
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
        extend={extend ? true : false}
        fontSize={['20px', null, '20px']}
        lineHeight={['20px', null, '28px']}
        mr='2'
      >
        Description:
      </InputText>
      <SlateTextBox
        insideObject
        color={extend ? '#000' : '#fff'}
        values={inputVal?.taskDescription ? JSON.parse(inputVal.taskDescription) : ''}
        callChangeFunction={controlTaskDescription}
        changeHook={setInputVal}
      />
      <Flex>
        <InputText
          extend={extend ? true : false}
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
          colors={serverSettingsInfo?.colorPalette?.color_static}
          inputProperties='taskColor' />
        : colorPicker === 'gradient'
          ? <ColorPanel
            currentValue={inputVal?.taskColor}
            setInputVal={setInputVal}
            colors={serverSettingsInfo?.colorPalette?.color_gradient}
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
