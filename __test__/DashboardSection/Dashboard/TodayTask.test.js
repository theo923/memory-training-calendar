import React from 'react'
import { shallow } from 'enzyme'
import { findJSXByAttr } from '__test__/testUtils'
import TodayTask from 'components/DashboardSection/Dashboard/TodayTask'

const setup = (props = {}, state = null) => {
  return shallow(<TodayTask {...props} />)
}

test('check if TodayTask runs successfully', () => {
  const wrapper = setup()
})

test('check if dashboard-todayTask runs successfully', () => {
  const wrapper = setup()
  const TodayTask = findJSXByAttr(wrapper, 'dashboard-todayTask')
  expect(TodayTask.length).toBe(1)
})
