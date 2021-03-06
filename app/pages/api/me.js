import auth0 from "../../auth0/auth0"

export default async function me(req, res) {
  try {
    await auth0.handleProfile(req, res)
  } catch (error) {
    console.error(`ERROR: api/me - ${error}`)
    res.status(error.status || 500).end(error.message)
  }
}
