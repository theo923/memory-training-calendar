import React from 'react'
import { shallow } from 'enzyme'
import { findJSXByAttr } from '__test__/testUtils'

import TaskCard from 'components/TaskBoard/TaskCard'

const setup = (props = {}, state = null) => {
  return shallow(<TaskCard {...props} />)
}

test('check if TaskCard runs successfully', () => {
  const wrapper = setup()
})

test('check if taskBoard-taskCard runs successfully', () => {
  const wrapper = setup()
  const TaskCard = findJSXByAttr(wrapper, 'taskBoard-taskCard')
  expect(TaskCard.length).toBe(1)
})
