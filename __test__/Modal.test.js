import React from 'react'
import { shallow } from 'enzyme'
import { findJSXByAttr } from '__test__/testUtils'

import Modal from 'components/Modal'

const setup = (props = {}, state = null) => {
  return shallow(<Modal {...props} />)
}

test('check if Modal runs successfully', () => {
  const wrapper = setup()
})

test('check if component-modal runs successfully', () => {
  const wrapper = setup()
  const Modal = findJSXByAttr(wrapper, 'component-modal')
  expect(Modal.length).toBe(1)
})
