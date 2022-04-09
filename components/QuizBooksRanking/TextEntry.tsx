import React, {
  // useContext,
  useState
} from 'react'
import { PublicQuizBookProps } from 'lib/interface'
import Box from 'styled/Box'
// import Button from 'styled/Button'
import Flex from 'styled/Flex'
import Text from 'styled/Text'
import styled, { css } from 'styled-components'
import { setTextColor } from 'lib/controller/controlColor'
// import { AiFillEdit } from 'react-icons/ai'
// import { VscTriangleRight } from 'react-icons/vsc'
import GlassBox from 'styled/GlassBox'
import ReadSlateText from 'styled/ReadSlateText'
import Grid from 'styled/Grid'
import { FaCompressArrowsAlt, FaExpandArrowsAlt } from 'react-icons/fa'
import Button from 'styled/Button'
// import { ModalContext } from 'components/Modal/ModalContext'
// import QuizBookPanel from 'components/QuizBookPanel'
// import { refreshData } from 'lib/utils/refresh_data'

const QuizBookEntry = styled(GlassBox) <{ setTaskColor: string }>`
  ${({ setTaskColor }) => css`
    background: ${setTaskColor || ''}
  `}
`

const QuizBookTitle = styled(Text)`
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
  quizBook: PublicQuizBookProps
}

const TextEntry: React.FC<Props> = ({
  quizBook,
}): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false)
  // const modalContext = useContext(ModalContext)

  return (
    <QuizBookEntry
      data-test="quizBooks-quizBook"
      setTaskColor='#fff'
      width='100%'
      my='5px'
    >
      <Flex
        justifyContent='space-between'
        alignItems='center'
        m='10px'
      >
        <QuizBookTitle
          fontSize='18px'
          color={setTextColor(7)}
        >
          {quizBook?.name || ''}
        </QuizBookTitle>
        <Flex>
          <Grid gridGap='5px' mr='10px'>
            <Text>
              {`Questions: ${quizBook?.quiz?.length || 0}`}
            </Text>
            <Text>
              {`Attempts: ${quizBook?.attempt || 0}`}
            </Text>
          </Grid>
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
        </Flex>
      </Flex>
      {open &&
        <QuizBookDescription my='10px'>
          <Box
            mx='10px'
            my='8px'
            p={['3px']}
            maxHeight='300px'
            width='100%'
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
    </QuizBookEntry>
  )
}

export default TextEntry

