import React from 'react'
import { shallow } from 'enzyme'
import { findJSXByAttr } from '__test__/testUtils'

import LoginPanel from 'components/LoginPanel'

jest.mock('lib/firebase', () => {
  return {
    auth: jest.fn(),
  }
})

const setup = (props = {}, state = null) => {
  return shallow(<LoginPanel {...props} />)
}

test('check if LoginPanel runs successfully', () => {
  const wrapper = setup()
})

test('check if component-loginPanel runs successfully', () => {
  const wrapper = setup()
  const LoginPanel = findJSXByAttr(wrapper, 'component-loginPanel')
  expect(LoginPanel.length).toBe(1)
})
