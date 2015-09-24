#!/bin/bash

DATA_PATH="$APP_BASE_PATH/import/data/"

SOURCE_HOST="localhost"

SOURCE_PORT="7474"

AUTH_KEY="bmVvNGo6MzE0ODExcmU="

AUTH_METHOD="Basic"

STOPS_CSV="$DATA_PATH/stops.csv"

ROUTES_CSV="$DATA_PATH/routes.csv"

echo "Creating file [$STOPS_CSV] from [$SOURCE_HOST:$SOURCE_PORT]"

curl -H "Authorization: $AUTH_METHOD $AUTH_KEY" -H accept:application/json -H content-type:application/json -d '{"statements":[{"statement":"MATCH (s:Stop) RETURN s.name as name, s.city as city, s.latitude as latitude, s.onStreet as onStreet, s.stopNo as stopNo, s.wheelchairAccess as wheelchairAccess, s.atStreet as atStreet, s.longitude as longitude, s.Routes as Routes, s.bayNo as bayNo, s.distance as distance"}]}' "http://$SOURCE_HOST:$SOURCE_PORT/db/data/transaction/commit" | jq -r '(.results[0]) | .columns,.data[].row | @csv' | cat > $STOPS_CSV

echo "Creating file [$ROUTES_CSV] from [$SOURCE_HOST:$SOURCE_PORT]"

curl -H "Authorization: $AUTH_METHOD $AUTH_KEY" -H accept:application/json -H content-type:application/json      -d '{"statements":[{"statement":"MATCH (r:Route) RETURN r.routeNo as routeNo"}]}' "http://$SOURCE_HOST:$SOURCE_PORT/db/data/transaction/commit" | jq -r '(.results[0]) | .columns,.data[].row | @csv' | cat > $ROUTES_CSV

echo "Creating node [Stop]"

echo "load csv from 'file:$STOPS_SCV' as line create (:Stop {name: line[0], city: line[1], latitude: line[2], onStreet: line[3], stopNo: line[4], wheelchairAccess: line[5], atStreet: line[6], longitude: line[7], Routes});" | $NEO4J_HOME/bin/neo4j-shell - >> process.log

echo "Creating node [Route]"

echo "load csv from 'file:$ROUTES_CSV' as line create (:Route {routeNo: line[0]});" | $NEO4J_HOME/bin/neo4j-shell - >> process.log

echo "removing [$STOPS_CSV]"

rm "$STOPS_CSV"

echo "removing [$ROUTE_CSV]"

rm "$ROUTE_CSV"


#load csv from 'file:/home/raeffray/routes.csv' as line
#> create (:Route {routeNo: line[0]});

## Create relationships routes and stops
#match (s:Stop), (r:Route) where s.Routes =~ ('.*'+ r.routeNo + '.*')
#create (r)-[rl:STOPS_AT]->(s)
#return rl;