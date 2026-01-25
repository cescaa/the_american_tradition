"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import { COUNTRY_SHOOTINGS, GUN_LAW } from "./data/data";
import { UsaHeatMap } from "./components/UsaGradeHeatMap";

export default function Home() {
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    async function fetchIncidents() {
      const START_YEAR = 1974;
      const END_YEAR = 2024;

      const res = await fetch(
        `https://nodejs-practice-delta.vercel.app/v1/incidents/`,
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
      <div className="w-full h-[76vh] flex items-center justify-center ">
        <div className="flex gap-16">
          <div className="flex items-center">
            <div className="font-cor-sc relative w-sm min-h-96">
              <div className="text-4xl text-tertiary absolute left-8">The</div>
              <div className="text-7xl text-primary absolute top-6">
                American
              </div>
              <div className="text-7xl text-primary absolute top-22 left-13">
                Tradition
              </div>
              <p className="absolute top-40 left-18 font-cor">
                An Interactive Database
                <br />
                of American School Shootings
                <br />
                based off David Reidman's work
              </p>

              <button className="absolute left-18 bottom-16 w-fit text-secondary border border-secondary p-2 px-8 cursor-pointer text-lg mt-4 rounded-sm hover:bg-accent">
                Browse School Shootings
              </button>

              <button className="absolute left-18 bottom-0 w-fit text-secondary border border-secondary p-2 px-8 cursor-pointer text-lg mt-4 rounded-sm hover:bg-accent">
                Sign Petition
              </button>
            </div>
          </div>

          <div className="w-full">
            <div
              className="relative overflow-x-hidden rounded-t-[50%]"
              style={{
                width: 325,
                height: 400,
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
      {/* Line Graph */}
      <div className="flex w-full my-8">
        <div className="w-1/2 flex flex-col justify-center">
          <h1>
            From Rare to Routine:
            <br />
            School Shootings in America, 1974–2024
          </h1>
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
                (_, i) => 1974 + i * 5,
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
      {/* Graph 2 */}
      <div className="flex flex-col items-center w-full my-8 text-center ">
        <h1>America Has More School Shootings Than Any Other Country</h1>
        <p className="w-150">
          According to a review of global school shooting data compiled by CNN,
          the United States experienced 288 school shooting incidents between
          January 2009 and May 2018, a total that far exceeds those of other
          countries included in the same dataset. During that period, the
          country with the next highest count — Mexico — recorded only eight
          such incidents, and many other nations documented only a handful or
          none at all. This pattern is consistent with broader analyses showing
          that, in available international data, the United States has more
          recorded school shootings than any other country.
        </p>
        <div className="w-full grid grid-cols-5 gap-8 my-8">
          {COUNTRY_SHOOTINGS.map((c, i) => (
            <div
              key={i}
              className={`flex items-center h-full border-0 border-white ${i === 0 && "row-span-4 flex-col gap-4"}`}
            >
              <div
                className={`relative overflow-x-hidden ${i === 0 ? "w-full" : "w-1/2"}`}
                style={{
                  height: i === 0 ? 200 : 100,
                }}
              >
                <Image
                  src="/img/school-shooting-lockdowns.webp"
                  alt="Example image"
                  fill
                  style={{
                    objectFit: "cover", // fills the box, cropping overflow
                    objectPosition: "0", // which part of the image to keep
                  }}
                />
              </div>

              <div
                className={`text-center ${i === 0 ? "text-lg w-full" : "text-sm  w-1/2 text-tertiary"}`}
              >
                <div
                  className={`font-cor-sc  ${i === 0 ? "text-8xl text-white" : "text-4xl text-white"}`}
                >
                  {c.count}
                </div>
                {`${i === 0 ? `America had 288 school shootings from 2009-2018, the most of any country.` : c.country}`}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full flex">
        <div className="w-1/2">
          Gun Law Score
          <UsaHeatMap metric="grade" />
        </div>
        <div className="w-1/2">
          Death Rate
          <UsaHeatMap metric="deathRate" />
        </div>
      </div>
    </div>
  );
}
