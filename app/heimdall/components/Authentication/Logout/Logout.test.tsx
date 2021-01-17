import React from "react"
import TestRenderer from "react-test-renderer"
import { MockedProvider } from "@apollo/client/testing"

import Component from "./Logout"

describe("Our logout component", () => {
  describe("should render", () => {
    it("without any children", () => {
      const component = TestRenderer.create(
        <MockedProvider mocks={[]} addTypename={false}>
          <Component />
        </MockedProvider>
      )
      expect(component.toJSON()).toMatchSnapshot()
    })
  })
})
