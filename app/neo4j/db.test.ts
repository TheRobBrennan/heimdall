import { driver } from "./db"

describe("Neo4j database driver", () => {
  describe("should export a Neo4j driver that", () => {
    it("has been defined", () => {
      expect(driver).toBeDefined()
    })
    describe("has been configured with the intended settings for", () => {
      const expectedURI = process.env.NEO4J_URI.replace("bolt://", "")
      const expectedUser = process.env.NEO4J_USER
      const expectedPassword = process.env.NEO4J_PASSWORD

      const { _address, _authToken, _config } = driver()

      it("the URI of the Neo4j database", () => {
        expect(_address._stringValue).toEqual(expectedURI)
      })
      it("the user account to access the Neo4j database", () => {
        expect(_authToken.principal).toEqual(expectedUser)
      })
      it("the password associated with the user account", () => {
        expect(_authToken.credentials).toEqual(expectedPassword)
      })
      it("encryption has been defined", () => {
        expect(_config.encrypted).toBeDefined()
      })
    })
  })
})
