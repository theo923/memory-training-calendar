import React from 'react'
import { shallow } from 'enzyme'
import { findJSXByAttr } from '__test__/testUtils'
import CircleProgress from 'components/Progress/CircleProgress'

const setup = (props = {}, state = null) => {
  return shallow(<CircleProgress {...props} />)
}

test('check if CircleProgress runs successfully', () => {
  const wrapper = setup()
})

test('check if progress-circleProgress runs successfully', () => {
  const wrapper = setup()
  const CircleProgress = findJSXByAttr(wrapper, 'progress-circleProgress')
  expect(CircleProgress.length).toBe(1)
})
