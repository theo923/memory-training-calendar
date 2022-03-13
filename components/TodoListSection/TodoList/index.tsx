import React, { ChangeEvent, useContext, useState } from 'react'
import Flex from 'styled/Flex';
import Text from 'styled/Text';
import Box from 'styled/Box';
import TodoEntry from './TodoEntry'
import Input from 'styled/Input';
import { MdAddTask } from 'react-icons/md';
import Button from 'styled/Button';
import { TodoProps } from 'lib/interface';
import axios from 'axios';
import { refreshData } from 'lib/utils/refresh_data';
import { initializeTodo } from 'lib/initialize';
import { getUserIP } from 'lib/get/getIP';
import { UserContext } from 'components/User';
import PageNavigation from 'components/Pagination';
import { TODOLIST_URL_PAGE } from 'lib/data/pageUrl';
import { control_string_length } from 'lib/utils/control_string_length';
import { NextRouter, useRouter } from 'next/router';
interface Props {
  todoList: TodoProps[]
  allTodoList: TodoProps[],
  pageArray: number[]
}

const TodoList: React.FC<Props> = ({
  todoList,
  allTodoList,
  pageArray
}) => {
  const ip = getUserIP()
  const router: NextRouter = useRouter()
  const currentPage: number = parseInt(router?.query?.page as string)
  const [addTodo, setAddTodo] = useState<TodoProps>(initializeTodo)
  const [loading, setLoading] = useState<boolean | undefined>()
  const [status, setStatus] = useState<string>('')
  const userInfo = useContext(UserContext)

  const filterUnvalidInput = async () => {
    if (todoList.filter(todo => todo.title === addTodo.title).length > 0)
      return {
        pass: false,
        message: 'The Todo is duplicated, please choose another name.'
      }
    return {
      pass: true
    }
  }

  const handleAddTodo = async () => {
    setLoading(true)
    setStatus('Loading...')
    const invalid = await filterUnvalidInput()
    if (!invalid.pass) {
      setStatus(invalid?.message || '')
      setLoading(false)
      return
    }
    try {
      await axios.post('/api/updateTodo', {
        userID: userInfo?.user.id,
        userName: userInfo?.user.username,
        ip,
        todoList: [...allTodoList, { ...addTodo, title: control_string_length(addTodo.title, 20)[1] as string }]
      }).then(({ data: { success } }) => {
        if (success) {
          refreshData(TODOLIST_URL_PAGE(currentPage), 'replace')
          setStatus('Done')
        }
        else
          setStatus('Failed to add todo, please try again...')
      })
      setLoading(false)
    }
    catch (err) {
      console.log('Failed to add todo...')
      setStatus('Failed to add todo, please try again...')
    }
  }

  return (
    <Box
      data-test='component-todoList'
      textAlign='center'
    >
      <Flex
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
      >
        <Flex my='50px'>
          <Text fontSize="50px">
            TodoList
          </Text>
        </Flex>
      </Flex>
      <Flex
        flexDirection='column'
        alignItems='center'
      >
        <Flex
          flexDirection='column'
          my='20px'
          width={['100%', null, '50%']}
        >
          {todoList?.length > 0 &&
            todoList?.map((todo: any, idx: number) =>
              <TodoEntry
                key={idx}
                user={userInfo?.user}
                allTodoList={allTodoList}
                title={todo.title}
                description={todo.description}
                finished={todo.finished}
                currentPage={currentPage}
              />)
          }
          <Flex
            justifyContent='center'
            alignItems='center'
            mb='10px'
          >
            <Input
              value={addTodo?.title || ''}
              placeholder="Please insert your todo's name"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setAddTodo({ ...addTodo, title: e.target.value })}
            />
            <Flex
              justifyContent='center'
              alignItems='center'
              ml='5px'>
              <Button
                disabled={loading || addTodo?.title === ''}
                onClick={() => handleAddTodo()}
              >
                <MdAddTask size='25px' />
              </Button>
            </Flex>
          </Flex>
          {status?.length > 0 && <Text color='red'>{status}</Text>}
        </Flex>
        <PageNavigation
          pageArray={pageArray}
          setPage={TODOLIST_URL_PAGE}
        />
      </Flex>
    </Box>
  )
}

export default TodoList
