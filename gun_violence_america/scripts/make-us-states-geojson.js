const fs = require("fs");
const { feature } = require("topojson-client");
const us = require("us-atlas/states-10m.json"); // TopoJSON
const geo = feature(us, us.objects.states); // -> GeoJSON FeatureCollection
fs.writeFileSync("src/app/data/us-states.geojson", JSON.stringify(geo));
console.log("Wrote src/app/data/us-states.geojson");
