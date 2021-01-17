import React from "react"
import Router from "next/router"

// Material UI
import Button from "@material-ui/core/Button"

const Logout = () => {
  return (
    <>
      <Button
        variant="contained"
        onClick={() => {
          Router.push("api/logout")
        }}
      >
        Log out
      </Button>
    </>
  )
}
export default Logout
