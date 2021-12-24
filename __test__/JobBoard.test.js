import React from 'react'
import { shallow } from 'enzyme'
import { findJSXByAttr } from '__test__/testUtils'

import JobBoard from 'components/JobBoard'

const setup = (props = {}, state = null) => {
  return shallow(<JobBoard {...props} />)
}

test('check if JobBoard runs successfully', () => {
  const wrapper = setup()
})

test('check if component-jobBoard runs successfully', () => {
  const wrapper = setup()
  const JobBoard = findJSXByAttr(wrapper, 'component-jobBoard')
  expect(JobBoard.length).toBe(1)
})
