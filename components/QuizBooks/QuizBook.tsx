import React, {useState } from 'react'
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

const QuizBookTitle = styled(GlassBox) <{ setTaskColor: string }>`
  display: flex;
  border-radius: 5px;
  font-weight: 700;
  white-space: pre-line;
  justify-content: space-between;


  ${({ setTaskColor }) => css`
    background: ${setTaskColor || ''}
  `}
`

const QuizBookDescription = styled(GlassBox) <{ setTaskColor: string }>`
  display: flex;
  border-radius: 5px;
  font-weight: 700;
  white-space: pre-line;
  overflow-y: auto;

  ${({ setTaskColor }) => css`
    background: ${setTaskColor || ''}
  `}
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
    <Box
      data-test="quizBooks-book"
      mx='20px'
    >
      <QuizBookTitle
        my={['10px']}
        mx={['10px', '0px']}
        setTaskColor={'#fff'}
      >
        <Box
          mx='3px'
          my='8px'
          p={['3px']}
        >
          <Text
            fontSize='18px'
            color={setTextColor(7)}
          >
            {quizBook.name}
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
        <QuizBookDescription
          my={['10px']}
          mx={['10px', '0px']}
          setTaskColor={'#fff'}
        >
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
              <ReadSlateText
                values={JSON.parse(quizBook.description)}
              />
            </Text>
          </Box>
        </QuizBookDescription>
      }
    </Box>
  )
}

export default QuizBook

