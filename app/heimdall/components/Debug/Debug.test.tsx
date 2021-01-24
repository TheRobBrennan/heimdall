import React from "react"
import TestRenderer from "react-test-renderer"
import { MockedProvider } from "@apollo/client/testing"

import Component from "./Debug"

import type { Auth0User } from "../../../auth0/user"

describe("Our Debug component", () => {
  describe("should render", () => {
    it("Auth0 user details", () => {
      const user: Auth0User = {
        given_name: "Rob",
        family_name: "Brennan",
        nickname: "rob",
        name: "Rob Brennan",
        picture:
          "https://lh3.googleusercontent.com/a-/AOh14GijQDyp8j2v_8Dg3WMs7BtVIqs-dDVizUnEuNLbPKI=s96-c",
        gender: "male",
        locale: "en",
        updated_at: "2021-01-24T04:46:38.864Z",
        sub: "google-oauth2|116058668302290861810",
      }

      const component = TestRenderer.create(
        <MockedProvider mocks={[]} addTypename={false}>
          <Component user={user} />
        </MockedProvider>
      )
      expect(component.toJSON()).toMatchSnapshot()
    })
  })
})
