import React from 'react'
import { shallow } from 'enzyme'
import { findJSXByAttr } from '__test__/testUtils'
import TodoListExtend from 'components/TodoListSection/TodoList/extend'

const setup = (props = {}, state = null) => {
  return shallow(<TodoListExtend {...props} />)
}

test('check if TodoListExtend runs successfully', () => {
  const wrapper = setup()
})

test('check if todolist-extend runs successfully', () => {
  const wrapper = setup()
  const TodoListExtend = findJSXByAttr(wrapper, 'todolist-extend')
  expect(TodoListExtend.length).toBe(1)
})
