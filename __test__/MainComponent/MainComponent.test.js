import React from 'react'
import { shallow } from 'enzyme'
import { findJSXByAttr } from '__test__/testUtils'
import MainComponent from 'components/MainComponent'

const setup = (props = {}, state = null) => {
  return shallow(<MainComponent {...props} />)
}

test('check if MainComponent runs successfully', () => {
  const wrapper = setup()
})

test('check if component-mainComponent runs successfully', () => {
  const wrapper = setup()
  const MainComponent = findJSXByAttr(wrapper, 'component-mainComponent')
  expect(MainComponent.length).toBe(1)
})
