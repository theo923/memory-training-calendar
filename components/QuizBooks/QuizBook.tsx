import React, { useState } from 'react'
import { UserProps, QuizBookProps } from 'lib/interface'
import Box from 'styled/Box'
import Button from 'styled/Button'
import Flex from 'styled/Flex'
import Text from 'styled/Text'
import styled, { css } from 'styled-components'
import { setTextColor } from 'lib/controller/controlColor'
import { FaCompressArrowsAlt, FaExpandArrowsAlt } from 'react-icons/fa'
import GlassBox from 'styled/GlassBox'
import ReadSlateText from 'styled/ReadSlateText'

const QuizBookEntry = styled(GlassBox) <{ setTaskColor: string }>`
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

const QuizBookDescription = styled(Box)`
  display: flex;
  font-weight: 700;
  white-space: pre-line;
  overflow-y: auto;
`

interface Props {
  quizBook: QuizBookProps
  user: UserProps
}

const QuizBook: React.FC<Props> = ({
  quizBook,
}): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <QuizBookEntry
      data-test="quizBooks-quizBook"
      m='20px'
      setTaskColor='#fff'
    >
      <Box mx='10px'>
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
          <Flex justifyContent='center' alignItems='center'>
            <Flex mr='10px'>
              {open &&
                <Button onClick={() => setOpen(prev => !prev)}>
                  <FaCompressArrowsAlt size='20px' />
                </Button>
              }
              {!open &&
                <Button onClick={() => setOpen(prev => !prev)}>
                  <FaExpandArrowsAlt size='20px' />
                </Button>
              }
            </Flex>
          </Flex>
        </QuizBookTitle>
        {open &&
          <QuizBookDescription my='10px'>
            <Box
              mx='10px'
              my='8px'
              p={['3px']}
              maxHeight='300px'
              width='100%'
              maxWidth={['400px', '600px', '425px']}
            >
              <Text
                fontSize='18px'
                color={setTextColor(7)}
              >
                {quizBook?.description &&
                  <ReadSlateText
                    values={JSON.parse(quizBook.description)}
                  />
                }
              </Text>
            </Box>
          </QuizBookDescription>
        }
      </Box>
      <Flex
        my='30px'
        justifyContent='space-between'
        alignItems='center'
        mx='10px'
      >
        <Text>
          {`Questions: ${quizBook?.quiz?.length || 0}`}
        </Text>
        <Text>
          {`${quizBook?.attempt || 0} attempts`}
        </Text>
      </Flex>
    </QuizBookEntry>
  )
}

export default QuizBook

