//import { ResponsiveLine } from "@nivo/line";
//import Papa from "papaparse";
import rows from "./data/shootingsAmerica.json";

export default function Home() {
  const total = rows.length;
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">Americana</h1>
      <p className="text-sm text-neutral-600">Rows loaded: {total}</p>
      {/* later: pass processed data to a client chart component */}
    </main>
  );
}
