# 2021.01.28 GenUI lightning talk (~15 mins)

> Was thinking I could perhaps do a sneak peek/preview of the latest alpha Neo4j GraphQL lib - maybe with a quick 5-minute intro to graph databases and why Neo4j is so freakin' cool. Specifically, a look at my fun Heimdall project - [https://github.com/TheRobBrennan/heimdall](https://github.com/TheRobBrennan/heimdall)

## How might you shape your fifteen minutes?

### Idea #1

- (5 min) - Five-minute introduction to Neo4j and graph databases
- (7 min) - Seven-minute main course
- (3 min) - Three-minute encore/closing thoughts

### Idea #2

- Act I
  - Introduction
  - Set the stage
    - History
    - Background
  - What problems can we solve?
  - Many are trying...
    - TODO: Introduce other graph databases here
    - For real, though. Who gives a fuck about the also-rans?
  - We need a hero...
- Act II

  - Introducing Neo4j

    - Core concepts

      - Property graph model - [https://neo4j.com/developer/graph-database/#property-graph](https://neo4j.com/developer/graph-database/#property-graph) - What is a Graph Database? - [https://neo4j.com/developer/graph-database/#property-graph](https://neo4j.com/developer/graph-database/#property-graph) - Concepts: Relational to Graph - [https://neo4j.com/developer/graph-db-vs-rdbms/](https://neo4j.com/developer/graph-db-vs-rdbms/)

      ![https://dist.neo4j.com/wp-content/uploads/relational_model.jpg](https://dist.neo4j.com/wp-content/uploads/relational_model.jpg)

      > Unlike other database management systems, relationships are of equal importance in the graph data model to the data itself. This means we are not required to infer connections between entities using special properties such as foreign keys or out-of-band processing like map-reduce.
      >
      > By assembling nodes and relationships into connected structures, graph databases enable us to build simple and sophisticated models that map closely to our problem domain. The data stays remarkably similar to its form in the real world - small, normalized, yet richly connected entities. This allows you to query and view your data from any imaginable point of interest, supporting many different use cases.
      >
      > Each node (entity or attribute) in the graph database model directly and physically contains a list of relationship records that represent the relationships to other nodes. These relationship records are organized by type and direction and may hold additional attributes. Whenever you run the equivalent of a JOIN operation, the graph database uses this list, directly accessing the connected nodes and eliminating the need for expensive search-and-match computations.
      >
      > This ability to pre-materialize relationships into the database structure allows Neo4j to provide performance of several orders of magnitude above others, especially for join-heavy queries, allowing users to leverage a minutes to milliseconds advantage.

      ![https://dist.neo4j.com/wp-content/uploads/relational_graph_model.jpg](https://dist.neo4j.com/wp-content/uploads/relational_graph_model.jpg)

      - Cypher Query Language - [https://neo4j.com/developer/cypher/](https://neo4j.com/developer/cypher/)
        - Let's compare SQL to Cypher
          - Example - Joining products with customers - [https://neo4j.com/developer/cypher/guide-sql-to-cypher/#\_joining_products_with_customers](https://neo4j.com/developer/cypher/guide-sql-to-cypher/#_joining_products_with_customers)
          - Example - Top selling employees - [https://neo4j.com/developer/cypher/guide-sql-to-cypher/#\_top_selling_employees](https://neo4j.com/developer/cypher/guide-sql-to-cypher/#_top_selling_employees)

- Act III

  - Heimdall - [https://github.com/TheRobBrennan/heimdall](https://github.com/TheRobBrennan/heimdall)
    - What are the key architectural pieces?
      - The GRANDstack
        - Next.js - [https://nextjs.org](https://nextjs.org)
          - Hybrid of static-site generation (SSG) and server-side rendering (SSR) for React
          - Serverless API functions that can run as discrete serverless functions
            - Can be written and combined in a variety of ways
              - Example - Node.js backend API function that may also invoke another serverless function written in Python...all in the same project
            - `@neo4j/graphql` - alpha release 3
        - Neo4j - [https://neo4j.com](https://neo4j.com)
        - Auth0 - [https://auth0.com](https://auth0.com)
          - User authentication and authorization
          - Take a peek at Auth0
    - What are some things that you can demo?
      - YouTube clip to pronounce "Heimdall"
      - Documentation for the project; including a guide to quickly get started with Auth0 with no familiarity of it whatsoever
    - DEMO
      - User must log in or sign up before accessing the app
        - Leveraging JWT authentication and (optional) roles from Auth0
        - Ability to quickly enable a variety of authentication methods (social, single sign-on, passwordless, integration with Azure AD, custom databases, and more)
        - Offload and manage distributed denial-of-service (DDoS), brute force authentication attempts, as well as see what users may have had their passwords comprised in known breaches, and more
      - Use of the GRANDstack in displaying sample data from our backend GraphQL API using our Dockerized Neo4j database
      - Additional features in Heimdall
        - Bundle analysis for both frontend and backend code
        - Testing
        - Code coverage
        - Example on creating a script that waits for Neo4j to load before automatically seeding the database
        - Locally running Neo4j Browser - [http://localhost:7474/browser/](http://localhost:7474/browser/)
        - GraphIQL IDE - [http://localhost:3000/api/graphql](http://localhost:3000/api/graphql)
        - Heimdall Next.js application - [http://localhost:3000/](http://localhost:3000/)

- Encore

- Roll the credits

  - Lead roles
    - Neo4j - [https://neo4j.com](https://neo4j.com)
    - The GRANDstack - [https://grandstack.io](https://grandstack.io)
  - Supporting roles

    - Neo4j Desktop - [https://neo4j.com/download/](https://neo4j.com/download/)
      - Neo4j Browser - [https://neo4j.com/developer/neo4j-browser/](https://neo4j.com/developer/neo4j-browser/)
    - Neo4j Bloom - [https://neo4j.com/product/bloom/](https://neo4j.com/product/bloom/)
    - Neo4j Sandbox - [https://sandbox.neo4j.com/](https://sandbox.neo4j.com/)
    - Neo4j Aura - [https://neo4j.com/cloud/aura/](https://neo4j.com/cloud/aura/)
      - Neo4j Aura FREE launching soon
        ![https://dist.neo4j.com/wp-content/uploads/20201017104944/aura_pro_art_437x370.png](https://dist.neo4j.com/wp-content/uploads/20201017104944/aura_pro_art_437x370.png)
        - **ACTION ITEM:** Sign up for the [wait list](https://neo4j.com/cloud/aura/free/)

  - How'd I do? Let's ask these guys.

    - VIDEO: [https://www.youtube.com/watch?v=NpYEJx7PkWE](https://www.youtube.com/watch?v=NpYEJx7PkWE)

    > Waldorf: That was wonderful!
    >
    > Statler: Bravo!
    >
    > Waldorf: I loved it!
    >
    > Statler: Ah, it was great!
    >
    > Waldorf: Well, it was pretty good.
    >
    > Statler: Well, it wasn't bad...
    >
    > Waldorf: Uh, there were parts of it that weren't very good though.
    >
    > Statler: It could have been a lot better.
    >
    > Waldorf: I didn't really like it.
    >
    > Statler: It was pretty terrible.
    >
    > Waldorf: It was bad.
    >
    > Statler: It was awful!
    >
    > Waldorf: It was terrible!
    >
    > Statler: Take 'em away!
    >
    > Waldorf: Bah, boo!
    >
    > Statler: Boo!

    Source [https://www.youtube.com/watch?v=NpYEJx7PkWE](https://www.youtube.com/watch?v=NpYEJx7PkWE)

- Closing time - [https://youtu.be/xGytDsqkQY8?t=17](https://youtu.be/xGytDsqkQY8?t=17)
