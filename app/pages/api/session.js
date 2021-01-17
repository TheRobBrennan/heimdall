import auth0 from "../../auth0/auth0"

export default async function session(req, res) {
  try {
    const tokenCache = auth0.tokenCache(req, res)
    const { accessToken } = await tokenCache.getAccessToken()

    // JWT token debugging
    // console.log(`[DEBUG] api/session JWT: ${accessToken}`)

    res.status(200).json({ accessToken })
  } catch (error) {
    console.error(`ERROR: api/session - ${error}`)
    res.status(error.status || 500).json({
      code: error.code,
      error: error.message,
    })
  }
}
