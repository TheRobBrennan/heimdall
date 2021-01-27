// Describe our GraphQL schema with type definitions
export const typeDefs = `
  type Business {
    businessId: ID!
    name: String!
    address: String
    city: String
    state: String
    reviews: [Review] @relationship(type: "REVIEWS", direction: "IN")
    categories: [Category] @relationship(type: "IN_CATEGORY", direction: "OUT")
    createdAt: DateTime @autogenerate(operations: ["create"])
    createdBy: String
    updatedAt: DateTime @autogenerate(operations: ["update"])
    updatedBy: String
  }

  type Category {
    name: ID!
    businesses: [Business] @relationship(type: "IN_CATEGORY", direction: "IN")
    createdAt: DateTime @autogenerate(operations: ["create"])
    createdBy: String
    updatedAt: DateTime @autogenerate(operations: ["update"])
    updatedBy: String
  }

  type RatingCount {
    stars: Float!
    count: Int!
  }

  type User {
    userId: ID! @autogenerate
    name: String
    reviews: [Review] @relationship(type: "WROTE", direction: "OUT")
    sub: String
    createdAt: DateTime @autogenerate(operations: ["create"])
    createdBy: String
    updatedAt: DateTime @autogenerate(operations: ["update"])
    updatedBy: String
  }

  type Review {
    reviewId: ID!
    stars: Float
    text: String
    date: Date
    business: Business @relationship(type: "REVIEWS", direction: "OUT")
    user: User @relationship(type: "WROTE", direction: "IN")
    createdAt: DateTime @autogenerate(operations: ["create"])
    createdBy: String
    updatedAt: DateTime @autogenerate(operations: ["update"])
    updatedBy: String
  }

  type Query {
    """
    A sample query to verify that our GraphQL server is online.

    It returns a friendly greeting with the current timestamp.
    """
    hello: String!,

    """
    A sample query to verify that our GraphQL server is online.

    It processes an authorized GraphQL request and returns a response.
    """
    helloAuth: String!,

    """
    A sample query to return details for the authenticated user currently logged in to our system
    """
    me: User
      @cypher(
        statement: """
        MATCH (u:User {sub: $jwt.sub})
        RETURN u
        """
    ),

    """
    A sample query to return the total number of users in our system
    """
    userCount: Int! @cypher(statement: "MATCH (u:User) RETURN COUNT(u)")

    """
    A sample query to return the total number of stars awarded in reviews for our system
    """
    ratingsCount: [RatingCount]
    @cypher(
      statement: "MATCH (r:Review) WITH r.stars AS stars, COUNT(*) AS count ORDER BY stars RETURN {stars: stars, count: count}"
    )
  }
`
