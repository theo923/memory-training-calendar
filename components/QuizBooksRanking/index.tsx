import React, { useContext, useEffect, useState } from 'react'
import Flex from 'styled/Flex';
import Text from 'styled/Text';
import Box from 'styled/Box';
import { PublicQuizBookProps } from 'lib/interface';
import { ModalContext } from 'components/Modal/ModalContext';
// import { NextRouter, useRouter } from 'next/router';
import Grid from 'styled/Grid';
import TopPageRanking from './TopPageRanking';
import TextEntry from './TextEntry';

interface Props {
  quizBooks: PublicQuizBookProps[]
}

const QuizBooksRanking: React.FC<Props> = ({
  quizBooks
}) => {
  // const router: NextRouter = useRouter()
  const [topCards, setTopCards] = useState<PublicQuizBookProps[]>()
  const [textCards, setTextCards] = useState<PublicQuizBookProps[]>()

  useEffect(() => {
    if (quizBooks && quizBooks.length > 3) {
      setTopCards(_tc => quizBooks.slice(0, 3))
      setTextCards(_ttc => quizBooks.slice(3, quizBooks.length))
    }
  }, [quizBooks])

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
          gridTemplateColumns={['1fr', null, '1fr 1fr 1fr']}
          my='20px'
          width={['100%', null, '100%']}
        >
          {topCards && topCards?.length > 0 &&
            topCards?.map((quizBook: PublicQuizBookProps, idx: number) =>
              <TopPageRanking
                key={`topCard_${idx}`}
                quizBook={quizBook}
              />
            )
          }
        </Grid>
        {textCards && textCards?.length > 0 &&
          textCards?.map((quizBook: PublicQuizBookProps, idx: number) =>
            <TextEntry
              key={`textCard_${idx}`}
              quizBook={quizBook}
            />
          )
        }
      </Flex>
    </Box>
  )
}

export default QuizBooksRanking
