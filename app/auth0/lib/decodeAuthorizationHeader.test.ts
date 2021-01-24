import { cleanup } from "@testing-library/react"

import { decodeAuthorizationHeader as func } from "./decodeAuthorizationHeader"

// REVISIT: Update with a valid JWT token if you are running tests
export const VALID_JWT_TOKEN =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InNOTnN1RWZmU0lxeTRrcmtrQ2t4SSJ9.eyJodHRwczovL2hlaW1kYWxsLmlvL2p3dC9jbGFpbXMiOnsieC1oZWltZGFsbC1kZWZhdWx0LXJvbGUiOiJ1c2VyIiwieC1oZWltZGFsbC1hbGxvd2VkLXJvbGVzIjpbInVzZXIiXSwieC1oZWltZGFsbC11c2VyLWlkIjoiZ29vZ2xlLW9hdXRoMnwxMTYwNTg2NjgzMDIyOTA4NjE4MTAifSwiaXNzIjoiaHR0cHM6Ly9oZWltZGFsbC1kZW1vLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDExNjA1ODY2ODMwMjI5MDg2MTgxMCIsImF1ZCI6WyJodHRwczovL2hlaW1kYWxsLmlvL2RlbW8iLCJodHRwczovL2hlaW1kYWxsLWRlbW8udXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTYxMTQ2ODEwNCwiZXhwIjoxNjExNTU0NTA0LCJhenAiOiI2U25CUUw1WmQ3TjFvMHp5c3lmZnZhVUVGNXZoWUpFSCIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUifQ.oF9G3eB3lcScsneGpkG08hZDUP9WhLPhKnSsjpPKpo4PESRsRJxuyYGup9tSm1zi_nCJQVKqRf_DszYNHIIIfS2IfZhhxaHJhtzJOjiyY8ZS6Q2h-d_VyrXAuRahOwhJgBPwCk2UglGzhoHDgmqmNlZHT9bPTpJZMlu4XezDJG_PWDkZ3gurUPgeERS8gULI8YHFeKFZ10qkUbWqKP0QGLQIT66jamqJ-_AbUWPIXs8c0Y_l-7vrWKYQIZlI_HlismuZucTF6h-K2D9zpT_WoxeA5_xqY0riA1Dr1gbyifuUTn3jT3VxCEMSigA128FZavoXOOOhYvJzR7jeSsbqGQ"

describe("Our Auth0 decodeAuthorizationHeader lib", () => {
  afterEach(cleanup)
  describe('when supplied with a valid "Bearer <token>" string', () => {
    it("should receive a decoded JWT object", async () => {
      const mockHttpAuthorizationHeaderValue = `Bearer ${VALID_JWT_TOKEN}`
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
