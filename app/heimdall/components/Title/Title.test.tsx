import * as React from "react"
import { cleanup, render } from "@testing-library/react"
import { MockedProvider } from "@apollo/client/testing"

import Component, { ITitleProps as Props } from "./Title"

describe("GRANDstack Title component", () => {
  afterEach(cleanup)

  describe("should render", () => {
    it("without children", () => {
      const { asFragment } = render(
        <MockedProvider mocks={[]} addTypename={false}>
          <Component />
        </MockedProvider>
      )

      expect(asFragment).toMatchSnapshot()
    })
    it("with a supplied title", () => {
      const title = "A GRANDstack Title"

      const { asFragment } = render(
        <MockedProvider mocks={[]} addTypename={false}>
          <Component>{title}</Component>
        </MockedProvider>
      )

      expect(asFragment).toMatchSnapshot()
    })
  })
})
