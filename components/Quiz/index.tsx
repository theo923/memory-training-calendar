import { QuizBookProps, QuizProps } from 'lib/interface'
import { verify_answer } from 'lib/utils/slug_util'
import React, { ChangeEvent, useEffect, useState } from 'react'
import styled from 'styled-components'
import Box from 'styled/Box'
import Button from 'styled/Button'
import Flex from 'styled/Flex'
import GlassBox from 'styled/GlassBox'
import Grid from 'styled/Grid'
import Input from 'styled/Input'
import ReadSlateText from 'styled/ReadSlateText'
import Text from 'styled/Text'
import { TiTick, TiTimes } from 'react-icons/ti'
import page_pass from 'lib/utils/page_pass'
import { refreshData } from 'lib/utils/refresh_data'

const QuestionBoard = styled(GlassBox)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80%;
  text-align: center;
`

const ScoreBoard = styled(Box)`
`

const AnswerList = styled(Grid)`
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
  const [showAnswer, setShowAnswer] = useState<boolean[]>(
    Array(quizBook?.quiz?.length).fill(false)
  )
  const [finalScores, setFinalScores] = useState<number>(0)


  useEffect(() => {
    if (answer.length === quizBook.quiz.length && questionIndex > quizBook.quiz.length - 1) {
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

  const handleShowAnswer = (num: number) => {
    let showAnswerCopy = [...showAnswer];
    showAnswerCopy[num] = true;
    setShowAnswer(showAnswerCopy)
  }

  return (
    <Box
      width='100%'
      minHeight='800px'
      height='100%'
    >
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
      {pass && answer.length === quizBook.quiz.length && questionIndex > quizBook.quiz.length - 1 &&
        <QuestionBoard m='20px'>
          <Text fontSize='30px'>
            You have completed {quizBook.name}.
          </Text>
          <Text fontSize='30px' mb='40px'>
            Scoreboard:
          </Text>
          <AnswerList mb='20px' gridTemplateColumns='1fr 1fr 1fr 1fr'>
            <Box></Box>
            <Text>Question</Text>
            <Text>Your Answer</Text>
            <Text>Model Answer</Text>
            {quizBook.quiz.map((q: QuizProps, idx: number) => {
              const bool = verify_answer(answer[idx], q.answer)
              return (
                <>
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
                </>
              )
            }
            )}
          </AnswerList>
          <ScoreBoard>
            <Text>
              Scores : {finalScores} / {quizBook.quiz.length}
            </Text>
          </ScoreBoard>
          <Button onClick={() => refreshData('/quizBook/1')}>Menu</Button>
        </QuestionBoard>
      }
    </Box >
  )
}

export default Quiz
