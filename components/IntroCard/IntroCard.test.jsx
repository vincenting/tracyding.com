import React from 'react'
import { describe, expect, it } from '@jest/globals'
import { shallow } from 'enzyme'
import IntroCard from './IntroCard'

describe('IntroCard Page', () => {
  it('should render IntroCard page as expected', () => {
    expect(shallow(<IntroCard />)).toMatchSnapshot()
  })
})
