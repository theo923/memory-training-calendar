import React from 'react'
import { shallow } from 'enzyme'
import { findJSXByAttr } from '__test__/testUtils'
import TodoList from 'components/TodoListSection/TodoList'

const setup = (props = {}, state = null) => {
  return shallow(<TodoList {...props} />)
}

test('check if TodoList runs successfully', () => {
  const wrapper = setup()
})

test('check if component-todoList runs successfully', () => {
  const wrapper = setup()
  const TodoList = findJSXByAttr(wrapper, 'component-todoList')
  expect(TodoList.length).toBe(1)
})
