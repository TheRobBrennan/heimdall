import { ApolloServer } from "apollo-server-micro"
import { driver } from "../../neo4j/db"
import { augmentedSchema } from "../../apollo/schema"

// Use Vercel system environment variables to determine if we should allow introspection and the GraphIQL playground
// See https://vercel.com/docs/environment-variables#system-environment-variables for more details
export const RUNNING_ON_VERCEL = !!process.env.VERCEL_ENV

// If we are deployed to Vercel, disable introspection and the GraphIQL playground for our GraphQL endpoint
/* istanbul ignore next */
export const ALLOW_GRAPHQL_INTROSPECTION = !RUNNING_ON_VERCEL ? true : false
/* istanbul ignore next */
export const ALLOW_GRAPHQL_PLAYGROUND = !RUNNING_ON_VERCEL ? true : false

export const neo4jDriverInstance = driver()

export const apolloServer = new ApolloServer({
  schema: augmentedSchema.schema,
  context: ({ req }) => ({ req, driver: neo4jDriverInstance }),

  // Disable GraphIQL in production by setting these to false
  introspection: ALLOW_GRAPHQL_INTROSPECTION,
  playground: ALLOW_GRAPHQL_PLAYGROUND,
})

// We need to disable the bodyParser so we can consume our API endpoint as a stream
// https://nextjs.org/docs/api-routes/api-middlewares#custom-config
export const config = {
  api: {
    bodyParser: false,
  },
}

export default apolloServer.createHandler({ path: "/api/graphql" })
