// Source https://github.com/johnymontana/grandcast.fm/blob/master/next-app/lib/auth.js
import React, { useState, useContext, createContext } from "react"
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  gql,
} from "@apollo/client"
import fetch from "cross-fetch"

const AuthContext = createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

function useProvideAuth() {
  let apolloClient

  const [authToken, setAuthToken] = useState(null)

  const getAuthHeaders = () => {
    if (!authToken) return null

    return {
      authorization: `Bearer ${authToken}`,
    }
  }

  function createApolloClient(initialState) {
    const ssrMode = typeof window === "undefined"

    const link = new HttpLink({
      uri: "api/graphql",
      headers: getAuthHeaders(),
      fetch,
    })

    return new ApolloClient({
      ssrMode,
      link,
      cache: new InMemoryCache().restore(initialState),
    })
  }

  function initializeApollo(initialState = null) {
    const _apolloClient = apolloClient ?? createApolloClient(initialState)

    // If your page has Next.js data fetching methods that use Apollo Client, the initial state
    // get hydrated here
    if (initialState) {
      _apolloClient.cache.restore(initialState)
    }
    // For SSG and SSR always create a new Apollo Client
    /* istanbul ignore next */
    if (typeof window === "undefined") return _apolloClient
    // Create the Apollo Client once in the client
    if (!apolloClient) apolloClient = _apolloClient

    return _apolloClient
  }

  const signOut = () => {
    setAuthToken(null)
  }

  const signIn = async ({ username, password }) => {
    const client = createApolloClient()
    const LoginMutation = gql`
      mutation LoginMutation($username: String!, $password: String!) {
        login(username: $username, password: $password) {
          token
        }
      }
    `
    const result = await client.mutate({
      mutation: LoginMutation,
      variables: { username, password },
    })

    console.log(result)

    if (result?.data?.login?.token) {
      setAuthToken(result.data.login.token)
    }
  }

  const isSignedIn = () => {
    if (authToken) {
      return true
    } else {
      return false
    }
  }

  return {
    createApolloClient,
    initializeApollo,
    signIn,
    signOut,
    isSignedIn,
  }
}

export function AuthProvider({ children }) {
  const auth = useProvideAuth()

  return (
    <AuthContext.Provider value={auth}>
      <ApolloProvider client={auth.createApolloClient()}>
        {children}
      </ApolloProvider>
    </AuthContext.Provider>
  )
}
