import { decodeJWT } from "./decodeJWT"
import { decodeAuth0JWT } from "../../auth0/lib"

export const decodeAuthorizationHeader = async (authorizationHeader) => {
  try {
    // Use array destructuring to disregard the first item. We only care about the JWT.
    const [_, token] = authorizationHeader.split("Bearer ")

    // This decodes ANY well-formed JWT and does not vouch for validity or authenticity
    const decoded = decodeJWT(token)
    console.log(
      `Decoded generic JWT without token verification: ${JSON.stringify(
        decoded,
        null,
        2
      )}`
    )

    // Decode and verify JWT using Auth0 keys
    const decodedAuth0JWT = await decodeAuth0JWT(token)
    console.log(
      `Decoded Auth0 JWT: ${JSON.stringify(decodedAuth0JWT, null, 2)}`
    )
  } catch (e) {
    return console.error(
      `Unable to decode authorizationHeader: ${authorizationHeader}`
    )
  }
}
