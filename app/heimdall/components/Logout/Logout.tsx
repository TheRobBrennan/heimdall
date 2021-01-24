import * as React from "react"

// Material UI
import Button from "@material-ui/core/Button"

export interface ILogoutProps {
  onLogout(): void
}

const Logout: React.FC<ILogoutProps> = ({ onLogout }) => {
  return (
    <>
      <Button variant="contained" onClick={onLogout}>
        Log out
      </Button>
    </>
  )
}
export default Logout
