import { makeAugmentedSchema } from "@neo4j/graphql"
import { typeDefs } from "../type-definitions"
import { resolvers } from "../resolvers"

export const augmentedSchema = makeAugmentedSchema({
  typeDefs,
  resolvers,
  debug: true,
})
