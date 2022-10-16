import React from 'react'
import { describe, expect, it } from '@jest/globals'
import { shallow } from 'enzyme'
import Home from '../index.page'

describe('Home Page', () => {
  it('should render Home page as expected', () => {
    expect(shallow(<Home />)).toMatchSnapshot()
  })
})
