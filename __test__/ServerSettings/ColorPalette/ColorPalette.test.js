import React from 'react'
import { shallow } from 'enzyme'
import { findJSXByAttr } from '__test__/testUtils'

import ColorPalette from 'components/ServerSettings/ColorPalette'

const setup = (props = {}, state = null) => {
  return shallow(<ColorPalette {...props} />)
}

test('check if ColorPalette runs successfully', () => {
  const wrapper = setup()
})

test('check if ServerSettings-colorPalette runs successfully', () => {
  const wrapper = setup()
  const ColorPalette = findJSXByAttr(wrapper, 'ServerSettings-colorPalette')
  expect(ColorPalette.length).toBe(1)
})
