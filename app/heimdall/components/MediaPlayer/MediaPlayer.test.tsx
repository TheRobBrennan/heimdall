import * as React from "react"
import { cleanup, render } from "@testing-library/react"
import { MockedProvider } from "@apollo/client/testing"

import Component from "./MediaPlayer"

describe("Our MediaPlayer component", () => {
  afterEach(cleanup)

  it("should render without children", () => {
    const { asFragment } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <Component />
      </MockedProvider>
    )

    expect(asFragment).toMatchSnapshot()
  })
})
