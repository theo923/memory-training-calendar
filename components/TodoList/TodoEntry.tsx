import axios from "axios";
import { setTextColor, setBooleanColor } from "lib/controller/controlColor";
import { UserProps, TodoProps } from "lib/interface";
import { refreshData } from "lib/utils/refresh_data";
import { useState } from "react";
import { FaCompressArrowsAlt, FaExpandArrowsAlt } from "react-icons/fa";
import styled, { css } from "styled-components";
import Box from "styled/Box";
import Button from "styled/Button";
import Flex from "styled/Flex";
import GlassBox from "styled/GlassBox";
import ReadSlateText from "styled/ReadSlateText";
import Text from "styled/Text";
import tw from "twin.macro";

type FinishedIdentifier = {
  finished: boolean
}

const FinishedIdentifier = styled(Flex) <FinishedIdentifier>`
  width: 20px;
  cursor: pointer;
   ${tw`rounded-sm`}

  ${({ finished }) => css`
    background-color: ${setBooleanColor(finished)};
  `}
`;

const TodoEntryTitle = styled(GlassBox) <{ setTaskColor: string }>`
  display: flex;
  border-radius: 5px;
  font-weight: 700;
  white-space: pre-line;
  justify-content: space-between;


  ${({ setTaskColor }) => css`
    background: ${setTaskColor || ''}
  `}
`

const TodoEntryDescription = styled(GlassBox) <{ setTaskColor: string }>`
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
  title: string
  description: string
  finished: boolean
  user: UserProps
  todoList: TodoProps[]
}

const TodoEntry: React.FC<Props> = ({
  title,
  description,
  finished,
  user,
  todoList
}) => {
  const [open, setOpen] = useState<boolean>(false)

  const handleFinished = async () => {
    try {
      await axios.post('/api/updateTodo', {
        userID: user.id,
        todoList: todoList.map((todo: TodoProps) => {
          if (todo.title === title) return {
            ...todo,
            finished: !finished
          }
          else return todo
        })
      }).then(({ data: { success } }) => {
        if (success) {
          refreshData('/todoList', 'replace')
        }

      })
    }
    catch (err) {
      console.log('Failed to add todo...')
    }
  }

  return (
    <Box
      data-test="todoList-TodoEntry"
      mx='20px'
    >
      <TodoEntryTitle
        my={['10px']}
        mx={['10px', '0px']}
        setTaskColor={'#fff'}
      >
        <FinishedIdentifier
          onClick={() => handleFinished()}
          finished={finished}
        />
        <Box
          mx='3px'
          my='8px'
          p={['3px']}
        >
          <Text
            fontSize='18px'
            color={setTextColor(7)}
          >
            {title}
          </Text>
        </Box>
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
      </TodoEntryTitle>
      {open &&
        <TodoEntryDescription
          my={['10px']}
          mx={['10px', '0px']}
          setTaskColor={'#fff'}
        >
          <Box
            mx='10px'
            my='8px'
            p={['3px']}
            maxHeight='300px'
            width='auto'
            maxWidth={['400px', '600px', '425px']}
          >
            <Text
              fontSize='18px'
              color={setTextColor(7)}
            >
              <ReadSlateText
                values={JSON.parse(description)}
              />
            </Text>
          </Box>
        </TodoEntryDescription>
      }
    </Box>
  )
}

export default TodoEntry
