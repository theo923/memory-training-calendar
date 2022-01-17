import React from 'react'
import Flex from 'styled/Flex';
import Text from 'styled/Text';
import Box from 'styled/Box';
import { QuizBookProps, UserProps } from 'lib/interface';
import QuizBook from './QuizBook';

interface Props {
  user: UserProps
  quizBooks: QuizBookProps[]
}

const QuizBooks: React.FC<Props> = ({
  user,
  quizBooks
}) => {
  return (
    <Box textAlign='center'>
      <Flex
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
      >
        <Flex my='50px'>
          <Text fontSize="50px">
            quizBook
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
          {quizBooks.length > 0 &&
            quizBooks?.map((quizBook: QuizBookProps, idx: number) =>
              <QuizBook
                key={idx}
                user={user}
                quizBook={quizBook}
              />)
          }
        </Flex>
      </Flex>
    </Box>
  )
}

export default QuizBooks
