"use client";
import { ResponsiveLine } from "@nivo/line";

export default function IncidentsLine({ series }) {
  return (
    <div className="h-180">
      <ResponsiveLine
        data={series}
        margin={{ top: 40, right: 40, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{ type: "linear", min: "auto", max: "auto" }}
        lineWidth={2}
        pointSize={12}
        enableArea
        areaOpacity={0.08}
        colors={["#1b5e20"]}
        pointColor="#b91c1c"
        pointBorderWidth={2}
        pointBorderColor="#000"
        useMesh
        enableSlices="x"
        theme={{
          text: {
            fontFamily: "ui-sans-serif, system-ui",
            fontSize: 14,
            fill: "#111",
          },
          grid: {
            line: { stroke: "#FFC0CB", strokeWidth: 2, strokeDasharray: "4 8" },
          },
        }}
      />
    </div>
  );
}
