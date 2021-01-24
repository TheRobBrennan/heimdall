import * as React from "react"
import { cleanup, render } from "@testing-library/react"
import { MockedProvider } from "@apollo/client/testing"

import Component from "./Layout"

describe("Our Layout component", () => {
  afterEach(cleanup)

  it("should render without children", () => {
    const { asFragment } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <Component />
      </MockedProvider>
    )

    expect(asFragment).toMatchSnapshot()
  })

  it("should render with children", () => {
    const { asFragment } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <Component>
          <h1>An example heading</h1>
          <p>Some content.</p>
        </Component>
      </MockedProvider>
    )

    expect(asFragment).toMatchSnapshot()
  })
})
