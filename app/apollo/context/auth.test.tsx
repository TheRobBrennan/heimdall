import * as React from "react"
import { cleanup, render } from "@testing-library/react"
import { MockedProvider } from "@apollo/client/testing"

import { AuthProvider as Component } from "./auth"

describe("Our AuthProvider component", () => {
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
        </Component>
      </MockedProvider>
    )

    expect(asFragment).toMatchSnapshot()
  })
})
