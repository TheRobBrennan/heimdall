/**
 * Write resolvers to respond to our queries and mutations
 *
 * Be sure to view the link below to see great examples of:
 *  - Creating custom resolvers (e.g. mutation to handle creating a User node and send an automated email)
 *  - Translate to override auto-generated resolvers by using the same name (e.g. createUsers with custom functionality)
 *  - Use of the @cypher directive for any query or mutation (including in type definitions for properties such as relatedPosts)
 *  - Use of the @auth directive for accepting JWTs in the request
 *  - Use of the @exclude directive to exclude automatically generating queries or resolvers for types
 *  - Use of the @autogenerate directive to automatically generate unique values for ID fields
 *
 *  https://www.notion.so/neo4j-graphql-v1-0-0-alpha-2-d47908030d4e4a0c86babbaef63887d0
 */

import { decodeAuthorizationHeader } from "../auth0/lib"
import { decodeAuthorizationHeader as parseAnyWellFormedJWT } from "../lib/jwt"

export const resolvers = {
  Query: {
    async hello(_parent, _args, _context) {
      // This function currently logs decoded output, but you can imagine this might return some data or do additional processing...such as in the helloAuth example below
      parseAnyWellFormedJWT(_context?.req?.headers?.authorization)
      return `Hello. The current timestamp is ${Date.now()}`
    },
    // SUGGESTED: Write helloAuth query test
    /* istanbul ignore next */
    async helloAuth(_parent, _args, _context) {
      try {
        // Use our Auth0 library to decode our authorization header
        const decodedJWT = <Auth0JWT>(
          await decodeAuthorizationHeader(_context?.req?.headers?.authorization)
        )
        const result = decodedJWT
          ? `Hello, authenticated user ${decodedJWT?.sub}`
          : `Sorry. A valid session is required to see a response.`

        return result
      } catch (e) {
        return `Error attempting to decode the authorization header using our Auth0 library`
      }
    },
  },
}
