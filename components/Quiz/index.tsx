import { QuizBookProps } from 'lib/interface'
import React, { ChangeEvent, useState } from 'react'
import styled from 'styled-components'
import Box from 'styled/Box'
import Button from 'styled/Button'
import GlassBox from 'styled/GlassBox'
import Input from 'styled/Input'
import ReadSlateText from 'styled/ReadSlateText'

const QuestionBoard = styled(GlassBox)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80%;
  text-align: center;
`

interface Props {
  quizBook: QuizBookProps
}

const Quiz: React.FC<Props> = ({
  quizBook
}) => {
  const [questionIndex, setQuestionIndex] = useState<number>(0)
  const [answer] = useState<string[]>([])
  const [currentAnswer, setCurrentAnswer] = useState<string>('')

  const handleAnswers = (value: string) => {
    answer[questionIndex] = value
  }

  return (
    <Box width='100%' height='100%'>
      {questionIndex <= quizBook.quiz.length - 1 &&
        <QuestionBoard m='20px'>
          <Box>Question 1</Box>
          {quizBook.quiz[questionIndex].question}
          <ReadSlateText
            values={JSON.parse(quizBook.quiz[questionIndex].prompt)}
          />
          <Input
            value={currentAnswer}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setCurrentAnswer(e.target.value)}
          />
          <Button onClick={() => {
            setQuestionIndex(prev => prev + 1);
            handleAnswers(currentAnswer)
          }}>
            Next
          </Button>
        </QuestionBoard>
      }
      {answer.length === quizBook.quiz.length && questionIndex > quizBook.quiz.length - 1 &&
        <QuestionBoard m='20px'>
          You have completed the test.
          Please Check Your Scores:
        </QuestionBoard>
      }
    </Box>
  )
}

export default Quiz
