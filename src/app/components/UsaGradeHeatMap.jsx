"use client";

import { useMemo, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { GUN_LAW } from "../data/data";

// USA TopoJSON (hosted). Works fine for a quick demo.
const GEO_URL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

/**
 * Grade palette (9 colors)
 */
const GRADE_CONFIG = {
  A: { score: 5, color: "#f6dada" },
  "A-": { score: 4.5, color: "#f6dada" },
  B: { score: 4, color: "#e8b3b3" },
  "B-": { score: 3.5, color: "#e8b3b3" },
  C: { score: 3, color: "#d98989" },
  "C-": { score: 2.5, color: "#d98989" },
  D: { score: 2, color: "#b94f4f" },
  "D-": { score: 1.5, color: "#b94f4f" },
  F: { score: 1, color: "#641211" },
};

/**
 * Death-rate palette (also 9 colors, light -> dark)
 * You can swap these, but keep length = 9 to match bins/legend.
 */
const DEATH_COLORS_9 = [
  "#f6dada",
  "#f2c8c8",
  "#eeb6b6",
  "#e8a0a0",
  "#df8888",
  "#d26f6f",
  "#c15555",
  "#a83a3a",
  "#641211",
];

// Fast lookups
const gradeToScore = (grade) => GRADE_CONFIG[grade]?.score;

const scoreToColor = (score) =>
  Object.values(GRADE_CONFIG).find((v) => v.score === score)?.color ??
  "#111111";

/**
 * Quantile bins: 9 buckets with ~equal number of states in each.
 * This tends to use the full palette and makes comparisons clearer.
 */
const buildQuantileBins = (values, steps = 9) => {
  const sorted = [...values].sort((a, b) => a - b);
  if (sorted.length === 0) return [];

  const edges = Array.from({ length: steps + 1 }, (_, i) => {
    const pos = (i * (sorted.length - 1)) / steps;
    const lo = Math.floor(pos);
    const hi = Math.ceil(pos);
    const t = pos - lo;
    return sorted[lo] * (1 - t) + sorted[hi] * t;
  });

  return Array.from({ length: steps }, (_, i) => ({
    from: edges[i],
    to: edges[i + 1],
  }));
};

const deathRateToColor = (value, bins) => {
  if (value == null || Number.isNaN(value) || bins.length === 0)
    return "#111111";

  const idx = bins.findIndex((b, i) =>
    i === bins.length - 1
      ? value >= b.from && value <= b.to
      : value >= b.from && value < b.to,
  );

  return DEATH_COLORS_9[Math.max(0, idx)] ?? "#111111";
};

/**
 * Reusable component.
 * Pass metric="grade" OR metric="deathRate"
 */
export function UsaHeatMap({ metric = "grade" }) {
  const [hover, setHover] = useState(null);

  // Precompute a fast lookup by state name (TopoJSON uses full state names)
  const byStateName = useMemo(() => {
    const m = new Map();
    for (const [name, obj] of Object.entries(GUN_LAW)) {
      m.set(name, { ...obj, score: gradeToScore(obj.grade) });
    }
    return m;
  }, []);

  // Bins for deathRate (computed once from the dataset)
  const deathBins = useMemo(() => {
    const vals = [];
    for (const v of byStateName.values()) {
      if (typeof v.deathRate === "number" && !Number.isNaN(v.deathRate)) {
        vals.push(v.deathRate);
      }
    }
    return buildQuantileBins(vals, 9);
  }, [byStateName]);

  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 900 }}>
      <ComposableMap
        projection="geoAlbersUsa"
        style={{ width: "100%", height: "auto" }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const name = geo.properties.name;
              const row = byStateName.get(name);

              const fill =
                metric === "deathRate"
                  ? deathRateToColor(row?.deathRate, deathBins)
                  : scoreToColor(row?.score);

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={fill}
                  stroke="#0c0c19"
                  strokeWidth={0.7}
                  onMouseEnter={() => {
                    setHover({
                      name,
                      grade: row?.grade ?? "No data",
                      deathRate: row?.deathRate,
                    });
                  }}
                  onMouseLeave={() => setHover(null)}
                  style={{
                    default: { outline: "none" },
                    hover: { outline: "none", filter: "brightness(0.95)" },
                    pressed: { outline: "none" },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>

      <div style={{ marginTop: 12 }}>
        {metric === "deathRate" ? (
          <DeathLegend bins={deathBins} />
        ) : (
          <GradeLegend />
        )}
      </div>

      {/* Tiny tooltip */}
      {hover && (
        <div
          style={{
            position: "absolute",
            left: 12,
            bottom: 12,
            background: "black",
            border: "1px solid #e5e7eb",
            borderRadius: 12,
            padding: "10px 12px",
            boxShadow: "0 6px 24px rgba(0,0,0,0.08)",
            fontSize: 14,
          }}
        >
          <div style={{ fontWeight: 600 }}>{hover.name}</div>
          <div>Grade: {hover.grade}</div>
          {hover.deathRate != null && <div>Death rate: {hover.deathRate}</div>}
        </div>
      )}
    </div>
  );
}

/**
 * Same legend design: 9 swatches
 */
export function GradeLegend() {
  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      {Object.entries(GRADE_CONFIG).map(([key, val]) => (
        <div
          key={key}
          style={{ display: "flex", gap: 6, alignItems: "center" }}
        >
          <span
            style={{
              width: 14,
              height: 14,
              borderRadius: 4,
              background: val.color,
              border: "1px solid #d1d5db",
              display: "inline-block",
            }}
          />
          <span style={{ fontSize: 14 }}>{key}</span>
        </div>
      ))}
    </div>
  );
}

/**
 * Same legend design: 9 swatches + numeric ranges for each bin
 */
export function DeathLegend({ bins }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      {bins.map((b, i) => (
        <div key={i} style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <span
            style={{
              width: 14,
              height: 14,
              borderRadius: 4,
              background: DEATH_COLORS_9[i],
              border: "1px solid #d1d5db",
              display: "inline-block",
            }}
          />
          <span style={{ fontSize: 14 }}>
            {b.from.toFixed(1)}–{b.to.toFixed(1)}
          </span>
        </div>
      ))}
    </div>
  );
}
