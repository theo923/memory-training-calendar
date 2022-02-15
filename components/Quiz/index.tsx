import { QuizBookProps } from 'lib/interface'
import React from 'react'
import styled from 'styled-components'
import Box from 'styled/Box'
import GlassBox from 'styled/GlassBox'

const QuestionBoard = styled(GlassBox)`
  height: 80%;
  text-align: center;
`

interface Props {
  quizBook: QuizBookProps
}

const Quiz: React.FC<Props> = ({
  quizBook
}) => {
  console.log(quizBook)
  return (
    <Box width='100%' height='100%'>
      <QuestionBoard m='20px'>
        gdfg
      </QuestionBoard>
    </Box>
  )
}

export default Quiz
