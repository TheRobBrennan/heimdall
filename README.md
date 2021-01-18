# Heimdall

This project is a continuation of my [GRANDstack Starter for Next.js with TypeScript](https://github.com/TheRobBrennan/nextjs-grandstack-starter-typescript) project.

Heimdall was one of my favorite characters in the Thor movies - known for his presence guarding the rainbow bridge leading into the entry of Asgard (see [https://www.britannica.com/topic/Heimdall](https://www.britannica.com/topic/Heimdall))

![https://64.media.tumblr.com/8e75c81012c514cdf35a4c4698c94117/ca0f3549065210e0-d5/s640x960/04108e728a06ce95161e5680239c613f84bc11bb.png](https://64.media.tumblr.com/8e75c81012c514cdf35a4c4698c94117/ca0f3549065210e0-d5/s640x960/04108e728a06ce95161e5680239c613f84bc11bb.png)

The goal of this project is to explore using the new alpha release of the [@neo4j/graphql](@neo4j/graphql) library within a [GRANDstack](https://grandstack.io) ([GraphQL](https://graphql.org), [React](https://reactjs.org), [Apollo](https://www.apollographql.com), [Neo4j Database](https://neo4j.com)) application.

Specifically, the main focus will be exploring authorization using [Auth0](https://auth0.com) for user authentication - using the JWT token for `@auth` directives in the GraphQL API that will be built on top of a [Neo4j Database](https://neo4j.com) backend.

## DEMO

![app/__screenshots__/vercel-demo.png](app/__screenshots__/vercel-demo.png)

A [demo](https://heimdall-kappa.vercel.app) application has been deployed using a free [Neo4j Sandbox](https://sandbox.neo4j.com) as the backend database at [https://heimdall-kappa.vercel.app](https://heimdall-kappa.vercel.app)

Please note that these sandboxes do not last forever - ten (10) days at most with active renewal and upkeep.

TL:DR If the demo app is broken, that's why. You can run this locally to your heart's content. 🤣

## Getting started

To run this application as intended, you will need to:

- Create a free Auth0 account to use as an authentication provider for JWT tokens
- Build and run the Dockerized project
- Seed your Neo4j database with sample data

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
AUTH0_AUDIENCE=https://heimdall.io/demo

# Auth0 Application
AUTH0_DOMAIN=<YOUR-AUTH0-TENANT>.us.auth0.com
AUTH0_DOMAIN_KEYS=https://<YOUR-AUTH0-TENANT>.us.auth0.com/.well-known/jwks.json
AUTH0_CLIENT_ID=<YOUR-AUTH0-CLIENT-ID>
AUTH0_CLIENT_SECRET=<YOUR-AUTH0-CLIENT-SECRET>
REDIRECT_URI=http://localhost:3000/api/callback
POST_LOGOUT_REDIRECT_URI=http://localhost:3000/
SESSION_COOKIE_SECRET=BXyv4qDtBKYxJtLopfY7nj75sJg3p2Ka

# Neo4j v3.5.x / v4.x.x [DOCKER]
NEO4J_URI=bolt://neo4j:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=letmein
# ---------------------------------------------------------------------------
```

Once you have created a `app/.env` file, you can run the project with a single command to build the Docker services defined in `./docker-compose.yml` and start your application:

```sh
# Run the project using Neo4j v3.5.x
$ npm run dev

# ALTERNATIVE: Run the project using Neo4j v4.x.x
$ npm run dev:v4
```

You should be able to access the following URLs:

- [http://localhost:3000](http://localhost:3000) - The frontend for our Next.js application
- [http://localhost:3000/api/graphql](http://localhost:3000/api/graphql) - The GraphIQL explorer for our backend Next.js API which will be a serverless GraphQL function on Vercel
- [http://localhost:3000/api/ping](http://localhost:3000/api/ping) - A sample API route that will be a serverless function on Vercel
- [http://localhost:7474/browser/](http://localhost:7474/browser/) - This is the Neo4j Browser application that you can use to explore your Neo4j database - as well as run Cypher commands to seed your database with example data. You can log in with `neo4j` as the user, and `letmein` as the password

If you have configured [Auth0](https://auth0.com) correctly, you should be prompted to sign in or create an account for your application when you visit [http://localhost:3000](http://localhost:3000)

![app/__screenshots__/nextjs-web-default-page-unauthenticated-user.png](app/__screenshots__/nextjs-web-default-page-unauthenticated-user.png)

Once you have authenticated through [Auth0](https://auth0.com), you will see the default page for the application:

![app/__screenshots__/nextjs-web-default-page-authenticated-user.png](app/__screenshots__/nextjs-web-default-page-authenticated-user.png)

### Seed your Neo4j database with sample data

Once your Dockerized project is running, you can navigate to the [Neo4j Browser](https://neo4j.com/developer/neo4j-browser/) at [http://localhost:7474/browser/](http://localhost:7474/browser/).

Open up `./app/neo4j/__seed__/db.cypher` so you can copy and paste the example Cypher statements into the Cypher window and press `play` to seed your database with example data.

#### EXAMPLE: Query using GraphIQL

If you open [http://localhost:3000/api/graphql](http://localhost:3000/api/graphql), you should see the GraphIQL IDE.

Try running the following query:

```gql
{
  hello
}
```

It should respond with something like:

![app/__screenshots__/graphiql-query-example-hello.png](app/__screenshots__/graphiql-query-example-hello.png)

If you add valid JWT token to `{"Authorization": "Bearer <your-JWT-token>"}` in the `HTTP Headers` section for the above query:

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
