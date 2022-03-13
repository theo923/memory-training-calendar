import React, { ChangeEvent, useContext, useEffect, useState } from 'react'
import Flex from 'styled/Flex';
import Text from 'styled/Text';
import Box from 'styled/Box';
import { QuizBookProps } from 'lib/interface';
import QuizBook from './QuizBook';
import { BiBookAdd } from 'react-icons/bi';
import Button from 'styled/Button';
import Input from 'styled/Input';
import { initializeQuizBook } from 'lib/initialize';
import QuizBookExtend from './QuizBookExtend';
import { ModalContext } from 'components/Modal/ModalContext';
import PageNavigation from 'components/Pagination';
import { control_string_length } from 'lib/utils/control_string_length';
import { QUIZBOOK_URL_PAGE } from 'lib/data/pageUrl';
import { NextRouter, useRouter } from 'next/router';

interface Props {
  quizBooks: QuizBookProps[],
  allQuizBooks: QuizBookProps[],
  pageArray: number[]
}

const QuizBooks: React.FC<Props> = ({
  quizBooks,
  allQuizBooks,
  pageArray
}) => {
  const router: NextRouter = useRouter()
  const currentPage: number = parseInt(router?.query?.page as string)

  const [addQuizBook, setAddQuizBook] = useState<QuizBookProps>(initializeQuizBook)
  const modalContext = useContext(ModalContext)

  useEffect(() => {
    if (!modalContext.modalIsOpen) {
      modalContext.setModalContent(null)
    }
  }, [modalContext.modalIsOpen])

  const handleCreateQuizBookModal = () => {
    modalContext.setModalContent(
      <Box width='50vw'>
        <QuizBookExtend
          addQuizBook={addQuizBook}
          action='create'
          allQuizBooks={allQuizBooks}
          currentPage={currentPage}
        />
      </Box>
    )
    modalContext.setModalIsOpen(true)
  }

  return (
    <Box
      data-test='component-quizBooks'
      textAlign='center'
    >
      <Flex
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
      >
        <Flex my='50px'>
          <Text fontSize="50px">
            Quiz Book
          </Text>
        </Flex>
      </Flex>
      <Flex
        flexDirection='column'
        alignItems='center'
      >
        <Flex
          flexDirection='column'
          my='20px'
          width={['100%', null, '50%']}
        >
          {quizBooks?.length > 0 &&
            quizBooks?.map((quizBook: QuizBookProps, idx: number) =>
              <QuizBook
                key={idx}
                quizBook={quizBook}
                allQuizBooks={allQuizBooks}
                currentPage={currentPage}
              />
            )
          }
        </Flex>
        <Flex
          justifyContent='center'
          alignItems='center'
          mb='10px'
        >
          <Input
            placeholder="Create New Quiz Book"
            value={addQuizBook.name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setAddQuizBook({
                ...addQuizBook,
                name: control_string_length(e.target.value, 10)[1] as string
              })}
          />
          <Flex
            justifyContent='center'
            alignItems='center'
            ml='5px'>
            <Button
              disabled={addQuizBook?.name === ''}
              onClick={() => handleCreateQuizBookModal()}
            >
              <BiBookAdd size='25px' />
            </Button>
          </Flex>
        </Flex>
        <PageNavigation
          pageArray={pageArray}
          setPage={QUIZBOOK_URL_PAGE}
        />
      </Flex>
    </Box>
  )
}

export default QuizBooks
