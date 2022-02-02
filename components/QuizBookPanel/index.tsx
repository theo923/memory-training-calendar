import React, { useContext } from 'react'
import { QuizBookProps, QuizProps } from 'lib/interface'
import { ModalContext } from 'components/Modal/ModalContext'
import { RiCloseCircleFill } from 'react-icons/ri'
import Button from 'styled/Button'
import Flex from 'styled/Flex'
import Text from 'styled/Text'
import Box from 'styled/Box'
import QuizBookExtend from 'components/QuizBooks/QuizBookExtend'
import { AiFillEdit } from 'react-icons/ai'
import { RiAddCircleLine } from 'react-icons/ri'
import QuizModify from './QuizModify'

interface Props {
  quizBooks: QuizBookProps[]
  quizBook: QuizBookProps
  action: 'create' | 'modify'
}

const QuizBookPanel: React.FC<Props> = ({
  quizBooks,
  quizBook,
  // action
}): JSX.Element => {
  const modalContext = useContext(ModalContext)

  const handleCreateModal = () => {
    modalContext.setModalContent(
      <Box width='50vw'>
        <QuizBookExtend
          addQuizBook={quizBook}
          quizBooks={quizBooks}
          action='modify'
        />
      </Box>
    )
    modalContext.setModalIsOpen(true)
  }

  const handleQuiz = (action: string, data?: QuizProps) => {
    if (action === 'create') {
      modalContext.setModalContent(
        <Box width='50vw'>
          <QuizModify
            quizBooks={quizBooks}
            quizBook={quizBook}
            action='create'
          />
        </Box>
      )
      modalContext.setModalIsOpen(true)
    }
    if (action === 'modify' && data) {
      modalContext.setModalContent(
        <Box width='50vw'>
          <QuizModify
            quizBooks={quizBooks}
            quizBook={quizBook}
            action='modify'
            quiz={data}
          />
        </Box>
      )
      modalContext.setModalIsOpen(true)
    }
  }

  return (
    <Box data-test="todolist-extend">
      <Flex mb='30px' justifyContent='space-between'>
        <Flex justifyContent='center' alignItems='center'>
          <Text mr='10px'>
            {quizBook.name}
          </Text>
          <Flex mr='10px'>
            <Button onClick={() => handleCreateModal()}>
              <AiFillEdit size='20px' />
            </Button>
          </Flex>
        </Flex>
        <Button onClick={() => modalContext.setModalIsOpen(false)}>
          <RiCloseCircleFill size='20px' />
        </Button>
      </Flex>
      <Flex
        alignItems='center'
        mt='10px'
      >
        <Text mr='10px' fontSize='20px'>
          Quiz List:
        </Text>
        <Button onClick={() => handleQuiz('create')}>
          <RiAddCircleLine size='20px' />
        </Button>
      </Flex>
      {quizBook?.quiz && quizBook?.quiz?.map((q: QuizProps) =>
        <Flex mt='10px' justifyContent='space-between' alignItems='center'>
          <Text fontSize='20px'>
            {/* question: string
            answer: string
            prompt: string
            finished_date: Date | null
            last_answer: string | null */}
            {q?.question}
          </Text>
          <Button onClick={() => handleQuiz('modify', q)}>
            <AiFillEdit size='20px' />
          </Button>
        </Flex>
      )}
    </Box>
  )
}

export default QuizBookPanel

