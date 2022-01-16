import React from 'react'
import { shallow } from 'enzyme'
import { findJSXByAttr } from '__test__/testUtils'

import TaskBoard from 'components/CalendarSection/TaskBoard'

const setup = (
  props = {
    userTasks: { '1970-01-01': {} },
    target: new Date(1970, 1, 1),
  },
  state = null
) => {
  return shallow(<TaskBoard {...props} />)
}

test('check if TaskBoard runs successfully', () => {
  const wrapper = setup()
})

test('check if component-taskBoard runs successfully', () => {
  const wrapper = setup()
  const TaskBoard = findJSXByAttr(wrapper, 'component-taskBoard')
  expect(TaskBoard.length).toBe(1)
})
