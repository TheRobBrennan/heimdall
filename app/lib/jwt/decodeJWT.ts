import jwt_decode from "jwt-decode"

export const decodeJWT = (token: string) => {
  try {
    const decoded = jwt_decode(token)
    return decoded
  } catch (e) {
    return console.error(`Unable to decode JWT: ${token}\n\t${e}`)
  }
}
