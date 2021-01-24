import { cleanup } from "@testing-library/react"

import { A_WELL_FORMED_BUT_UNTRUSTED_AND_UNVERIFIED_JWT_TOKEN } from "./index"
import { decodeAuthorizationHeader as func } from "./decodeAuthorizationHeader"

describe("Our generic JWT decodeAuthorizationHeader lib", () => {
  afterEach(cleanup)
  describe('when supplied with a valid "Bearer <token>" string', () => {
    it("should receive a decoded JWT object", async () => {
      const mockHttpAuthorizationHeaderValue = `Bearer ${A_WELL_FORMED_BUT_UNTRUSTED_AND_UNVERIFIED_JWT_TOKEN}`
      const result = await func(mockHttpAuthorizationHeaderValue)
      expect(result).toMatchSnapshot()
    })
  })
  describe('when supplied with a string that does not contain a valid "Bearer <token>"', () => {
    it("should return undefined", async () => {
      const mockHttpAuthorizationHeaderValue = `Bearer fakeToken`
      const result = await func(mockHttpAuthorizationHeaderValue)
      expect(result).toEqual(undefined)
    })
  })
  describe("when supplied with an unexpected string", () => {
    it("should return undefined", async () => {
      const mockHttpAuthorizationHeaderValue = `Here is an example string that is neither a JWT token nor a valid string in the HTTP Authorization header`
      const result = await func(mockHttpAuthorizationHeaderValue)
      expect(result).toEqual(undefined)
    })
  })
})
