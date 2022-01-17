import React from 'react'
import { shallow } from 'enzyme'
import { findJSXByAttr } from '__test__/testUtils'
import Tasks from 'components/TaskSection/Tasks'

const setup = (props = {}, state = null) => {
  return shallow(<Tasks {...props} />)
}

test('check if Tasks runs successfully', () => {
  const wrapper = setup()
})

test('check if component-tasks runs successfully', () => {
  const wrapper = setup()
  const Tasks = findJSXByAttr(wrapper, 'component-tasks')
  expect(Tasks.length).toBe(1)
})
