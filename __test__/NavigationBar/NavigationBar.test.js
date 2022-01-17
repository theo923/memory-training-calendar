import React from 'react'
import { shallow } from 'enzyme'
import { findJSXByAttr } from '__test__/testUtils'
import NavigationBar from 'components/NavigationBar'

const setup = (props = {}, state = null) => {
  return shallow(<NavigationBar {...props} />)
}

test('check if NavigationBar runs successfully', () => {
  const wrapper = setup()
})

test('check if component-navigationBar runs successfully', () => {
  const wrapper = setup()
  const NavigationBar = findJSXByAttr(wrapper, 'component-navigationBar')
  expect(NavigationBar.length).toBe(1)
})
