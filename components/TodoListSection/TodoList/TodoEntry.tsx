import axios from "axios";
import { ModalContext } from "components/Modal/ModalContext";
import { setTextColor, setBooleanColor } from "lib/controller/controlColor";
import { TODOLIST_URL_PAGE } from "lib/data/pageUrl";
import { getUserIP } from "lib/get/getIP";
import { UserProps, TodoProps } from "lib/interface";
import { control_string_length } from "lib/utils/control_string_length";
import { refreshData } from "lib/utils/refresh_data";
import { useContext, useEffect, useState } from "react";
import { BiDetail } from "react-icons/bi";
import { FaCompressArrowsAlt, FaExpandArrowsAlt } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import styled, { css } from "styled-components";
import Box from "styled/Box";
import Button from "styled/Button";
import Flex from "styled/Flex";
import GlassBox from "styled/GlassBox";
import ReadSlateText from "styled/ReadSlateText";
import Text from "styled/Text";
import tw from "twin.macro";
import TodoListExtend from "./extend";

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
  id: string
  title: string
  description: string
  finished: boolean
  user: UserProps
  allTodoList: TodoProps[]
  currentPage: number
}

const TodoEntry: React.FC<Props> = ({
  id,
  title,
  description,
  finished,
  user,
  allTodoList,
  currentPage
}) => {
  const ip = getUserIP()
  const modalContext = useContext(ModalContext)
  const [open, setOpen] = useState<boolean>(false)

  useEffect(() => {
    if (!modalContext.modalIsOpen) {
      modalContext.setModalContent(null)
    }
  }, [modalContext.modalIsOpen])

  const handleModal = () => {
    modalContext.setModalContent(
      <Box width='50vw'>
        <TodoListExtend
          todo={{
            id,
            title,
            description,
            finished
          }}
          allTodoList={allTodoList}
          user={user}
        />
      </Box>
    )
    modalContext.setModalIsOpen(true)
  }

  const handleDelete = async () => {
    try {
      await axios.post('/api/updateTodo', {
        userID: user.id,
        userName: user.username,
        ip,
        todoList: allTodoList.filter((todo: TodoProps) => todo.title !== title)
      }).then(({ data: { success } }) => {
        if (success) {
          refreshData(TODOLIST_URL_PAGE(currentPage), 'replace')
        }
      })
    }
    catch (err) {
      console.log('Failed to add todo...')
    }
  }

  const handleFinished = async () => {
    try {
      await axios.post('/api/updateTodo', {
        userID: user.id,
        userName: user.username,
        ip,
        todoList: allTodoList.map((todo: TodoProps) => {
          if (todo.title === title) return {
            ...todo,
            finished: !finished
          }
          else return todo
        })
      }).then(({ data: { success } }) => {
        if (success)
          refreshData(TODOLIST_URL_PAGE(currentPage), 'replace')
      })
    }
    catch (err) {
      console.log('Failed to add todo...')
    }
  }

  return (
    <Box
      data-test="todoList-todoEntry"
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
            {control_string_length(title, 20)[1] as string}
          </Text>
        </Box>
        <Flex justifyContent='center' alignItems='center'>
          <Flex mr='10px'>
            <Button onClick={() => handleModal()}>
              <BiDetail size='20px' />
            </Button>
          </Flex>
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
            width='100%'
            maxWidth={['400px', '600px', '425px']}
          >
            <Flex width='100%' justifyContent='flex-end'>
              <Button onClick={() => handleDelete()}>
                <RiDeleteBin5Line />
              </Button>
            </Flex>
            <Text
              fontSize='18px'
              color={setTextColor(7)}
            >
              {description &&
                <ReadSlateText
                  values={JSON.parse(description)}
                />
              }
            </Text>
          </Box>
        </TodoEntryDescription>
      }
    </Box>
  )
}

export default TodoEntry
