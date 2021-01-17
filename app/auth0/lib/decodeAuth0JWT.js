import jwt from "jsonwebtoken"
import jwksClient from "jwks-rsa"

export const decodeAuth0JWT = async (token) => {
  return new Promise((resolve, reject) => {
    try {
      // We need to use our public keys provided by Auth0
      const jwksUri = process.env.AUTH0_DOMAIN_KEYS
      var client = jwksClient({
        jwksUri,
      })

      // Get our signing key from Auth0
      const getKey = (header, callback) => {
        client.getSigningKey(header.kid, function (err, key) {
          if (err) {
            console.error(`ERROR obtaining signing key from Auth0: ${err}`)
            callback(err)
          }
          var signingKey = key.publicKey || key.rsaPublicKey
          callback(null, signingKey)
        })
      }

      // Attempt to verify our Auth0 JWT
      jwt.verify(
        token,
        getKey,
        {
          algorithms: ["HS256", "RS256"],
        },
        (err, decoded) => {
          if (err) {
            console.error(`ERROR verifying Auth0 JWT: ${err}`)
            return reject(err)
          }
          return resolve(decoded)
        }
      )
    } catch (e) {
      console.error(`Unable to decode Auth0 JWT: ${token}\n\t${e}`)
      return reject(e)
    }
  })
}
