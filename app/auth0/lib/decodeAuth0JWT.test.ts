import { cleanup } from "@testing-library/react"

import { VALID_JWT_TOKEN, VALID_BUT_EXPIRED_JWT_TOKEN } from "./index"
import { decodeAuth0JWT as func } from "./decodeAuth0JWT"

describe("Our Auth0 decodeAuth0JWT lib", () => {
  afterEach(cleanup)
  describe("when supplied with a valid JWT token", () => {
    it("should receive a decoded JWT object", async () => {
      const result = await func(VALID_JWT_TOKEN)
      expect(result).toMatchSnapshot()
    })
  })
  describe("when supplied with a well-formed JWT token that has expired or cannot be verified", () => {
    it("should result in an error during processing", async (done) => {
      const result = await func(VALID_BUT_EXPIRED_JWT_TOKEN).catch((e) => {
        if (e.message === "jwt expired") {
          done()
        }
      })
    })
  })
  describe("when supplied with an unexpected string", () => {
    it("should result in an error during processing", async (done) => {
      const mockPoorlyFormedAndInvalidJWTToken = `Here is an example string that is neither a JWT token nor a valid string in the HTTP Authorization header`
      const result = await func(mockPoorlyFormedAndInvalidJWTToken).catch(
        (e) => {
          if (e.message === "jwt malformed") {
            done()
          }
        }
      )
    })
  })
})
