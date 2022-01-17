import React from 'react'
import { shallow } from 'enzyme'
import { findJSXByAttr } from '__test__/testUtils'
import Dashboard from 'components/DashboardSection/Dashboard'

const setup = (props = {}, state = null) => {
  return shallow(<Dashboard {...props} />)
}

test('check if Dashboard runs successfully', () => {
  const wrapper = setup()
})

test('check if component-dashboard runs successfully', () => {
  const wrapper = setup()
  const Dashboard = findJSXByAttr(wrapper, 'component-dashboard')
  expect(Dashboard.length).toBe(1)
})
