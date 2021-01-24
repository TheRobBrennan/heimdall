import { NextPage } from "next"

import Layout from "../heimdall/layout/Layout"
import Dashboard from "../heimdall/components/Dashboard/Dashboard"
import ReactPlayerDemo from "../heimdall/components/ReactPlayer/ReactPlayerDemo"
import Debug from "../heimdall/components/Debug/Debug"

import { useFetchUser } from "../auth0/user"

const DefaultPage: NextPage = () => {
  const { user } = useFetchUser({ required: true })

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
