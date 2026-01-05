"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";

export default function Home() {
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    async function fetchIncidents() {
      const START_YEAR = 1974;
      const END_YEAR = 2024;

      const res = await fetch(
        `https://nodejs-practice-delta.vercel.app/v1/incidents/`
      );

      if (!res.ok) throw new Error("Failed to fetch incidents");

      const json = await res.json();
      const incidents = json?.data?.incidents || [];

      const incidentCountsPerYear = {};
      for (let year = START_YEAR; year <= END_YEAR; year++) {
        incidentCountsPerYear[year] = 0; // initialize incident count to 0
      }

      incidents.forEach((incident) => {
        const yr = incident.Year; // get year of each incident
        if (yr >= START_YEAR && yr <= END_YEAR) incidentCountsPerYear[yr] += 1;
      });

      // Convert to Nivo line format
      const lineSeries = [
        {
          id: "Incidents per year",
          data: Object.keys(incidentCountsPerYear).map((year) => ({
            x: Number(year), // year on x-axis
            y: incidentCountsPerYear[year], // count on y-axis
          })),
        },
      ];
      setChartData(lineSeries);
    }
    fetchIncidents();
  }, []);

  return (
    <div className="main-side-padding font-cor">
      <div className="w-full h-[75vh] flex items-center justify-center ">
        <div className="flex gap-16">
          <div className="flex items-center">
            <div className="font-cor-sc relative w-sm h-56">
              <div className="text-4xl text-tertiary absolute left-8">The</div>
              <div className="text-7xl text-primary absolute top-6">
                American
              </div>
              <div className="text-7xl text-primary absolute top-22 left-13">
                Tradition
              </div>
              <p className="absolute top-40 left-18 font-cor">
                Mapping Gun Violence
                <br />
                in America’s Classrooms
              </p>
            </div>
          </div>
          <div className="w-full">
            <div
              className="relative overflow-x-hidden rounded-t-[50%]"
              style={{
                width: 250,
                height: 300,
              }}
            >
              <Image
                src="/img/school-shooting-lockdowns.webp"
                alt="Example image"
                fill
                style={{
                  objectFit: "cover", // fills the box, cropping overflow
                  objectPosition: "-4rem", // which part of the image to keep
                }}
              />
            </div>
            <small className="text-tertiary">Getty Images</small>
          </div>
        </div>
      </div>
      <div className="flex w-full my-8">
        <div className="w-1/2">
          <h1>16 to 338:</h1>
          <p className="w-150">
            Shootings in American K–12 schools have surged from 16 incidents in
            1974 to 338 in 2024, the second highest level ever recorded, just
            below 2023's record of 350. This 50-year span includes some of the
            nation’s most notable attacks, such as Columbine (1999), Sandy Hook
            (2012), and Parkland (2018). Recent years, particularly the early
            2020s, show the greatest concentration of shootings, with hundreds
            occurring annually. Texas, Florida, and California consistently
            report the largest numbers.
          </p>
          <Image
            src="/img/robb-shooting.webp" // path is from /public
            alt="school shooting"
            width={400}
            height={400}
            className=" my-4"
            style={{
              objectFit: "contain", // fills the box, cropping overflow
            }}
          />
        </div>
        <div className="min-h-140 w-1/2">
          <ResponsiveLine
            data={chartData}
            lineWidth={1.5}
            tooltip={({ point }) => (
              <div
                className="p-2 w-36 text-white"
                style={{
                  background: "#14142A",
                  borderRadius: 2,
                  fontFamily: "Cormorant, serif",
                  border: "1px solid #31597f",
                }}
              >
                <p>
                  Year: <span className="font-bold">{point.data.x}</span>
                </p>
                <p>
                  Incidents: <span className="font-bold">{point.data.y}</span>
                </p>
              </div>
            )}
            margin={{ top: 40, right: 40, bottom: 80, left: 80 }}
            colors={() => "var(--color-secondary)"}
            pointColor="var(--color-secondary)"
            xScale={{
              type: "linear",
              min: 1974,
              max: 2024,
            }}
            yScale={{
              type: "linear",
              min: 0,
              max: "auto",
              stacked: false,
            }}
            axisBottom={{
              legend: "Year",
              legendOffset: 70,
              legendPosition: "middle",
              tickValues: Array.from(
                { length: Math.floor((2024 - 1974) / 5) + 1 },
                (_, i) => 1974 + i * 5
              ),
            }}
            axisLeft={{
              legend: "Number of incidents",
              legendOffset: -70,
              legendPosition: "middle",
            }}
            pointSize={1}
            pointBorderWidth={1}
            useMesh={true}
            enableGridX={false}
            theme={{
              grid: {
                line: {
                  stroke: "var(--color-accent)",
                  strokeWidth: 1,
                  strokeDasharray: "0",
                },
              },

              crosshair: {
                line: {
                  stroke: "var(--color-tertiary)", // ← your gold color
                  strokeWidth: 1,
                  strokeDasharray: "8 12",
                },
              },

              fontFamily: "Cormorant, serif",
              fontSize: 16,
              textColor: "#fff",

              axis: {
                ticks: {
                  line: {
                    strokeWidth: 0,
                  },
                  text: {
                    fontFamily: "Cormorant, serif",
                    fontSize: 16,
                    fill: "white", // ← the actual color of tick labels
                  },
                },
                legend: {
                  text: {
                    fontFamily: "Cormorant SC, serif",
                    fontSize: 18,
                    fill: "#31597f", // ← axis legend (e.g., "Year", "Number of incidents")
                  },
                },
              },

              legends: {
                text: {
                  fontFamily: "Cormorant, serif",
                  fontSize: 16,
                  fill: "#31597f", // ← legend text color
                },
              },

              tooltip: {
                container: {
                  fontFamily: "Cormorant, serif",
                  fontSize: 24,
                  color: "#000", // tooltip text
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
