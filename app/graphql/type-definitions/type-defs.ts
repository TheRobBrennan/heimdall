import fs from "fs"
import path from "path"

export const typeDefs = fs
  .readFileSync(path.resolve(`graphql/schema.graphql`))
  .toString("utf-8")
