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

// import jwt_decode from "jwt-decode"
import jwt from "jsonwebtoken"

export const resolvers = {
  Query: {
    async hello(_parent, _args, _context) {
      const authorization = _context?.req?.headers?.authorization
      if (authorization) {
        const [_, token] = authorization.split("Bearer ")
        console.log(`token: ${token}`)

        // This decodes ANY well-formed JWT and does not vouch for validity or authenticity
        // const decoded = jwt_decode(token)
        // console.log(`decoded: ${JSON.stringify(decoded, null, 2)}`)

        // Let's verify and see what we get
        var jwksClient = require("jwks-rsa")
        var client = jwksClient({
          jwksUri: "https://heimdall-demo.us.auth0.com/.well-known/jwks.json",
        })
        const getKey = (header, callback) => {
          client.getSigningKey(header.kid, function (err, key) {
            var signingKey = key.publicKey || key.rsaPublicKey
            callback(null, signingKey)
          })
        }
        // Verify with a good (current token)
        jwt.verify(
          token,
          getKey,
          {
            algorithms: ["HS256", "RS256"],
          },
          function (err, decoded) {
            console.log(
              `\nThe envelope, please...\n${JSON.stringify(decoded, null, 2)}`
            )
            if (err) {
              console.error(`ERROR: ${err}`)
            }
          }
        )

        // Verify with an expired token
        const expiredToken =
          "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InNOTnN1RWZmU0lxeTRrcmtrQ2t4SSJ9.eyJodHRwczovL2hlaW1kYWxsLmlvL2p3dC9jbGFpbXMiOnsieC1oZWltZGFsbC1kZWZhdWx0LXJvbGUiOiJ1c2VyIiwieC1oZWltZGFsbC1hbGxvd2VkLXJvbGVzIjpbInVzZXIiXSwieC1oZWltZGFsbC11c2VyLWlkIjoiZ29vZ2xlLW9hdXRoMnwxMTYwNTg2NjgzMDIyOTA4NjE4MTAifSwiaXNzIjoiaHR0cHM6Ly9oZWltZGFsbC1kZW1vLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDExNjA1ODY2ODMwMjI5MDg2MTgxMCIsImF1ZCI6WyJodHRwczovL2hlaW1kYWxsLmlvL2RlbW8iLCJodHRwczovL2hlaW1kYWxsLWRlbW8udXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTYxMDg4MTc2MywiZXhwIjoxNjEwOTY4MTYzLCJhenAiOiI2U25CUUw1WmQ3TjFvMHp5c3lmZnZhVUVGNXZoWUpFSCIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUifQ.If_rOTLm-3yrmbABED7MELUqwP6VQABZm5yJaC6KMQq2rKzc7dQFriLEurMjegi94hvZcl_W68evUfSdMT2ZF5JRRsKWBork-n-U8kPZRYuljfTeneBujyutt7svDB5H0uJQpsaJYxgBG494pT7q_W8TNFmxPdZw1kvjqahtFayLINrwNPsUQuT1FgUkd5N7hUHczY1vVDubPuE_ld97oJQ7PyVpUcyp3rmBmAr2SeA_WVHEZuOnMUui4bZLNTJqcGye5oiVtTwDcdxaHagb7jtcysaO_VkulvKKJVTjNK0v-ZyJ00uUWcu1-mitilLa1NcPWwDWhh8EXqhGFEN0Gg"
        jwt.verify(
          expiredToken,
          getKey,
          {
            algorithms: ["HS256", "RS256"],
          },
          function (err, decoded) {
            console.log(
              `\nEXPIRED TOKEN...\n${JSON.stringify(decoded, null, 2)}`
            )
            if (err) {
              console.error(`ERROR: ${err}`)
            }
          }
        )
      }
      return `Hello. The current timestamp is ${Date.now()}`
    },
  },
}
