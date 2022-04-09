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
import { initializeQuiz } from 'lib/initialize'
import { UserContext } from 'components/User'
import { QUIZBOOK_URL_PAGE } from 'lib/data/pageUrl'
import QuizBookPanel from '.'

const InputText = styled(Box)`
  align-self: center;
`

interface Props {
  quizBook: QuizBookProps
  action: 'create' | 'modify' | 'delete'
  quiz?: QuizProps
  allQuizBooks: QuizBookProps[]
  currentPage: number
}

const QuizModify: React.FC<Props> = ({
  allQuizBooks,
  currentPage,
  quizBook,
  action,
  quiz
}): JSX.Element => {
  const userInfo = useContext(UserContext)
  const modalContext = useContext(ModalContext)
  const [loading, setLoading] = useState<boolean | undefined>()
  const [status, setStatus] = useState<string>('')
  const [inputVal, setInputVal] = useState<QuizProps>(quiz ? quiz : initializeQuiz)

  const handleQuizBookPanel = (newBooks: any, currentNewBook: any) => {
    modalContext.setModalContent(
      <Box width='50vw'>
        <QuizBookPanel
          quizBook={currentNewBook}
          action='modify'
          allQuizBooks={newBooks}
          currentPage={currentPage}
        />
      </Box>
    )
    modalContext.setModalIsOpen(true)
  }

  const handleSubmit = async () => {
    setLoading(true)
    setStatus('Loading...')

    if (action === 'create') {
      let currentNewBook = {}
      const newBooks = allQuizBooks.map((qb: QuizBookProps) => {
        if (qb.id === quizBook.id) {
          currentNewBook = {
            ...quizBook,
            quiz: [...qb?.quiz, inputVal]
          }
          return currentNewBook
        }
        return qb
      })

      await axios.post('/api/updateQuizBooks', {
        userID: userInfo?.user.id,
        userName: userInfo?.user.username,
        ip: userInfo?.user?.ip,
        quizbook: newBooks
      }).then(({ data: { success } }) => {
        if (success) {
          refreshData(QUIZBOOK_URL_PAGE(currentPage), 'replace')

          handleQuizBookPanel(newBooks, currentNewBook)
        }
        else
          setStatus('Failed to create Quiz Book, please try again...')
      })
    }

    if (action === 'modify') {
      let currentNewBook = {}
      const newBooks = allQuizBooks.map((qb: QuizBookProps) => {
        if (qb.id === quizBook.id)
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

      await axios.post('/api/updateQuizBooks', {
        userID: userInfo?.user.id,
        userName: userInfo?.user.username,
        ip: userInfo?.user?.ip,
        quizbook: newBooks
      }).then(({ data: { success } }) => {
        if (success) {
          refreshData(QUIZBOOK_URL_PAGE(currentPage), 'replace')
          handleQuizBookPanel(newBooks, currentNewBook)
        }
        else
          setStatus('Failed to create Quiz Book, please try again...')
      })
    }

    setLoading(false)
  }

  const handleDeleteQuiz = async () => {
    let currentNewBook = {}
    const newBooks = allQuizBooks.map((qb: QuizBookProps) => {
      if (qb === quizBook)
        return {
          ...qb,
          quiz: qb?.quiz?.filter((q: QuizProps) => q !== quiz)
        }
      return qb
    })

    await axios.post('/api/updateQuizBooks', {
      userID: userInfo?.user.id,
      userName: userInfo?.user.username,
      ip: userInfo?.user?.ip,
      quizbook: newBooks
    }).then(({ data: { success } }) => {
      if (success) {
        refreshData(QUIZBOOK_URL_PAGE(currentPage), 'replace')
        handleQuizBookPanel(newBooks, currentNewBook)
      }
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
          Question:
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
          Prompt:
        </InputText>
        <SlateTextBox
          values={inputVal.prompt ? JSON.parse(inputVal.prompt) : ''}
          callChangeFunction={controlTaskDescription}
          insideObject
          property='prompt'
          changeHook={setInputVal}
        />
        <InputText
          fontSize={['20px', null, '20px']}
          lineHeight={['20px', null, '28px']}
          mr='2'
        >
          Answer:
        </InputText>
        <Input
          value={inputVal.answer}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setInputVal({ ...inputVal, answer: e.target.value })}
        />
        <Flex justifyContent='space-around'>
          <Button disabled={loading && !Boolean(inputVal.answer.length > 0)}
            onClick={() => handleSubmit()}
          >Submit
          </Button>
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

