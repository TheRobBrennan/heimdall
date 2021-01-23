import React from "react"
import TestRenderer from "react-test-renderer"

import Component from "./MediaPlayer"

describe("The MediaPlayer component", () => {
  it(`should render`, () => {
    // Verify success state
    const component = TestRenderer.create(<Component />)
    expect(component.toJSON()).toMatchSnapshot()
  })
})
