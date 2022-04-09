import React, { useContext, useEffect } from 'react'
import Flex from 'styled/Flex';
import Text from 'styled/Text';
import Box from 'styled/Box';
import { PublicQuizBookProps } from 'lib/interface';
import QuizBook from './QuizBook';
import { ModalContext } from 'components/Modal/ModalContext';
import PageNavigation from 'components/Pagination';
import { QUIZBOOK_RANKING_URL_PAGE } from 'lib/data/pageUrl';
import { NextRouter, useRouter } from 'next/router';
import Grid from 'styled/Grid';

interface Props {
  quizBooks: PublicQuizBookProps[],
  pageArray: number[]
}

const QuizBooks: React.FC<Props> = ({
  quizBooks,
  pageArray
}) => {
  const router: NextRouter = useRouter()
  const currentPage: number = parseInt(router?.query?.page as string)

  const modalContext = useContext(ModalContext)

  useEffect(() => {
    if (!modalContext.modalIsOpen) {
      modalContext.setModalContent(null)
    }
  }, [modalContext.modalIsOpen])

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
            QuizBook Ranking
          </Text>
        </Flex>
      </Flex>
      <Flex
        flexDirection='column'
        alignItems='center'
      >
        <Grid
          gridTemplateColumns={['1fr', null, '1fr 1fr']}
          my='20px'
          width={['100%', null, '100%']}
        >
          {quizBooks?.length > 0 &&
            quizBooks?.map((quizBook: PublicQuizBookProps, idx: number) =>
              <QuizBook
                key={`publicQuizBooks_${idx}`}
                quizBook={quizBook}
                currentPage={currentPage}
              />
            )
          }
        </Grid>
        <PageNavigation
          pageArray={pageArray}
          setPage={QUIZBOOK_RANKING_URL_PAGE}
        />
      </Flex>
    </Box>
  )
}

export default QuizBooks
