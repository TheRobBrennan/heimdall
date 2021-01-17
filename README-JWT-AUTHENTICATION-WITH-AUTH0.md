# Welcome

One of the main focal points of this project is to explore authorization using a JWT token for `@auth` directives in the GraphQL API built on top of a [Neo4j Database](https://neo4j.com) backend.

I am a fan of using a free authentication provider - [Auth0](https://auth0.com) - for user authentication.

This guide aims to take you from creating an account on Auth0 to implementing a fully functional authentication solution that will handle the intricacies of JWT tokens for you.

## Getting started

Although the purpose of this guide is to give you the shortest possible path to creating your Auth0 authentication solution, I would encourage you to read the reference guide at `./app/__reference__/AUTH0-NEXTJS-HASURA.md` - offering a more verbose explanation of the various settings below as well as screenshots in a sample integration. Our GraphQL API takes the place of Hasura, but it should help shine some light on what we're accomplishing in the setup below.

You will need to create:

- An Auth0 account with

  - An Auth0 tenant
  - An Auth0 single page application with appropriate callback URLs
    - `Allowed Callback URLs` - `http://localhost:3000/api/callback`
    - `Allowed Logout URLs` - `http://localhost:3000/, http://localhost:3000/api/callback, http://localhost:3000/api/logout`
    - `Allowed Web Origins` - `http://localhost:3000/, http://localhost:3000/api/callback`
  - An Auth0 API
    - The API audience will be `https://heimdall.io/demo`
  - Auth0 rules for `heimdall-jwt-claim` and `upsert-user`

    - Be sure to update your Auth0 `heimdall-jwt-claim` rule to use the namespace `https://heimdall.io/jwt/claims`

    ```js
    function (user, context, callback) {
      const namespace = "https://heimdall.io/jwt/claims";

      context.accessToken[namespace] =
        {
          'x-heimdall-default-role': 'user',
          // do some custom logic to decide allowed roles
          'x-heimdall-allowed-roles': ['user'],
          'x-heimdall-user-id': user.user_id
        };
      callback(null, user, context);
    }
    ```

    - Be sure to update your Auth0 `upsert-user` rule to point to your GraphQL API and to use your admin_secret defined as `HEIMDALL_GRAPHQL_ADMIN_SECRET`

    ```js
    function (user, context, callback) {
      const userId = user.user_id;
      const nickname = user.nickname;

      // Modify with your admin secret and URL to the application
      const admin_secret = "letmein";
      const url = "https://heimdall-kappa.vercel.app/api/graphql";

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
          headers: {'content-type' : 'application/json', 'x-heimdall-admin-secret': admin_secret},
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

- Be sure you have defined environment variables in `.env` and on your production environment as follows:
  - `DOMAIN` needs to be where Auth0 will redirect you `http://localhost:3000`
  - `AUTH0_AUDIENCE` needs to be updated with your defined audience (`https://heimdall.io/demo` if you follow the steps above)
  - `AUTH0_CLIENT_ID` - `ovgeVQWyxl8Bs4EPpbBE6cbOL2xHZkFf`
  - `AUTH0_CLIENT_SECRET` - `VTRIVSpLhO9zd1zF6oURg11kFqwIZB1JVwyeeDLxj_WhgvHiQIUK7GxEnXH8JiFb`
  - `AUTH0_DOMAIN` - `heimdall.us.auth0.com`
  - `REDIRECT_URI` - `http://localhost:3000/api/callback`
  - `POST_LOGOUT_REDIRECT_URI` - `http://localhost:3000/`
  - `SESSION_COOKIE_SECRET` - `BXyv4qDtBKYxJtLopfY7nj75sJg3p2Ka`
  - Additional variables you may want to consider definining and implementing
    - `HEIMDALL_GRAPHQL_ADMIN_SECRET` - Useful to secure posts coming from Auth0 to your API endpoint to prevent spoofing/abuse of services like creating accounts, etc.
