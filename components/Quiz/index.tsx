import { QuizBookProps } from 'lib/interface'
import { verify_answer } from 'lib/utils/slug_util'
import React, { ChangeEvent, useEffect, useState } from 'react'
import styled from 'styled-components'
import Box from 'styled/Box'
import Button from 'styled/Button'
import Flex from 'styled/Flex'
import Input from 'styled/Input'
import ReadSlateText from 'styled/ReadSlateText'
import Text from 'styled/Text'
import { RiArrowGoBackFill } from 'react-icons/ri'
import page_pass from 'lib/utils/page_pass'
import { refreshData } from 'lib/utils/refresh_data'
import ResultPage from './ResultPage'

const QuestionBoard = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  text-align: center;
`

interface Props {
  quizBook: QuizBookProps
}

const Quiz: React.FC<Props> = ({
  quizBook
}) => {
  const pass = page_pass(
    !quizBook?.quiz || quizBook.quiz.length === 0,
    () => refreshData('/')
  )
  const [questionIndex, setQuestionIndex] = useState<number>(0)
  const [answer, setAnswer] = useState<string[]>(
    Array(quizBook?.quiz?.length)
  )
  const [currentAnswer, setCurrentAnswer] = useState<string>('')
  const [finalScores, setFinalScores] = useState<number>(0)

  useEffect(() => {
    if (answer.length === quizBook?.quiz.length && questionIndex > quizBook?.quiz.length - 1) {
      let scores = 0
      answer.forEach((a: string, idx: number) => {
        if (verify_answer(a, quizBook.quiz[idx].answer))
          scores += 1
      })
      setFinalScores(_prev => scores)
    }
  }, [questionIndex])

  const handleAnswers = (value: string, idx: number) => {
    let answerCopy = [...answer];
    answerCopy[idx] = value;
    setAnswer(answerCopy)
  }


  return (
    <Box
      width='100%'
      minHeight='800px'
      height='100%'
    >
      <Flex justifyContent={['flex-start', null, 'flex-end']} alignContent='center'>
        <Box mr='20px'>
          <Button onClick={() => refreshData('', 'back')}>
            <RiArrowGoBackFill size='25px' />
          </Button>
        </Box>
        <Text fontSize='25px'>
          Back to Question Book
        </Text>
      </Flex>
      {pass && questionIndex <= quizBook.quiz.length - 1 &&
        <QuestionBoard minHeight='600px' p='20px'>
          <Text fontSize='20px' mb='30px'>{`Question ${questionIndex + 1} / ${quizBook.quiz.length} `}</Text>
          <Text fontSize='30px'>
            {quizBook.quiz[questionIndex].question}
          </Text>
          <ReadSlateText
            values={JSON.parse(quizBook.quiz[questionIndex].prompt)}
          />
          <Text fontSize='20px' mb='10px'>Answer</Text>
          <Input
            width={['100%', null, '400px']}
            mb='30px'
            value={currentAnswer}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setCurrentAnswer(e.target.value)}
          />
          <Flex justifyContent='center' alignItems='center'>
            <Box mr='20px'>
              <Button onClick={() => {
                setQuestionIndex(prev => prev + 1);
                handleAnswers(currentAnswer, questionIndex)
                setCurrentAnswer('')
              }}
                disabled={!Boolean(currentAnswer.length > 0)}
              >
                Next
              </Button>
            </Box>
            <Button onClick={() => {
              handleAnswers('', questionIndex)
              setCurrentAnswer('')
            }}>
              Reset
            </Button>
          </Flex>
        </QuestionBoard>
      }
      {pass && answer.length === quizBook.quiz.length &&
        questionIndex > quizBook.quiz.length - 1 &&
        <ResultPage
          quizBook={quizBook}
          answer={answer}
          finalScores={finalScores}
        />
      }
    </Box >
  )
}

export default Quiz
