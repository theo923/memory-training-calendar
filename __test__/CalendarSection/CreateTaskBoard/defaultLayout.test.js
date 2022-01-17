import React from 'react'
import { shallow } from 'enzyme'
import { findJSXByAttr } from '__test__/testUtils'

import CreateTaskBoardDefaultLayout from 'components/CalendarSection/CreateTaskBoard/defaultLayout'

const setup = (props = {}, state = null) => {
  return shallow(<CreateTaskBoardDefaultLayout {...props} />)
}

test('check if DefaultLayout runs successfully', () => {
  const wrapper = setup()
})

test('check if createTaskBoard-defaultLayout runs successfully', () => {
  const wrapper = setup()
  const DefaultLayout = findJSXByAttr(wrapper, 'createTaskBoard-defaultLayout')
  expect(DefaultLayout.length).toBe(1)
})
