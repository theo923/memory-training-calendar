import React from 'react'
import { shallow } from 'enzyme'
import { findJSXByAttr } from '__test__/testUtils'

import RegisterPanel from 'components/RegisterPanel'

const setup = (props = {}, state = null) => {
  return shallow(<RegisterPanel {...props} />)
}

test('check if RegisterPanel runs successfully', () => {
  const wrapper = setup()
})

test('check if component-registerPanel runs successfully', () => {
  const wrapper = setup()
  const RegisterPanel = findJSXByAttr(wrapper, 'component-registerPanel')
  expect(RegisterPanel.length).toBe(1)
})
