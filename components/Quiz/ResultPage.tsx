import { QUIZBOOK_URL } from 'lib/data/pageUrl'
import { QuizBookProps, QuizProps } from 'lib/interface'
import { refreshData } from 'lib/utils/refresh_data'
import { verify_answer } from 'lib/utils/slug_util'
import React, { useState } from 'react'
import { TiTick, TiTimes } from 'react-icons/ti'
import styled from 'styled-components'
import Box from 'styled/Box'
import Button from 'styled/Button'
import Flex from 'styled/Flex'
import Grid from 'styled/Grid'
import Text from 'styled/Text'

const QuestionBoard = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  text-align: center;
`

const ScoreBoard = styled(Box)`
`

const AnswerList = styled(Grid)`
  text-align: center;
`

interface Props {
  quizBook: QuizBookProps,
  answer: string[]
  finalScores: number
}

const ResultPage: React.FC<Props> = ({
  quizBook,
  answer,
  finalScores
}) => {
  const [showAnswer, setShowAnswer] = useState<boolean[]>(
    Array(quizBook?.quiz?.length).fill(false)
  )

  const handleShowAnswer = (num: number) => {
    let showAnswerCopy = [...showAnswer];
    showAnswerCopy[num] = true;
    setShowAnswer(showAnswerCopy)
  }

  return (
    <QuestionBoard m='20px'>
      <Text fontSize='30px'>
        You have completed {quizBook.name}.
      </Text>
      <Text fontSize='30px' mb='40px'>
        Scoreboard:
      </Text>
      <AnswerList mb='20px' gridTemplateColumns='1fr 1fr 1fr 1fr' gridGap='20px'>
        <Box></Box>
        <Text>Question</Text>
        <Text>Your Answer</Text>
        <Text>Model Answer</Text>
        {quizBook.quiz.map((q: QuizProps, idx: number) => {
          const bool = verify_answer(answer[idx], q.answer)
          return (
            <Box key={`panel_${idx}`}>
              <Flex alignItems='center' justifyContent='center'>
                {bool ? <TiTick color='green' size='20px' /> : <TiTimes color='red' size='20px' />}
              </Flex>
              <Text color={bool ? 'green' : 'red'} fontSize='20px'>
                {q.question}
              </Text>
              <Text color={bool ? 'green' : 'red'} fontSize='20px'>
                {answer[idx]}
              </Text>
              {bool ? <Flex alignItems='center' justifyContent='center'>
                {bool ? <TiTick color='green' size='20px' /> : <TiTimes color='red' size='20px' />}
              </Flex>
                : showAnswer[idx] ?
                  <Text fontSize='20px' >
                    {q.answer}
                  </Text>
                  : <Button onClick={() => handleShowAnswer(idx)}>
                    Answer
                  </Button>
              }
            </Box>
          )
        }
        )}
      </AnswerList>
      <ScoreBoard>
        <Text>
          Scores : {finalScores} / {quizBook.quiz.length}
        </Text>
      </ScoreBoard>
      <Button onClick={() => refreshData(QUIZBOOK_URL)}>Menu</Button>
    </QuestionBoard>
  )
}

export default ResultPage
