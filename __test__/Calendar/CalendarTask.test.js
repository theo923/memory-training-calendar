import React from 'react'
import { shallow } from 'enzyme'
import { findJSXByAttr } from '__test__/testUtils'

import CalendarTask from 'components/Calendar/CalendarTask'

const setup = (props = {}, state = null) => {
  return shallow(<CalendarTask {...props} />)
}

test('check if CalendarTask runs successfully', () => {
  const wrapper = setup()
})

test('check if calendar-calendarTask runs successfully', () => {
  const wrapper = setup()
  const CalendarTask = findJSXByAttr(wrapper, 'calendar-calendarTask')
  expect(CalendarTask.length).toBe(1)
})
