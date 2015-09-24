#!/bin/bash

DATA_PATH="$APP_BASE_PATH/import/data/"

ITINERARY_SCV="itinerary.csv"

LINE_POINTS_SCV="itineraryLinePoints.csv"

echo "Creating file $DATA_PATH$ITINERARY_SCV"

/usr/local/bin/node $APP_BASE_PATH/batch/inspecting-lines.js > "$DATA_PATH$ITINERARY_SCV"

echo "Creating file $DATA_PATH$LINE_POINTS_SCV"

/usr/local/bin/node $APP_BASE_PATH/batch/inspecting-lines.js --processLines > "$DATA_PATH$LINE_POINTS_SCV"

echo "Creating node Itinerary"

echo "load csv from 'file:$DATA_PATH$ITINERARY_SCV' as line create (:Itinerary {routeNo: line[0], version: line[1], fromDate: line[2], toDate: line[3]});" | $NEO4J_HOME/bin/neo4j-shell - >> process.log

echo "Creating node ItineraryLinePoint"

echo "load csv from 'file:$DATA_PATH$LINE_POINTS_SCV' as line create (:ItineraryLinePoint {routeNo: line[0], lineNumber: line[1], sequenceNumber: line[2], latitude: line[3], longitude: line[4]});" | $NEO4J_HOME/bin/neo4j-shell - >> process.log

echo "removing $DATA_PATH$ITINERARY_SCV"

rm "$DATA_PATH$ITINERARY_SCV"

echo "removing $DATA_PATH$LINE_POINTS_SCV"

rm "$DATA_PATH$LINE_POINTS_SCV"