import React from 'react'
import { shallow } from 'enzyme'
import { findJSXByAttr } from '__test__/testUtils'

import CreateTaskBoard from 'components/CalendarSection/CreateTaskBoard'

const setup = (props = {}, state = null) => {
  return shallow(<CreateTaskBoard {...props} />)
}

test('check if CreateTaskBoard runs successfully', () => {
  const wrapper = setup()
})

test('check if component-createTaskBoard runs successfully', () => {
  const wrapper = setup()
  const CreateTaskBoard = findJSXByAttr(wrapper, 'component-createTaskBoard')
  expect(CreateTaskBoard.length).toBe(1)
})
