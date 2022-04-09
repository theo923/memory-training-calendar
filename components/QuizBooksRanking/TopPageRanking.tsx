import React, {
  // useContext,
} from 'react'
import { PublicQuizBookProps, QuizForPublicProps } from 'lib/interface'
import Box from 'styled/Box'
import Flex from 'styled/Flex'
import Text from 'styled/Text'
import styled, { css } from 'styled-components'
import { setTextColor } from 'lib/controller/controlColor'
// import { AiFillEdit } from 'react-icons/ai'
// import { VscTriangleRight } from 'react-icons/vsc'
import GlassBox from 'styled/GlassBox'
import Button from 'styled/Button'
import { MdOutlineAddBox } from 'react-icons/md'
import { VscDebugBreakpointLog } from 'react-icons/vsc'
// import { ModalContext } from 'components/Modal/ModalContext'
// import QuizBookPanel from 'components/QuizBookPanel'
// import { refreshData } from 'lib/utils/refresh_data'

const QuizBookEntry = styled(GlassBox) <{ setTaskColor: string }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 5px;
  ${({ setTaskColor }) => css`
    background: ${setTaskColor || ''}
  `}
`

const QuizBookTitle = styled(Box)`
  display: flex;
  font-weight: 700;
  white-space: pre-line;
  justify-content: space-between;
`

interface Props {
  quizBook: PublicQuizBookProps
}

const TopPageRanking: React.FC<Props> = ({
  quizBook,
}): JSX.Element => {
  // const modalContext = useContext(ModalContext)

  return (
    <QuizBookEntry
      data-test="quizBooks-quizBook"
      height='400px'
      m='5px'
      setTaskColor='#fff'
    >
      <Box>

        <Flex width='100%' flexDirection='column' alignItems='center'>
          <QuizBookTitle my='10px'>
            <Box
              my='8px'
              p='3px'
            >
              <Text
                fontSize='18px'
                color={setTextColor(7)}
              >
                {quizBook?.name || ''}
              </Text>
            </Box>
          </QuizBookTitle>
        </Flex>
        <Flex justifyContent='flex-start'>
          {quizBook?.quiz.length > 0 &&
            quizBook?.quiz.slice(0, 5).map((qz: QuizForPublicProps) => (
              <Flex
                key={`topQuizBook_quiz_${qz.id}`}
                alignItems='center'
                m='20px'
              >
                <Box mr='10px'>
                  <VscDebugBreakpointLog size='20px' />
                </Box>
                <Text>
                  {qz.question}
                </Text>
              </Flex>
            ))
          }
          {quizBook?.quiz.length === 0 &&
            <Text color='red' fontWeight={700}>
              Please add questions to the QuizBook first!
            </Text>
          }
        </Flex>
      </Box>
      <Flex
        my='30px'
        justifyContent='space-between'
        alignItems='center'
        mx='10px'
      >
        <Box>
          <Text>
            {`Questions: ${quizBook?.quiz?.length || 0}`}
          </Text>
          <Text>
            {`Attempts: ${quizBook?.attempt || 0}`}
          </Text>
        </Box>
        <Flex justifyContent='center' alignItems='center'>
          <Flex mr='10px'>
            <Button>
              <MdOutlineAddBox size='20px' />
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </QuizBookEntry >
  )
}

export default TopPageRanking

