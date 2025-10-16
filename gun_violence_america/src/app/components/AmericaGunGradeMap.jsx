"use client";

import dynamic from "next/dynamic";
const Chart = dynamic(
  () => import("react-google-charts").then((m) => m.Chart),
  { ssr: false }
);

// Convert rows -> ['State', 'Rank'] table.
// GeoChart for US expects state IDs like 'US-CA', 'US-NY', ...
const NAME_TO_US = {
  Alabama: "US-AL",
  Alaska: "US-AK",
  Arizona: "US-AZ",
  Arkansas: "US-AR",
  California: "US-CA",
  Colorado: "US-CO",
  Connecticut: "US-CT",
  Delaware: "US-DE",
  "District of Columbia": "US-DC",
  Florida: "US-FL",
  Georgia: "US-GA",
  Hawaii: "US-HI",
  Idaho: "US-ID",
  Illinois: "US-IL",
  Indiana: "US-IN",
  Iowa: "US-IA",
  Kansas: "US-KS",
  Kentucky: "US-KY",
  Louisiana: "US-LA",
  Maine: "US-ME",
  Maryland: "US-MD",
  Massachusetts: "US-MA",
  Michigan: "US-MI",
  Minnesota: "US-MN",
  Mississippi: "US-MS",
  Missouri: "US-MO",
  Montana: "US-MT",
  Nebraska: "US-NE",
  Nevada: "US-NV",
  "New Hampshire": "US-NH",
  "New Jersey": "US-NJ",
  "New Mexico": "US-NM",
  "New York": "US-NY",
  "North Carolina": "US-NC",
  "North Dakota": "US-ND",
  Ohio: "US-OH",
  Oklahoma: "US-OK",
  Oregon: "US-OR",
  Pennsylvania: "US-PA",
  "Rhode Island": "US-RI",
  "South Carolina": "US-SC",
  "South Dakota": "US-SD",
  Tennessee: "US-TN",
  Texas: "US-TX",
  Utah: "US-UT",
  Vermont: "US-VT",
  Virginia: "US-VA",
  Washington: "US-WA",
  "West Virginia": "US-WV",
  Wisconsin: "US-WI",
  Wyoming: "US-WY",
};

export default function UsaHeatMapGoogle({ rows, height = 520 }) {
  const table = [
    ["State", "Gun death rate rank"],
    ...(rows || [])
      .map((r) => {
        const id = NAME_TO_US[r.state];
        const val = Number(r.gun_death_rate_rank);
        return id && Number.isFinite(val) ? [id, val] : null;
      })
      .filter(Boolean),
  ];

  const options = {
    region: "US",
    resolution: "provinces",
    colorAxis: { colors: ["#fee0d2", "#a50f15"] },
    datalessRegionColor: "#eee",
    backgroundColor: "transparent",
    legend: "none",
    tooltip: { isHtml: true },
  };

  return (
    <div style={{ height }}>
      <Chart
        chartType="GeoChart"
        data={table}
        options={options}
        width="100%"
        height={`${height}px`}
      />
    </div>
  );
}
