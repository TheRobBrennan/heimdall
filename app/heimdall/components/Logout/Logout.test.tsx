import React from "react"
import { cleanup, fireEvent, render } from "@testing-library/react"
import { MockedProvider } from "@apollo/client/testing"

import Component, { ILogoutProps as Props } from "./Logout"

describe("Our logout component", () => {
  afterEach(cleanup)

  it("should render without children", () => {
    const handleClick = jest.fn()
    const componentProps: Props = {
      onLogout: handleClick,
    }

    const { asFragment } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <Component {...componentProps} />
      </MockedProvider>
    )

    expect(asFragment).toMatchSnapshot()
  })

  it("should handle clicks", (done) => {
    const handleClick = () => done()
    const componentProps: Props = {
      onLogout: handleClick,
    }

    const { getByText } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <Component {...componentProps} />
      </MockedProvider>
    )

    const node = getByText("Log out")
    fireEvent.click(node)
  })
})
