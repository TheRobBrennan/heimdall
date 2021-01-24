import { NextPage } from "next"

import Layout from "../heimdall/layout/Layout"
import Dashboard from "../heimdall/components/Dashboard/Dashboard"
import ReactPlayerDemo from "../heimdall/components/ReactPlayer/ReactPlayerDemo"
import Debug from "../heimdall/components/Debug/Debug"

import { useFetchUser } from "../auth0/user"

const DefaultPage: NextPage = () => {
  const { user, loading } = useFetchUser({ required: true })

  // Display our loading component
  if (loading) {
    return <div>Loading...</div>
  }

  // Dashboard will display for authenticated users only
  return (
    <Layout>
      <>
        <div style={{ display: "block", margin: "auto" }}>
          <ReactPlayerDemo />
        </div>
        <hr />
        <Debug user={user} />
        <hr />
        <Dashboard />
      </>
    </Layout>
  )
}
export default DefaultPage
