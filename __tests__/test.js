import React from 'react'
import Enzyme, { shallow } from 'enzyme'
// import Adapter from 'enzyme-adapter-react-16'
import Homepage from '../src/container/Homepage.jsx'
// Enzyme.configure({ adapter: new Adapter() })
const setup = () => {
  const props = {}
  const wrapper = shallow(<Homepage />)
  return (
    props,
    wrapper
  )
}