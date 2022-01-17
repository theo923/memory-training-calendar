import React from 'react'
import { shallow } from 'enzyme'
import { findJSXByAttr } from '__test__/testUtils'
import QuizBooks from 'components/QuizBooks'

const setup = (props = {}, state = null) => {
  return shallow(<QuizBooks {...props} />)
}

test('check if QuizBooks runs successfully', () => {
  const wrapper = setup()
})

test('check if component-quizBooks runs successfully', () => {
  const wrapper = setup()
  const QuizBooks = findJSXByAttr(wrapper, 'component-quizBooks')
  expect(QuizBooks.length).toBe(1)
})
