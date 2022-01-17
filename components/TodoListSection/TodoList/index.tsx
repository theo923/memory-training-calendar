import React, { ChangeEvent, useState } from 'react'
import Flex from 'styled/Flex';
import Text from 'styled/Text';
import Box from 'styled/Box';
import TodoEntry from './TodoEntry'
import Input from 'styled/Input';
import { MdAddTask } from 'react-icons/md';
import Button from 'styled/Button';
import { TodoProps, UserProps } from 'lib/interface';
import axios from 'axios';
import { refreshData } from 'lib/utils/refresh_data';
import { initializeTodo } from 'lib/initialize';
import {getUserIP} from 'lib/get/getIP';

interface Props {
  user: UserProps
  todoList: TodoProps[]
}

const TodoList: React.FC<Props> = ({
  user,
  todoList
}) => {
  const ip = getUserIP()
  const [addTodo, setAddTodo] = useState<TodoProps>(initializeTodo)
  const [loading, setLoading] = useState<boolean | undefined>()
  const [status, setStatus] = useState<string>('')

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
        userID: user.id,
        userName: user.username,
        ip,
        todoList: [...todoList, addTodo]
      }).then(({ data: { success } }) => {
        if (success) {
          refreshData('/todoList', 'replace')
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
                user={user}
                todoList={todoList}
                title={todo.title}
                description={todo.description}
                finished={todo.finished}
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
      </Flex>
    </Box>
  )
}

export default TodoList
