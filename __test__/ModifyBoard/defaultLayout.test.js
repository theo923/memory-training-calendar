import React from 'react'
import { shallow } from 'enzyme'
import { findJSXByAttr } from '__test__/testUtils'

import ModifyBoardDefaultLayout from 'components/CalendarSection/ModifyBoard/defaultLayout'

const setup = (props = {}, state = null) => {
  return shallow(<ModifyBoardDefaultLayout {...props} />)
}

test('check if DefaultLayout runs successfully', () => {
  const wrapper = setup()
})

test('check if modifyBoard-defaultLayout runs successfully', () => {
  const wrapper = setup()
  const DefaultLayout = findJSXByAttr(wrapper, 'modifyBoard-defaultLayout')
  expect(DefaultLayout.length).toBe(1)
})
