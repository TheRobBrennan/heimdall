import * as React from "react"
import { cleanup, render } from "@testing-library/react"
import { MockedProvider } from "@apollo/client/testing"

import Component, { IDebugProps as Props } from "./Debug"

import type { Auth0User } from "../../../auth0/user"

describe("Our Debug component", () => {
  afterEach(cleanup)

  it("should render Auth0 user details", () => {
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
    const props: Props = {
      user,
    }

    const { asFragment } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <Component {...props} />
      </MockedProvider>
    )

    expect(asFragment).toMatchSnapshot()
  })
})
