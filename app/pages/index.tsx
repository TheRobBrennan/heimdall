import { NextPage } from "next"

import Layout from "../heimdall/layout/Layout"
import Dashboard from "../heimdall/components/Dashboard/Dashboard"
import Login from "../heimdall/components/Authentication/Login/Login"
import Logout from "../heimdall/components/Authentication/Logout/Logout"

import { useFetchUser } from "../auth0/user"

const DefaultPage: NextPage = () => {
  const { user, loading } = useFetchUser({ required: true })

  // User debugging
  // console.log(`[DEBUG] / user: ${JSON.stringify(user, null, 2)}`)

  // Display our loading component
  if (loading) {
    return <div>Loading...</div>
  }

  // Display our login component
  if (!loading && !user) {
    return <Login />
  }

  // Dashboard will display for authenticated users only
  return (
    <Layout>
      <>
        <Logout />
        <Dashboard />
      </>
    </Layout>
  )
}
export default DefaultPage
