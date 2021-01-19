#!/bin/bash

# Define our Neo4j variables
NEO4J_USER=neo4j
NEO4J_PASSWORD=letmein

# THANK YOU! Special shout-out to @marcellodesales on GitHub
# https://github.com/marcellodesales/neo4j-with-cypher-seed-docker/blob/master/wrapper.sh for such a great example script

# Log the info with the same format as NEO4J outputs
log_info() {
  # https://www.howtogeek.com/410442/how-to-display-the-date-and-time-in-the-linux-terminal-and-use-it-in-bash-scripts/
  printf '%s %s\n' "$(date -u +"%Y-%m-%d %H:%M:%S:%3N%z") INFO  Wrapper: $1"
  return
}

# Adapted from https://github.com/neo4j/docker-neo4j/issues/166#issuecomment-486890785
# Alpine is not supported anymore, so this is newer
# Refactoring: Marcello.deSales+github@gmail.com

# turn on bash's job control
# https://stackoverflow.com/questions/11821378/what-does-bashno-job-control-in-this-shell-mean/46829294#46829294
set -m

# Start the primary process and put it in the background
/docker-entrypoint.sh neo4j &

# Wait for Neo4j
log_info "Waiting for Neo4j to start..."
wget --quiet --tries=10 --waitretry=2 -O /dev/null http://localhost:7474

# Import data
log_info  "Loading and importing Cypher file(s)..."

for cypherFile in /var/lib/neo4j/import/*.cypher; do
    log_info "Processing ${cypherFile}..."
    contents=$(cat ${cypherFile})
    # cypher-shell -u ${NEO4J_USER} -p ${NEO4J_PASSWORD} -a bolt://localhost:7687 "${contents}"
    cat ${cypherFile} | cypher-shell -u ${NEO4J_USER} -p ${NEO4J_PASSWORD} -a bolt://0.0.0.0:7687 --format plain
done

log_info  "...finished loading data."

# now we bring the primary process back into the foreground
# and leave it there
fg %1