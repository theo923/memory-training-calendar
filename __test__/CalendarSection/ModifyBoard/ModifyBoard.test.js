import React from 'react'
import { shallow } from 'enzyme'
import { findJSXByAttr } from '__test__/testUtils'

import ModifyBoard from 'components/CalendarSection/ModifyBoard'

const setup = (props = {}, state = null) => {
  return shallow(<ModifyBoard {...props} />)
}

test('check if ModifyBoard runs successfully', () => {
  const wrapper = setup()
})

test('check if component-modifyBoard runs successfully', () => {
  const wrapper = setup()
  const ModifyBoard = findJSXByAttr(wrapper, 'component-modifyBoard')
  expect(ModifyBoard.length).toBe(1)
})
