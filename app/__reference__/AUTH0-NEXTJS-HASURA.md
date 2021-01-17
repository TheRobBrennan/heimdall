# Auth0 Setup

This guide was borrowed from previous work in my [https://github.com/TheRobBrennan/explore-hasura-apollo-nextjs](https://github.com/TheRobBrennan/explore-hasura-apollo-nextjs) repo.

A lot of the setup and functionality is great to have for reference, so I will be modifying it for this particular project as we go.

## Create Auth0 Application

- Navigate to the [Auth0 Dashboard](https://manage.auth0.com/)
- Signup / Login to the account
- Create a new tenant.
- Click on the `Applications` menu option on the left and then click the `+ Create Application` button.
- In the Create Application window, set a name for your application and select `Single Page Web Applications`. (Assuming the frontend app will be an SPA built on react/vue etc)
- In the `settings` of the application, we will add appropriate (e.g: http://localhost:3000/callback) URLs as `Allowed Callback URLs` and `Allowed Web Origins`. We can also add domain specific URLs as well for the app to work. (e.g: https://myapp.com/callback).

This would be the URL of the frontend app which you will deploy later. You can ignore this, for now. You can always come back later and add the necessary URLs.

## Create Auth0 API

We need to create an API on Auth0 so that we can make the accessToken a valid JWT.

![https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/auth0-api-create.png](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/auth0-api-create.png)

Now in the pop-up that appears, give the name of the API and the identifier. We can technically give any value.

Let's say the name is `hasura` and the identifier is `https://hasura.io/learn`.

![https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/auth0-api-audience.png](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/auth0-api-audience.png)

We can let the signing algorithm to be as it is. (RS256)

Click on Create once you are done.

## Custom Claims in Auth0 Rules

[Custom claims](https://auth0.com/docs/scopes/current/custom-claims) inside the JWT are used to tell Hasura about the role of the caller, so that Hasura may enforce the necessary authorization rules to decide what the caller can and cannot do. In the Auth0 dashboard, navigate to [Rules](https://manage.auth0.com/#/rules).

Add the following rule to add our custom JWT claims under `hasura-jwt-claim`:

```js
function (user, context, callback) {
  const namespace = "https://hasura.io/jwt/claims";

  context.accessToken[namespace] =
    {
      'x-hasura-default-role': 'user',
      // do some custom logic to decide allowed roles
      'x-hasura-allowed-roles': ['user'],
      'x-hasura-user-id': user.user_id
    };
  callback(null, user, context);
}
```

## Connect Hasura with Auth0

In this part, you will learn how to connect Hasura with the Auth0 application that you just created in the previous step.

We need to configure Hasura to use the Auth0 public keys. An easier way to generate the config for JWT is:

- Click on the following link - [https://hasura.io/jwt-config](https://hasura.io/jwt-config)
- For `Select Provider` choose `Auth0`
- Enter `Auth0 Domain Name` (e.g. `demo-explore-hasura-apollo-nextjs.us.auth0.com`)
- Click `Generate Config`

The generated configuration can be used as the value for environment variable `HASURA_GRAPHQL_JWT_SECRET`.

Since we have deployed Hasura GraphQL Engine on Heroku, let's head to Heroku dashboard to configure the admin secret and JWT secret.

Open the "Settings" page for your Heroku app, add a new Config Var called `HASURA_GRAPHQL_JWT_SECRET`, and copy and paste the generate JWT configuration into the value box.

Next, create a new Config Var called `HASURA_GRAPHQL_ADMIN_SECRET` and enter a secret key to protect the GraphQL endpoint. (Imagine this as the password to your GraphQL server).

Great! Now your Hasura GraphQL Engine is secured using Auth0.

## Sync Users with Rules

Auth0 has rules that can be set up to be called on every login request. We need to set up a rule in Auth0 which allows the users of Auth0 to be in sync with the users in our database. The following code snippet allows us to do the same. Again using the Rules feature, create a new blank rule `upsert-user` and paste in the following code snippet:

```js
function (user, context, callback) {
  const userId = user.user_id;
  const nickname = user.nickname;

  // Modify with your Hasura admin secret and URL to the application
  const admin_secret = "demo";
  const url = "https://explore-hasura-apollo-nextjs.herokuapp.com/v1/graphql";

  // Define your GraphQL mutation and query variables object
  const query = `mutation($userId: String!, $nickname: String) {
    insert_users(objects: [{
      id: $userId, name: $nickname
    }], on_conflict: {constraint: users_pkey, update_columns: [last_seen, name]}
    ) {
      affected_rows
    }
  }`;
  const variables = { "userId": userId, "nickname": nickname };

  request.post({
      url: url,
      headers: {'content-type' : 'application/json', 'x-hasura-admin-secret': admin_secret},
      body: JSON.stringify({
        query: query,
        variables: variables
      })
  }, function(error, response, body){
       console.log(body);
       callback(null, user, context);
  });
}
```

Note: Modify `x-hasura-admin-secret` and `url` parameters appropriately according to your app. Here we are making a simple request to make a mutation into users table.

That’s it! This rule will now be triggered on every successful signup or login, and we insert or update the user data into our database using a Hasura GraphQL mutation.

The above request performs a mutation on the users table with the id and name values.

# Next.js Boilerplate Setup

For this tutorial, the GraphQL backend and the basic app UI is already ready. Our task will be to convert the "static" UI into a working realtime app in Next.js

## Download and run the boilerplate

1. Download the boilerplate from https://hasura.io/learn/graphql/nextjs-fullstack-serverless/boilerplate.zip
2. Unzip and make sure you're in the app-boilerplate directory
3. Install dependencies and run the "static" app

- `yarn install` **OR** `npm install`
- `yarn dev` **OR** `npm run dev`

## Configure the environment variables

Copy the `.env.example` to `.env` and configure the values for Auth0.

The `AUTH0_CLIENT_ID`, `AUTH0_DOMAIN`, `AUTH0_CLIENT_SECRET` are available in your Auth0 application settings and `SESSION_COOKIE_SECRET` can be any random string of at least 32 characters and it is used to encrypt the cookie.

```sh
DOMAIN=http://localhost:3000

# Auth0 API
AUTH0_AUDIENCE=

# Auth0 Application
AUTH0_CLIENT_ID=
AUTH0_DOMAIN=
AUTH0_CLIENT_SECRET=
REDIRECT_URI=http://localhost:3000/api/callback
POST_LOGOUT_REDIRECT_URI=http://localhost:3000/
SESSION_COOKIE_SECRET=BXyv4qDtBKYxJtLopfY7nj75sJg3p2Ka
```

This is what you should see after the steps above:

![https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-react/boilerplate-after-login.png](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-react/boilerplate-after-login.png)

# Configure Apollo Client with Next.js

Apollo gives a neat abstraction layer and an interface to your GraphQL server. You don't need to worry about constructing your queries with request body, headers and options, that you might have done with `axios` or `fetch` say. You can directly write queries and mutations in GraphQL and they will automatically be sent to your server via your apollo client instance.

## React Apollo Hooks Installation

Let's get started by installing apollo client & peer graphql dependencies:

```sh
# Make sure you are in the app-boilerplate directory
$ npm i apollo-boost @apollo/react-hooks graphql apollo-link-ws subscriptions-transport-ws
```

## Create Apollo Client Instance

Now let's look at creating the Apollo Client Instance for the app. apollo-boost would have installed various dependencies that are used here.

Open `lib/apolloClient.js` and write the following code:

```js
import fetch from "isomorphic-unfetch"
import { ApolloClient } from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { HttpLink } from "apollo-link-http"
import { onError } from "apollo-link-error"
import { WebSocketLink } from "apollo-link-ws"
import { SubscriptionClient } from "subscriptions-transport-ws"
import auth0 from "./auth0"
let accessToken = null
const requestAccessToken = async () => {
  if (accessToken) return
  const res = await fetch(`api/session`)
  if (res.ok) {
    const json = await res.json()
    accessToken = json.accessToken
  } else {
    accessToken = "public"
  }
}
// remove cached token on 401 from the server
const resetTokenLink = onError(({ networkError }) => {
  if (
    networkError &&
    networkError.name === "ServerError" &&
    networkError.statusCode === 401
  ) {
    accessToken = null
  }
})
const createHttpLink = (headers) => {
  const httpLink = new HttpLink({
    uri: "https://explore-hasura-apollo-nextjs.herokuapp.com/v1/graphql",
    credentials: "include",
    headers, // auth token is fetched on the server side
    fetch,
  })
  return httpLink
}
const createWSLink = () => {
  return new WebSocketLink(
    new SubscriptionClient(
      "wss://explore-hasura-apollo-nextjs.herokuapp.com/v1/graphql",
      {
        lazy: true,
        reconnect: true,
        connectionParams: async () => {
          await requestAccessToken() // happens on the client
          return {
            headers: {
              authorization: accessToken ? `Bearer ${accessToken}` : "",
            },
          }
        },
      }
    )
  )
}
export default function createApolloClient(initialState, headers) {
  const ssrMode = typeof window === "undefined"
  let link
  if (ssrMode) {
    link = createHttpLink(headers) // executed on server
  } else {
    link = createWSLink() // executed on client
  }
  return new ApolloClient({
    ssrMode,
    link,
    cache: new InMemoryCache().restore(initialState),
  })
}
```

Let's try to understand what is happening here.

## HttpLink and InMemoryCache

We are creating an `HttpLink` to connect ApolloClient with the GraphQL server. As you know already, our GraphQL server is running on Heroku. So don't forget to change the uri to match your Hasura instance in Heroku.

At the end, we instantiate ApolloClient by passing in our HttpLink and a new instance of `InMemoryCache` (recommended caching solution). We are wrapping all of this in a function which will return the client. We are also determining the `ssrMode` and passing it to Apollo.

## WebSocketLink and Client Side

We are creating `WebSocketLink` to be used on the client side. The Authorization headers will be generated by making a request to Auth0 API from the client.

Next let's create the HOC `withApollo` that we will use inside our Next.js page to wrap our page component.

Open `lib/withApollo.js` and add the following code:

```js
import React from "react"
import App from "next/app"
import Head from "next/head"
import { ApolloProvider } from "@apollo/react-hooks"
import createApolloClient from "./apolloClient"
import auth0 from "./auth0"
// On the client, we store the Apollo Client in the following variable.
// This prevents the client from reinitializing between page transitions.
let globalApolloClient = null
/**
 * Installs the Apollo Client on NextPageContext
 * or NextAppContext. Useful if you want to use apolloClient
 * inside getStaticProps, getStaticPaths or getServerSideProps
 * @param {NextPageContext | NextAppContext} ctx
 */
export const initOnContext = (ctx) => {
  const inAppContext = Boolean(ctx.ctx)
  // We consider installing `withApollo({ ssr: true })` on global App level
  // as antipattern since it disables project wide Automatic Static Optimization.
  if (process.env.NODE_ENV === "development") {
    if (inAppContext) {
      console.warn(
        "Warning: You have opted-out of Automatic Static Optimization due to `withApollo` in `pages/_app`.\n" +
          "Read more: https://err.sh/next.js/opt-out-auto-static-optimization\n"
      )
    }
  }
  // Initialize ApolloClient if not already done
  const apolloClient =
    ctx.apolloClient ||
    initApolloClient(ctx.apolloState || {}, inAppContext ? ctx.ctx : ctx)
  // We send the Apollo Client as a prop to the component to avoid calling initApollo() twice in the server.
  // Otherwise, the component would have to call initApollo() again but this
  // time without the context. Once that happens, the following code will make sure we send
  // the prop as `null` to the browser.
  apolloClient.toJSON = () => null
  // Add apolloClient to NextPageContext & NextAppContext.
  // This allows us to consume the apolloClient inside our
  // custom `getInitialProps({ apolloClient })`.
  ctx.apolloClient = apolloClient
  if (inAppContext) {
    ctx.ctx.apolloClient = apolloClient
  }
  return ctx
}
async function getHeaders(ctx) {
  if (typeof window !== "undefined") return null
  if (typeof ctx.req === "undefined") return null
  const s = await auth0.getSession(ctx.req)
  if (s && s.accessToken == null) return null
  return {
    authorization: `Bearer ${s ? s.accessToken : ""}`,
  }
}
/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 * @param  {NormalizedCacheObject} initialState
 * @param  {NextPageContext} ctx
 */
const initApolloClient = (initialState, headers) => {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === "undefined") {
    return createApolloClient(initialState, headers)
  }
  // Reuse client on the client-side
  if (!globalApolloClient) {
    globalApolloClient = createApolloClient(initialState, headers)
  }
  return globalApolloClient
}
/**
 * Creates a withApollo HOC
 * that provides the apolloContext
 * to a next.js Page or AppTree.
 * @param  {Object} withApolloOptions
 * @param  {Boolean} [withApolloOptions.ssr=false]
 * @returns {(PageComponent: ReactNode) => ReactNode}
 */
export const withApollo = ({ ssr = true } = {}) => (PageComponent) => {
  const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
    let client
    if (apolloClient) {
      // Happens on: getDataFromTree & next.js ssr
      client = apolloClient
    } else {
      // Happens on: next.js csr
      // client = initApolloClient(apolloState, undefined);
      client = initApolloClient(apolloState, {})
    }
    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    )
  }
  // Set the correct displayName in development
  if (process.env.NODE_ENV !== "production") {
    const displayName =
      PageComponent.displayName || PageComponent.name || "Component"
    WithApollo.displayName = `withApollo(${displayName})`
  }
  if (ssr || PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async (ctx) => {
      const { AppTree } = ctx
      // Initialize ApolloClient, add it to the ctx object so
      // we can use it in `PageComponent.getInitialProp`.
      const apolloClient = (ctx.apolloClient = initApolloClient(
        null,
        await getHeaders(ctx)
      ))
      // Run wrapped getInitialProps methods
      let pageProps = {}
      if (PageComponent.getInitialProps) {
        pageProps = await PageComponent.getInitialProps(ctx)
      }
      // Only on the server:
      if (typeof window === "undefined") {
        // When redirecting, the response is finished.
        // No point in continuing to render
        if (ctx.res && ctx.res.finished) {
          return pageProps
        }
        // Only if ssr is enabled
        if (ssr) {
          try {
            // Run all GraphQL queries
            const { getDataFromTree } = await import("@apollo/react-ssr")
            await getDataFromTree(
              <AppTree
                pageProps={{
                  ...pageProps,
                  apolloClient,
                }}
              />
            )
          } catch (error) {
            // Prevent Apollo Client GraphQL errors from crashing SSR.
            // Handle them in components via the data.error prop:
            // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
            console.error("Error while running `getDataFromTree`", error)
          }
          // getDataFromTree does not call componentWillUnmount
          // head side effect therefore need to be cleared manually
          Head.rewind()
        }
      }
      // Extract query data from the Apollo store
      const apolloState = apolloClient.cache.extract()
      return {
        ...pageProps,
        apolloState,
      }
    }
  }
  return WithApollo
}
```

Note the usage of `getHeaders` where we are making a request to Auth0 to retrieve the accessToken.

We are going to make use of this HOC inside our root page.

Open `pages/index.js` and update the export by adding `withApollo`:

```js
...
import { useFetchUser } from "../lib/user";
import { withApollo } from "../lib/withApollo";

...
export default withApollo()(IndexPage);
```

That's it. Our Next.js app is now configured with Apollo Client to talk to Hasura APIs.
