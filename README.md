# graphTransitVancouver
Graph database and API for Greater Vancouver Transit

This project has as goal retrieve informations from Translink metro vancouver and create a graph database, based on Neo4j.

We created a list of geo points (lat/long) and for each one, we are retrieving a list of bus stops, within a 2000 meter of radius.

Once we have these points stored as Nodes, we are creating a route (bus) related to these bus stops.

Once we have these informations, bus stop and route stored, we are going to create the relationship between them.

Translink API:

Get the bus stops
api.translink.ca/rttiapi/v1/stops?apikey=YOU_KEY&lat=49.260635&long=-122.891389  

Get details, such as bus direction:
api.translink.ca/rttiapi/v1/buses?stopNo=53209&apikey=YOU_KEY&routeNo=097
