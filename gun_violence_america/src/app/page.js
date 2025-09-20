//import { ResponsiveLine } from "@nivo/line";
//import Papa from "papaparse";
import rows from "./data/shootingsAmerica.json";
import IncidentsLine from "./components/ChartClient";

// helper: count incidents per year and shape for Nivo
function toNivoSeries(rows) {
  const incidentCount = new Map();
  const cutOffYear = 2000;

  rows.forEach((row) => {
    const yr = row.year || new Date(row.date).getFullYear();
    if (yr && yr >= cutOffYear) {
      if (!incidentCount.has(yr)) {
        incidentCount.set(yr, 1); //check if year is there; if not init count to 0
      } else {
        incidentCount.set(yr, incidentCount.get(yr) + 1); // if not, add to current count of yr
      }
    }
  });

  const data = [...incidentCount.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([yr, count]) => {
      return {
        x: String(yr),
        y: count,
      };
    });

  return [{ id: "Incidents", data }];
}

export default function Page() {
  const series = toNivoSeries(rows);
  return (
    <main className="p-6 max-w-9xl mx-auto">
      <h1 className="text-2xl font-semibold mb-2">Americana</h1>
      <p className="text-sm text-neutral-600 mb-6">
        A visual record of school shootings in the U.S.
      </p>
      <IncidentsLine series={series} />
    </main>
  );
}
