import * as React from "react"
import { cleanup, render } from "@testing-library/react"
import { MockedProvider } from "@apollo/client/testing"

import Component, { GET_DATA_QUERY } from "./RatingsChart"

describe("GRANDstack RatingsChart component", () => {
  afterEach(cleanup)

  describe("when invoked WITHOUT a specific height or size", () => {
    it("should render the Ratings Distribution chart after receiving data", () => {
      // Define our Apollo request
      const renderRequest = {
        request: {
          query: GET_DATA_QUERY,
          variables: {},
        },
        result: {
          data: {
            ratingsCount: [
              { stars: 3, count: 2, __typename: "RatingCount" },
              { stars: 4, count: 4, __typename: "RatingCount" },
              { stars: 5, count: 6, __typename: "RatingCount" },
            ],
          },
        },
      }

      // Define our mock response(s)
      const gqlMocks = [renderRequest]

      // Test
      const { asFragment } = render(
        <MockedProvider mocks={gqlMocks} addTypename={false}>
          <Component />
        </MockedProvider>
      )

      expect(asFragment).toMatchSnapshot()

      // REVISIT: Advance to the next tick in the event loop so our chart can render
      // await act(() => {
      //   return new Promise((resolve) => {
      //     setTimeout(resolve, 0)
      //   })
      // })

      // Verify
    })
  })

  describe("when invoked WITH a specific height and size", () => {
    it("should render the Ratings Distribution chart after receiving data", () => {
      // Define our Apollo request
      const renderRequest = {
        request: {
          query: GET_DATA_QUERY,
          variables: {},
        },
        result: {
          data: {
            ratingsCount: [
              { stars: 3, count: 2, __typename: "RatingCount" },
              { stars: 4, count: 4, __typename: "RatingCount" },
              { stars: 5, count: 6, __typename: "RatingCount" },
            ],
          },
        },
      }

      // Define our mock response(s)
      const gqlMocks = [renderRequest]

      // Test
      const { asFragment } = render(
        <MockedProvider mocks={gqlMocks} addTypename={false}>
          <Component />
        </MockedProvider>
      )

      expect(asFragment).toMatchSnapshot()

      // REVISIT: Advance to the next tick in the event loop so our chart can render
      // await act(() => {
      //   return new Promise((resolve) => {
      //     setTimeout(resolve, 0)
      //   })
      // })

      // Verify
    })
  })
})
