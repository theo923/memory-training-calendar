import axios from "axios"
import { ModalContext } from "components/Modal/ModalContext"
import { controlTaskDescription } from "lib/controller/controlTask"
import { getUserIP } from "lib/get/getIP"
import { TodoProps } from "lib/interface"
import { refreshData } from "lib/utils/refresh_data"
import { useContext, useState, useEffect, ChangeEvent } from "react"
import { RiCloseCircleFill } from "react-icons/ri"
import Box from "styled/Box"
import Button from "styled/Button"
import Flex from "styled/Flex"
import Text from "styled/Text"
import Input from "styled/Input"
import SlateTextBox from "styled/SlateTextBox"
import styled from 'styled-components'

const InputText = styled(Box)`
  align-self: center;
`

const CreateQuizBooks = ({
  todo,
  user,
  todoList
}: any) => {
  const modalContext = useContext(ModalContext)

  const ip = getUserIP()
  const [loading, setLoading] = useState<boolean | undefined>()
  const [status, setStatus] = useState<string>('')
  const [inputVal, setInputVal] = useState<TodoProps>(todo)
  const [title, setTitle] = useState<string>(todo?.title || '')
  const [description, setDescription] = useState<string>(todo?.description || '')

  useEffect(() => {
    setInputVal(todo)
  }, [todo])

  const handleSubmit = async () => {
    setLoading(true)
    setStatus('Loading...')
    await axios.post('/api/updateTodo', {
      userID: user.id,
      userName: user.username,
      ip,
      todoList: todoList.map((todo: TodoProps) => {
        if (todo.title === inputVal.title)
          return {
            title,
            description,
            finished: todo?.finished || false
          }
        else return todo
      })
    }).then(({ data: { success } }) => {
      if (success)
        refreshData('', 'reload')
      else
        setStatus('Failed to modify the todo, please try again...')
    })
  }


  return (
    <Box data-test="todolist-extend">
      <Flex justifyContent='flex-end'>
        <Button onClick={() => modalContext.setModalIsOpen(false)}>
          <RiCloseCircleFill size='20px' />
        </Button>
      </Flex>
      <Box data-test="modifyBoard-defaultLayout">
        <InputText
          fontSize={['20px', null, '20px']}
          lineHeight={['20px', null, '28px']}
          mr='2'
        >
          Title:
        </InputText>
        <Input
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
        />
        <InputText
          fontSize={['20px', null, '20px']}
          lineHeight={['20px', null, '28px']}
          mr='2'
        >
          Description:
        </InputText>
        <SlateTextBox
          values={description ? JSON.parse(description) : ''}
          callChangeFunction={controlTaskDescription}
          changeHook={setDescription}
        />
        <Flex justifyContent='space-around'>
          <Button disabled={loading} onClick={() => handleSubmit()}>Submit</Button>
          <Button disabled={loading} onClick={() => setInputVal(todo)}>Reset</Button>
        </Flex>
        <Box>
          {status.length > 0 && <Text color='red'>{status}</Text>}
        </Box>
      </Box>
    </Box>
  )
}

export default CreateQuizBooks