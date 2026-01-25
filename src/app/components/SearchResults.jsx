import { useState } from "react";
import IconLabelDetail from "./IconLabelDetail";
import {
  faCalendar,
  faLocationDot,
  faDove,
} from "@fortawesome/free-solid-svg-icons";
import ResultsNav from "./ResultsNav";

export default function SearchResults({ results = [], setSelectedResult }) {
  return (
    <div className="col-span-3 flex flex-col gap-4 bg-background h-screen overflow-x-scroll scrollbar-hide">
      <div className="w-full">
        <p className="text-tertiary">
          <span className="font-bold text-lg ">{results.total}</span> school
          shootings found
        </p>
        {(results?.data?.incidents ?? []).map((r, i) => (
          <ResultCard
            key={i}
            school={r.School}
            city={r.City}
            state={r.State}
            date={
              r.Date
                ? new Date(r.Date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "Date unavailable"
            }
            summary={r.Summary}
            numKilled={r.Victims_Killed ?? null}
            onClick={() => {
              console.log(r);
              setSelectedResult(r);
            }}
          />
        ))}
      </div>
      <ResultsNav />
    </div>
  );
}

// individual result card
function ResultCard({
  school,
  city,
  state,
  date,
  summary,
  numKilled,
  onClick,
}) {
  return (
    <div
      className={`p-4 flex flex-col gap-2 cursor-pointer hover:bg-tertiary/10`}
      onClick={onClick}
    >
      <h3 className="text-secondary">{school}</h3>
      <div className="flex gap-8">
        <IconLabelDetail icon={faLocationDot} text={`${city}, ${state}`} />
        <IconLabelDetail icon={faCalendar} text={date} />
        <IconLabelDetail
          icon={faDove}
          text={
            numKilled >= 0
              ? numKilled === 1
                ? `${numKilled} Victim Killed`
                : `${numKilled} Victims Killed`
              : "Unknown"
          }
        />
      </div>
      <p>{summary}</p>
    </div>
  );
}
