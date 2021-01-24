import * as React from "react"
import { cleanup, render } from "@testing-library/react"
import { MockedProvider } from "@apollo/client/testing"

import Page from "../pages/index"

describe("The default page", () => {
  afterEach(cleanup)

  it("should render without children", () => {
    const { asFragment } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <Page />
      </MockedProvider>
    )

    expect(asFragment).toMatchSnapshot()
  })
})
