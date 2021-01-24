import React from "react"
import TestRenderer from "react-test-renderer"

import Component from "./ReactPlayerDemo"

describe("The ReactPlayerDemo component", () => {
  it(`should render`, () => {
    // Verify success state
    const component = TestRenderer.create(<Component />)
    expect(component.toJSON()).toMatchSnapshot()
  })
})
