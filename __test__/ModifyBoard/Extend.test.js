import React from 'react'
import { shallow } from 'enzyme'
import { findJSXByAttr } from '__test__/testUtils'

import ModifyBoardExtend from 'components/ModifyBoard/extend'

const setup = (props = {}, state = null) => {
  return shallow(<ModifyBoardExtend {...props} />)
}

test('check if Extend runs successfully', () => {
  const wrapper = setup()
})

test('check if modifyBoard-extend runs successfully', () => {
  const wrapper = setup()
  const Extend = findJSXByAttr(wrapper, 'modifyBoard-extend')
  expect(Extend.length).toBe(1)
})
