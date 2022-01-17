import React from 'react'
import { shallow } from 'enzyme'
import { findJSXByAttr } from '__test__/testUtils'

import CreateTaskBoardExtend from 'components/CalendarSection/CreateTaskBoard/extend'

const setup = (props = {}, state = null) => {
  return shallow(<CreateTaskBoardExtend {...props} />)
}

test('check if Extend runs successfully', () => {
  const wrapper = setup()
})

test('check if createTaskBoard-extend runs successfully', () => {
  const wrapper = setup()
  const Extend = findJSXByAttr(wrapper, 'createTaskBoard-extend')
  expect(Extend.length).toBe(1)
})
