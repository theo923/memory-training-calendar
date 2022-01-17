import React from 'react'
import { shallow } from 'enzyme'
import { findJSXByAttr } from '__test__/testUtils'

import UtilsBoard from 'components/UtilsBoard'

const setup = (props = {}, state = null) => {
  return shallow(<UtilsBoard {...props} />)
}

test('check if UtilsBoard runs successfully', () => {
  const wrapper = setup()
})

test('check if component-utilsBoard runs successfully', () => {
  const wrapper = setup()
  const UtilsBoard = findJSXByAttr(wrapper, 'component-utilsBoard')
  expect(UtilsBoard.length).toBe(1)
})
