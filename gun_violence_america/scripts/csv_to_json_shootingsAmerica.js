// "node scripts csv_to_json.js src/app/data/school-shooting-incident.csv"
// load node utilities + papaparse
const fs = require("fs"); // to read and write files
const path = require("path");
const Papa = require("papaparse");

// declare CLI args for CSV file only (input)
const inPath = process.argv[2];

// error warning
if (!inPath) {
  console.error("Missing filepath argument for CSV data.");
  process.exit(1);
}

// generate directory and name for output JSON file and base
const outDir = path.join("src", "app", "data");
const baseName = path.parse(inPath).name; // get CSV's filename without 'csv' extension
const outPath = path.join(outDir, `${baseName}-${Date.now()}.json`); // create ouput filename using baseName and current date

// create output folder if it doesn't already exist
fs.mkdirSync(outDir, { recursive: true });

// papa stream parser for node
const papaStream = Papa.parse(Papa.NODE_STREAM_INPUT, {
  header: true, // first row is column headers so each row becomes an object {header: value}
  skipEmptyLines: true, // ignore blank rows
  dynamicTyping: true, // convert numeric/boolean strings to numbers/booleans
  transformHeader: (h) =>
    h // standardize header format
      .trim()
      .toLowerCase(),
});

// create streams to read/write CSV/JSON files piece by piece
const rs = fs.createReadStream(inPath, "utf8");
const ws = fs.createWriteStream(outPath, "utf8");

let first = true;
let rowCount = 0;

ws.write("[\n");

papaStream.on("data", (row) => {
  if (!first) ws.write(",\n");
  ws.write(JSON.stringify(row));
  first = false;
  rowCount++;
});

papaStream.on("end", () => {
  ws.write("\n]\n");
  ws.end(() => {
    const stable = path.join(outDir, "shootingsAmerica.json"); // fixed name
    fs.copyFileSync(outPath, stable); // overwrite stable copy
    console.log(`Wrote ${outPath} (${rowCount} rows)`);
    console.log(`Updated ${stable}`);
  });
});

papaStream.on("error", (e) => {
  console.error("Parse error:", e);
  process.exit(1);
});

rs.on("error", (e) => {
  console.error("Read error:", e);
  process.exit(1);
});

rs.pipe(papaStream);
