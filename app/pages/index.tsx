import { NextPage } from "next"

import Layout from "../heimdall/layout/Layout"
import Dashboard from "../heimdall/components/Dashboard/Dashboard"
import Login from "../heimdall/components/Authentication/Login/Login"

import { useFetchUser } from "../auth0/user"

const DefaultPage: NextPage = () => {
  const { user, loading } = useFetchUser()

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
      <Dashboard />
    </Layout>
  )
}
export default DefaultPage
