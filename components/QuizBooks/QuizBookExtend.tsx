import React, { ChangeEvent, useContext, useEffect, useState } from 'react'
import { QuizBookProps, UserProps } from 'lib/interface'
import Box from 'styled/Box'
import Button from 'styled/Button'
import Flex from 'styled/Flex'
import Text from 'styled/Text'
import { RiCloseCircleFill, RiDeleteBin5Line } from 'react-icons/ri'
import { ModalContext } from 'components/Modal/ModalContext'
import { controlTaskDescription } from 'lib/controller/controlTask'
import styled from 'styled-components'
import Input from 'styled/Input'
import SlateTextBox from 'styled/SlateTextBox'
import { refreshData } from 'lib/utils/refresh_data'
import axios from 'axios'
import { getUserIP } from 'lib/get/getIP'

const InputText = styled(Box)`
  align-self: center;
`

interface Props {
  addQuizBook: QuizBookProps
  quizBooks: QuizBookProps[]
  user: UserProps
  action: 'create' | 'modify'
}

const QuizBookExtend: React.FC<Props> = ({
  addQuizBook,
  quizBooks,
  user,
  action
}): JSX.Element => {
  const modalContext = useContext(ModalContext)
  const ip = getUserIP()
  const [loading, setLoading] = useState<boolean | undefined>()
  const [status, setStatus] = useState<string>('')
  const [name, setName] = useState<string>(addQuizBook?.name || '')
  const [description, setDescription] = useState<string>(addQuizBook?.description || '')

  useEffect(() => {
    setName(addQuizBook.name)
    if (addQuizBook?.description.length > 0)
      setDescription(addQuizBook.description)
  }, [addQuizBook])

  const handleSubmit = async () => {
    setLoading(true)
    setStatus('Loading...')
    if (action === 'create')
      await axios.post('/api/updateQuizBooks', {
        userID: user.id,
        userName: user.username,
        ip,
        quizbook: [...quizBooks, { ...addQuizBook, name, description }]
      }).then(({ data: { success } }) => {
        if (success)
          refreshData('', 'reload')
        else
          setStatus('Failed to create Quiz Book, please try again...')
      })
    if (action === 'modify')
      await axios.post('/api/updateQuizBooks', {
        userID: user.id,
        userName: user.username,
        ip,
        quizbook: quizBooks.map((quizBook: QuizBookProps) => {
          if (quizBook.id === addQuizBook.id)
            return {
              ...addQuizBook,
              name,
              description
            }
          return quizBook
        })
      }).then(({ data: { success } }) => {
        if (success)
          refreshData('', 'reload')
        else
          setStatus('Failed to modify Quiz Book, please try again...')
      })
    setLoading(false)
  }

  const handleDeleteQuizBook = async () => {
    await axios.post('/api/updateQuizBooks', {
      userID: user.id,
      userName: user.username,
      ip,
      quizbook: quizBooks.filter((qb: QuizBookProps) => qb !== addQuizBook)
    }).then(({ data: { success } }) => {
      if (success)
        refreshData('', 'reload')
      else
        setStatus('Failed to delete Quiz Book, please try again...')
    })
  }

  return (
    <Box data-test="todolist-extend">
      <Flex my='10px' justifyContent='space-between'>
        <Button onClick={() => handleDeleteQuizBook()}>
          <RiDeleteBin5Line />
        </Button>
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
          Name of the QuizBook:
        </InputText>
        <Input
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        />
        <InputText
          fontSize={['20px', null, '20px']}
          lineHeight={['20px', null, '28px']}
          mr='2'
        >
          Description of the QuizBook:
        </InputText>
        <SlateTextBox
          values={description ? JSON.parse(description) : ''}
          callChangeFunction={controlTaskDescription}
          changeHook={setDescription}
        />
        <Flex justifyContent='space-around'>
          <Button disabled={loading} onClick={() => handleSubmit()}>Submit</Button>
          <Button disabled={loading}
            onClick={() => {
              setName(addQuizBook.name);
              setDescription(addQuizBook.description);
            }}>
            Reset
          </Button>
        </Flex>
        <Box>
          {status.length > 0 && <Text color='red'>{status}</Text>}
        </Box>
      </Box>
    </Box>
  )
}

export default QuizBookExtend

