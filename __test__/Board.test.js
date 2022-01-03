import React from 'react'
import { shallow } from 'enzyme'
import { findJSXByAttr } from '__test__/testUtils'

import Board from 'components/Board'

jest.mock('lib/firebase', () => {
  return {
    auth: jest.fn(),
  }
})

const setup = (props = {}, state = null) => {
  return shallow(<Board {...props} />)
}

test('check if Board runs successfully', () => {
  const wrapper = setup()
})

test('check if component-board runs successfully', () => {
  const wrapper = setup()
  const Board = findJSXByAttr(wrapper, 'component-board')
  expect(Board.length).toBe(1)
})
