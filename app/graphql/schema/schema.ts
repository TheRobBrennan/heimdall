import { makeAugmentedSchema } from "@neo4j/graphql"
import { typeDefs } from "../type-definitions/type-defs"
import { resolvers } from "../resolvers/resolvers"

export const augmentedSchema = makeAugmentedSchema({
  typeDefs,
  resolvers,
  debug: true,
})
