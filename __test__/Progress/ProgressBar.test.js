import React from 'react'
import { shallow } from 'enzyme'
import { findJSXByAttr } from '__test__/testUtils'
import ProgressBar from 'components/Progress/ProgressBar'

const setup = (props = {}, state = null) => {
  return shallow(<ProgressBar {...props} />)
}

test('check if ProgressBar runs successfully', () => {
  const wrapper = setup()
})

test('check if progress-progressBar runs successfully', () => {
  const wrapper = setup()
  const ProgressBar = findJSXByAttr(wrapper, 'progress-progressBar')
  expect(ProgressBar.length).toBe(1)
})
