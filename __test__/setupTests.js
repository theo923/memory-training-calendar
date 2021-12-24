import Enzyme from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

Enzyme.configure({ adapter: new EnzymeAdapter() })

export const findJSXByAttr = (wrapper, name) => {
  return wrapper.find(`[data-test="${name}"]`)
}
