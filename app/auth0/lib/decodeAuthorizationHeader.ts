import { decodeAuth0JWT } from "./decodeAuth0JWT"

export const decodeAuthorizationHeader = async (authorizationHeader) => {
  try {
    // Use array destructuring to disregard the first item. We only care about the JWT.
    const [_, token] = authorizationHeader.split("Bearer ")

    // DEBUG
    console.log(`
    [DEBUG] Auth0 decodeAuthorizationHeader received authorization header:

    ${authorizationHeader}
    `)

    // Decode and verify JWT using Auth0 keys
    const decodedAuth0JWT = await decodeAuth0JWT(token)
    console.log(
      `Decoded Auth0 JWT: ${JSON.stringify(decodedAuth0JWT, null, 2)}`
    )

    // Return the decoded JWT
    return decodedAuth0JWT
  } catch (e) {
    return console.error(
      `Unable to decode authorizationHeader: ${authorizationHeader}`
    )
  }
}
