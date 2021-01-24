import fetch from "cross-fetch"
import { useMemo } from "react"

import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"

let apolloClient

const httpLink = createHttpLink({
  uri: `api/graphql`,
  fetch,
})

/* istanbul ignore next */
const authLink = setContext(async () => {
  // See https://www.apollographql.com/docs/react/networking/authentication/#header for more details
  // Get our session detail from the back-end API
  let authorization = ""
  try {
    const data = await (await fetch("api/session")).json()
    const { accessToken } = data
    authorization = `Bearer ${accessToken}`
  } catch (e) {
    // No session data available; no authorization header will be sent
  }

  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      authorization,
    },
  }
})

function createApolloClient(initialState) {
  const ssrMode = typeof window === "undefined"

  return new ApolloClient({
    ssrMode,
    link: authLink.concat(httpLink),
    cache: new InMemoryCache().restore(initialState),
  })
}

export function initializeApollo(initialState = null) {
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

/* istanbul ignore next */
export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState])
  return store
}
