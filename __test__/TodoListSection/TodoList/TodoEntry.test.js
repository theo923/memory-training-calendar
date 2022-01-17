import React from 'react'
import { shallow } from 'enzyme'
import { findJSXByAttr } from '__test__/testUtils'
import TodoEntry from 'components/TodoListSection/TodoList/TodoEntry'

const setup = (props = {}, state = null) => {
  return shallow(<TodoEntry {...props} />)
}

test('check if TodoEntry runs successfully', () => {
  const wrapper = setup()
})

test('check if todoList-todoEntry runs successfully', () => {
  const wrapper = setup()
  const TodoEntry = findJSXByAttr(wrapper, 'todoList-todoEntry')
  expect(TodoEntry.length).toBe(1)
})
