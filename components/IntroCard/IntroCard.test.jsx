import { describe, expect, it } from '@jest/globals'
import React from 'react'

import { render } from '@testing-library/react'

import IntroCard from './IntroCard'

describe('IntroCard Page', () => {
  it('should render IntroCard page as expected', () => {
    expect(render(<IntroCard />).baseElement).toMatchSnapshot()
  })
})
