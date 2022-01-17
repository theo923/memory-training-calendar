import React from 'react'
import { shallow } from 'enzyme'
import { findJSXByAttr } from '__test__/testUtils'
import QuizBook from 'components/QuizBooks/QuizBook'

const setup = (props = {}, state = null) => {
  return shallow(<QuizBook {...props} />)
}

test('check if QuizBook runs successfully', () => {
  const wrapper = setup()
})

test('check if quizBooks-quizBook runs successfully', () => {
  const wrapper = setup()
  const QuizBook = findJSXByAttr(wrapper, 'quizBooks-quizBook')
  expect(QuizBook.length).toBe(1)
})
