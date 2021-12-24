import React from 'react'
import { shallow } from 'enzyme'
import { findJSXByAttr } from '__test__/testUtils'

import JobCreationBoard from 'components/JobCreationBoard'

const setup = (props = {}, state = null) => {
  return shallow(<JobCreationBoard {...props} />)
}

test('check if JobCreationBoard runs successfully', () => {
  const wrapper = setup()
})

test('check if component-jobCreationBoard runs successfully', () => {
  const wrapper = setup()
  const JobCreationBoard = findJSXByAttr(wrapper, 'component-jobCreationBoard')
  expect(JobCreationBoard.length).toBe(1)
})
