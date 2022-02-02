import React, { ChangeEvent, useContext, useState } from 'react'
import { QuizBookProps, QuizProps } from 'lib/interface'
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
import { initializeQuiz } from 'lib/initialize'
import { UserContext } from 'components/User'

const InputText = styled(Box)`
  align-self: center;
`

interface Props {
  quizBooks: QuizBookProps[]
  quizBook: QuizBookProps
  action: 'create' | 'modify' | 'delete'
  quiz?: QuizProps
}

const QuizModify: React.FC<Props> = ({
  quizBooks,
  quizBook,
  action,
  quiz
}): JSX.Element => {
  const userInfo = useContext(UserContext)
  const modalContext = useContext(ModalContext)
  const ip = getUserIP()
  const [loading, setLoading] = useState<boolean | undefined>()
  const [status, setStatus] = useState<string>('')
  const [inputVal, setInputVal] = useState<QuizProps>(quiz ? quiz : initializeQuiz)

  // export interface QuizProps {
  //   id?: string
  //   question: string
  //   answer: string
  //   prompt: string
  //   finished_date: Date | null
  //   last_answer: string | null
  // }

  const handleSubmit = async () => {
    setLoading(true)
    setStatus('Loading...')
    if (action === 'create')
      await axios.post('/api/updateQuizBooks', {
        userID: userInfo?.user.id,
        userName: userInfo?.user.username,
        ip,
        quizbook: quizBooks.map((qb: QuizBookProps) => {
          if (qb === quizBook)
            return {
              ...quizBook,
              quiz: [...qb?.quiz, inputVal]
            }
          return qb
        })
      }).then(({ data: { success } }) => {
        if (success)
          refreshData('', 'reload')
        else
          setStatus('Failed to create Quiz Book, please try again...')
      })

    if (action === 'modify')
      await axios.post('/api/updateQuizBooks', {
        userID: userInfo?.user.id,
        userName: userInfo?.user.username,
        ip,
        quizbook: quizBooks.map((qb: QuizBookProps) => {
          if (qb === quizBook)
            return {
              ...qb,
              quiz: qb?.quiz?.map((q: QuizProps) => {
                if (q === quiz)
                  return {
                    ...quiz,
                    ...inputVal
                  }
                return q
              })
            }
          return qb
        })
      }).then(({ data: { success } }) => {
        if (success)
          refreshData('', 'reload')
        else
          setStatus('Failed to create Quiz Book, please try again...')
      })

    setLoading(false)
  }

  const handleDeleteQuiz = async () => {
    await axios.post('/api/updateQuizBooks', {
      userID: userInfo?.user.id,
      userName: userInfo?.user.username,
      ip,
      quizbook: quizBooks.map((qb: QuizBookProps) => {
        if (qb === quizBook)
          return {
            ...qb,
            quiz: qb?.quiz?.filter((q: QuizProps) => q !== quiz)
          }
        return qb
      })
    }).then(({ data: { success } }) => {
      if (success)
        refreshData('', 'reload')
      else
        setStatus('Failed to create Quiz Book, please try again...')
    })
  }

  return (
    <Box data-test="todolist-extend">
      <Flex mb='10px' justifyContent='space-between'>
        <Button onClick={() => handleDeleteQuiz()}>
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
          Name of the Quiz:
        </InputText>
        <Input
          value={inputVal.question}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setInputVal({ ...inputVal, question: e.target.value })}
        />
        <InputText
          fontSize={['20px', null, '20px']}
          lineHeight={['20px', null, '28px']}
          mr='2'
        >
          Prompt of the QuizBook:
        </InputText>
        <SlateTextBox
          values={inputVal.prompt ? JSON.parse(inputVal.prompt) : ''}
          callChangeFunction={controlTaskDescription}
          insideObject
          property='prompt'
          changeHook={setInputVal}
        />
        <Flex justifyContent='space-around'>
          <Button disabled={loading} onClick={() => handleSubmit()}>Submit</Button>
          <Button disabled={loading}
            onClick={() => quiz ? setInputVal(quiz) : setInputVal(initializeQuiz)}>
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

export default QuizModify

