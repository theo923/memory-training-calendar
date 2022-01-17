import React from 'react'
import { shallow } from 'enzyme'
import { findJSXByAttr } from '__test__/testUtils'
import DashboardTask from 'components/DashboardSection/Dashboard/DashboardTask'

const setup = (props = {}, state = null) => {
  return shallow(<DashboardTask {...props} />)
}

test('check if Dashboard runs successfully', () => {
  const wrapper = setup()
})

test('check if dashboard-dashboardTask runs successfully', () => {
  const wrapper = setup()
  const DashboardTask = findJSXByAttr(wrapper, 'dashboard-dashboardTask')
  expect(DashboardTask.length).toBe(1)
})
