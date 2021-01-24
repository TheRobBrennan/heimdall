# Heimdall

This project is a continuation of my [GRANDstack Starter for Next.js with TypeScript](https://github.com/TheRobBrennan/nextjs-grandstack-starter-typescript) project:

![app/__screenshots__/nextjs-web-default-page-authenticated-user.png](app/__screenshots__/nextjs-web-default-page-authenticated-user.png)

Heimdall was one of my favorite characters in the Thor movies - known for his presence guarding the rainbow bridge leading into the entry of Asgard (see [https://www.britannica.com/topic/Heimdall](https://www.britannica.com/topic/Heimdall))

![https://64.media.tumblr.com/8e75c81012c514cdf35a4c4698c94117/ca0f3549065210e0-d5/s640x960/04108e728a06ce95161e5680239c613f84bc11bb.png](https://64.media.tumblr.com/8e75c81012c514cdf35a4c4698c94117/ca0f3549065210e0-d5/s640x960/04108e728a06ce95161e5680239c613f84bc11bb.png)

[VIDEO: How To Say Heimdall](https://www.youtube.com/watch?v=FGy0k8J6ZWE)

The goal of this project is to explore using the new alpha release of the [@neo4j/graphql](@neo4j/graphql) library within a [GRANDstack](https://grandstack.io) ([GraphQL](https://graphql.org), [React](https://reactjs.org), [Apollo](https://www.apollographql.com), [Neo4j Database](https://neo4j.com)) application.

Specifically, the main focus will be exploring authorization using [Auth0](https://auth0.com) for user authentication - using the JWT token for `@auth` directives in the GraphQL API that will be built on top of a [Neo4j Database](https://neo4j.com) backend.

## Getting started

To run this application as intended, you will need to:

- Create a free Auth0 account to use as an authentication provider for JWT tokens
- Build and run the Dockerized project

### Create a free Auth0 account to use as an authentication provider for JWT tokens

Even if you have never configured or even heard of [Auth0](https://auth0.com), have no fear. The guide at `./README-JWT-AUTHENTICATION-WITH-AUTH0.md` offers a short-and-sweet set of steps to get you up and running with the minimal setup you need to have this project working locally.

### Build and run the Dockerized project

If you would like to have your [Next.js](https://nextjs.org) application and [Neo4j Database](https://neo4j.com) running in a [Docker](https://www.docker.com) environment, you can quickly build, start, and stop versions of [Neo4j Database](https://neo4j.com) to your heart's content!

To run this example, all you need to have installed on your system is [Docker](https://www.docker.com) and `npm` installed on your development system.

If you do not have [Docker](https://www.docker.com) installed on your development system, go to freely available [Docker Desktop](https://www.docker.com/products/docker-desktop) and get that installed and configured on your development machine.

First, copy `app/.env.sample` to `app/.env` and update with your [Auth0](https://auth0.com) settings - identified as `<YOUR-AUTH0-blah>`. The other settings can remain as is unless you would like to use your own.

```sh
#
# ---------------------------------------------------------------------------
# EXAMPLE app/.env
# ---------------------------------------------------------------------------
# Analytics
GOOGLE_ANALYTICS_TRACKING_ID=UA-156456153-7

# Auth0 API
## See ./README-JWT-AUTHENTICATION-WITH-AUTH0.md for more on AUTH0_AUDIENCE
AUTH0_AUDIENCE=https://heimdall.io/demo

# Auth0 Application
AUTH0_DOMAIN=<YOUR-AUTH0-TENANT>.us.auth0.com
AUTH0_DOMAIN_KEYS=https://<YOUR-AUTH0-TENANT>.us.auth0.com/.well-known/jwks.json
AUTH0_CLIENT_ID=<YOUR-AUTH0-CLIENT-ID>
AUTH0_CLIENT_SECRET=<YOUR-AUTH0-CLIENT-SECRET>
REDIRECT_URI=http://localhost:3000/api/callback
POST_LOGOUT_REDIRECT_URI=http://localhost:3000/
SESSION_COOKIE_SECRET=BXyv4qDtBKYxJtLopfY7nj75sJg3p2Ka

# Neo4j v4.x.x Community Edition [DOCKER]
NEO4J_URI=bolt://neo4j:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=letmein
# Additional settings for Neo4j v4.x.x Community and Enterprise Editions
#NEO4J_ENCRYPTED=true
#NEO4J_DATABASE=neo4j
# ---------------------------------------------------------------------------
```

Once you have created a `app/.env` file, you can run the project with a single command to build the Docker services defined in `./docker-compose.yml` and start your application with `npm run dev`

You should be able to access the following URLs:

- [http://localhost:3000](http://localhost:3000) - The frontend for our Next.js application
- [http://localhost:3000/api/graphql](http://localhost:3000/api/graphql) - The GraphIQL explorer for our backend Next.js API which will be a serverless GraphQL function on Vercel
- [http://localhost:3000/api/ping](http://localhost:3000/api/ping) - A sample API route that will be a serverless function on Vercel
- [http://localhost:7474/browser/](http://localhost:7474/browser/) - This is the Neo4j Browser application that you can use to explore your Neo4j database - as well as run Cypher commands to seed your database with example data. You can log in with `neo4j` as the user, and `letmein` as the password

If you have configured [Auth0](https://auth0.com) correctly, you should be prompted to sign in or create an account for your application when you visit [http://localhost:3000](http://localhost:3000)

![app/__screenshots__/nextjs-web-default-page-unauthenticated-user.png](app/__screenshots__/nextjs-web-default-page-unauthenticated-user.png)

Once you have authenticated through [Auth0](https://auth0.com), you will see the default page for the application:

![app/__screenshots__/nextjs-web-default-page-authenticated-user.png](app/__screenshots__/nextjs-web-default-page-authenticated-user.png)

#### [REFERENCE] Seed your Neo4j database with sample data

Your Dockerized project automatically creates a Neo4j database automatically populated with sample data for you.

If you would like to manually go through the process of creating sample data, please navigate to the [Neo4j Browser](https://neo4j.com/developer/neo4j-browser/) at [http://localhost:7474/browser/](http://localhost:7474/browser/)

Log in with the username `neo4j` and password `letmein`:

![app/__screenshots__/neo4j-browser-localhost-sign-in.png](app/__screenshots__/neo4j-browser-localhost-sign-in.png)

Open up `./neo4j/v4.x.x/__seed__/db.cypher` so you can copy and paste the example Cypher statements:

![app/__screenshots__/vscode-view-cypher-database-seed.png](app/__screenshots__/vscode-view-cypher-database-seed.png)

Before you copy the Cypher commands and paste them into the Cypher window to execute, be sure to run the `MATCH (n) DETACH DELETE (n)` Cypher command so you do not have duplicate data.

Once you've done that, copy and paste the example Cypher statements from the `db.cypher` file:

![app/__screenshots__/neo4j-browser-localhost-copy-cypher-text-00.png](app/__screenshots__/neo4j-browser-localhost-copy-cypher-text-00.png)

![app/__screenshots__/neo4j-browser-localhost-copy-cypher-text-01.png](app/__screenshots__/neo4j-browser-localhost-copy-cypher-text-01.png)

Press `play` to execute the commands:

![app/__screenshots__/neo4j-browser-localhost-copy-cypher-text-02.png](app/__screenshots__/neo4j-browser-localhost-copy-cypher-text-02.png)

Click on the database information icon in the left sidebar:

![app/__screenshots__/neo4j-browser-localhost-copy-cypher-text-03.png](app/__screenshots__/neo4j-browser-localhost-copy-cypher-text-03.png)

Click on a `Node Label` or `Relationship Type` to verify data has been created:

![app/__screenshots__/neo4j-browser-localhost-copy-cypher-text-04.png](app/__screenshots__/neo4j-browser-localhost-copy-cypher-text-04.png)

#### EXAMPLE: Query using GraphIQL

Try running the following query:

```gql
{
  hello
}
```

If you open [http://localhost:3000/api/graphql](http://localhost:3000/api/graphql), you should see the GraphIQL IDE.

Create your query on the left-hand side and then press `Play` to see the result.

It should look something like this:

![app/__screenshots__/graphiql-query-example-hello.png](app/__screenshots__/graphiql-query-example-hello.png)

If you add a valid JWT token to `{"Authorization": "Bearer <your-JWT-token>"}` in the `HTTP Headers` section (located just below your query):

```json
{
  "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InNOTnN1RWZmU0lxeTRrcmtrQ2t4SSJ9.eyJodHRwczovL2hlaW1kYWxsLmlvL2p3dC9jbGFpbXMiOnsieC1oZWltZGFsbC1kZWZhdWx0LXJvbGUiOiJ1c2VyIiwieC1oZWltZGFsbC1hbGxvd2VkLXJvbGVzIjpbInVzZXIiXSwieC1oZWltZGFsbC11c2VyLWlkIjoiZ29vZ2xlLW9hdXRoMnwxMTYwNTg2NjgzMDIyOTA4NjE4MTAifSwiaXNzIjoiaHR0cHM6Ly9oZWltZGFsbC1kZW1vLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDExNjA1ODY2ODMwMjI5MDg2MTgxMCIsImF1ZCI6WyJodHRwczovL2hlaW1kYWxsLmlvL2RlbW8iLCJodHRwczovL2hlaW1kYWxsLWRlbW8udXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTYxMDkzMzcxOSwiZXhwIjoxNjExMDIwMTE5LCJhenAiOiI2U25CUUw1WmQ3TjFvMHp5c3lmZnZhVUVGNXZoWUpFSCIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUifQ.M-bqaX98vRRcIB_u8Qzh-Fr5G7AhLzl5UUKe0gpMwvcJb9JmEGuBQjnin7dXUerqDA0SZ_XRll0IKasvemERpKxWGh5JyOzAYfNfsjJucocGkO_FvLbOJYL-lYk5ZL-SWT4l320K6Xut9izO-9953UeHjynCuG5CvdwGg5X3tZttUNCNTubMcvi_sfjKczSiQ4iea0blOJZt2grq_NfjknaRDR_pv-Srbvcl77GVzIlxX8yxyCvTVl1oF8iSjgXkSUbX68An7bzaI75co-5Bx741hREG5UgJCCH1B4klkHF-P5N1NAmMjAa_Mc7RjWBQ1yJ9P0Z2S7-nP4HscC6Uxw"
}
```

You should see a response like:

![app/__screenshots__/graphiql-query-example-hello-with-authorization-header.png](app/__screenshots__/graphiql-query-example-hello-with-authorization-header.png)

...along with Dockerized logs reporting what the JWT has been decoded as:

```sh
heimdall-nextjs | Decoded generic JWT without token verification: {
heimdall-nextjs |   "https://heimdall.io/jwt/claims": {
heimdall-nextjs |     "x-heimdall-default-role": "user",
heimdall-nextjs |     "x-heimdall-allowed-roles": [
heimdall-nextjs |       "user"
heimdall-nextjs |     ],
heimdall-nextjs |     "x-heimdall-user-id": "google-oauth2|116058668302290861810"
heimdall-nextjs |   },
heimdall-nextjs |   "iss": "https://heimdall-demo.us.auth0.com/",
heimdall-nextjs |   "sub": "google-oauth2|116058668302290861810",
heimdall-nextjs |   "aud": [
heimdall-nextjs |     "https://heimdall.io/demo",
heimdall-nextjs |     "https://heimdall-demo.us.auth0.com/userinfo"
heimdall-nextjs |   ],
heimdall-nextjs |   "iat": 1610933719,
heimdall-nextjs |   "exp": 1611020119,
heimdall-nextjs |   "azp": "6SnBQL5Zd7N1o0zysyffvaUEF5vhYJEH",
heimdall-nextjs |   "scope": "openid profile"
heimdall-nextjs | }
heimdall-nextjs | Decoded Auth0 JWT: {
heimdall-nextjs |   "https://heimdall.io/jwt/claims": {
heimdall-nextjs |     "x-heimdall-default-role": "user",
heimdall-nextjs |     "x-heimdall-allowed-roles": [
heimdall-nextjs |       "user"
heimdall-nextjs |     ],
heimdall-nextjs |     "x-heimdall-user-id": "google-oauth2|116058668302290861810"
heimdall-nextjs |   },
heimdall-nextjs |   "iss": "https://heimdall-demo.us.auth0.com/",
heimdall-nextjs |   "sub": "google-oauth2|116058668302290861810",
heimdall-nextjs |   "aud": [
heimdall-nextjs |     "https://heimdall.io/demo",
heimdall-nextjs |     "https://heimdall-demo.us.auth0.com/userinfo"
heimdall-nextjs |   ],
heimdall-nextjs |   "iat": 1610933719,
heimdall-nextjs |   "exp": 1611020119,
heimdall-nextjs |   "azp": "6SnBQL5Zd7N1o0zysyffvaUEF5vhYJEH",
heimdall-nextjs |   "scope": "openid profile"
heimdall-nextjs | }
```

#### EXAMPLE: Create users with GraphIQL

If you open [http://localhost:3000/api/graphql](http://localhost:3000/api/graphql), you should see the GraphIQL IDE.

Let's define - but not run - the following mutation:

```gql
mutation createNewAccounts($input: [UserCreateInput]!) {
  createUsers(input: $input) {
    userId
    name
    reviews {
      reviewId
    }
  }
}
```

We are giving our mutation a friendly name (`createNewAccounts` in this example). We want to dynamically supply data through a variable named `$input` to the `createUsers` mutation that was automatically generated by `@neo4j/graphql`

In the `Query Variables` section, let's define an `input` key which contains an array of one or more user objects (which must match the `UserCreateInput` type):

```json
{
  "input": [
    { "name": "Justa User" },
    { "name": "Another User" },
    { "name": "Anincredible User" }
  ]
}
```

Note that this `input` key is the `$input` variable that we are referencing in:

`mutation createNewAccounts($input: [UserCreateInput]!) { ... }`

Similarly, we are passing the `$input` variable as the `input` parameter of the `createUsers` mutation:

`createUsers(input:$input) { ... }`

![app/__screenshots__/graphiql-mutation-example-createUsers-00.png](app/__screenshots__/graphiql-mutation-example-createUsers-00.png)

We do not need to define `userId` in our array of user objects because the `userId` field has been marked with the `@autogenerate` directive in our type definitions at `app/apollo/type-defs.ts`:

```gql
type User {
  userId: ID! @autogenerate
  name: String
  reviews: [Review] @relationship(type: "WROTE", direction: "OUT")
}
```

Now that we have defined our `$input` variable let's run the mutation by pressing the `Play` button.

![app/__screenshots__/graphiql-mutation-example-createUsers-01.png](app/__screenshots__/graphiql-mutation-example-createUsers-01.png)

After running the mutation, we will see something like:

![app/__screenshots__/graphiql-mutation-example-createUsers-02.png](app/__screenshots__/graphiql-mutation-example-createUsers-02.png)

**OPTIONAL:** Let's navigate to the [Neo4j Browser](https://neo4j.com/developer/neo4j-browser/) at [http://localhost:7474/browser/](http://localhost:7474/browser/).

Click on the `User` label to view the data we just created with our mutation.

![app/__screenshots__/neo4j-browser-localhost-users.png](app/__screenshots__/neo4j-browser-localhost-users.png)
