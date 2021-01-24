import * as React from "react"
import type { Auth0User } from "../../../auth0/user"

export interface IDebugProps {
  user: Auth0User
}

const Debug: React.FC<IDebugProps> = ({ user }) => {
  return (
    <>
      <p>User debug information</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </>
  )
}
export default Debug
