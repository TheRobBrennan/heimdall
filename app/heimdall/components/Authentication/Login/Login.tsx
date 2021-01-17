import React from "react"
import Router from "next/router"

// Material UI
import Button from "@material-ui/core/Button"

const Login = () => {
  return (
    <>
      <Button
        variant="contained"
        onClick={() => {
          Router.push("api/login")
        }}
      >
        Launch Auth0 Login
      </Button>
    </>
  )
}
export default Login
