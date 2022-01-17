import React from 'react'
import { shallow } from 'enzyme'
import { findJSXByAttr } from '__test__/testUtils'
import TaskEntry from 'components/TaskSection/Tasks/TaskEntry'

const setup = (props = {}, state = null) => {
  return shallow(<TaskEntry {...props} />)
}

test('check if TaskEntry runs successfully', () => {
  const wrapper = setup()
})

test('check if tasks-taskEntry runs successfully', () => {
  const wrapper = setup()
  const TaskEntry = findJSXByAttr(wrapper, 'tasks-taskEntry')
  expect(TaskEntry.length).toBe(1)
})
