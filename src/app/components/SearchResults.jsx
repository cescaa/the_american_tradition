import { useState, useEffect } from "react";
import IconLabelDetail from "./IconLabelDetail";
import {
  faCalendar,
  faLocationDot,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";

export default function SearchResults({
  results = [],
  setSelectedResult,
  selectedResult,
  children,
}) {
  const [selectedID, setSelectedID] = useState(null);
  useEffect(() => {
    const uid =
      selectedResult?._id ??
      selectedResult?.id ??
      (selectedResult?.School && selectedResult?.Date && selectedResult?.State
        ? `${selectedResult.School}-${selectedResult.Date}-${selectedResult.City ?? "unknown"}-${selectedResult.State}`
        : null);

    if (uid) setSelectedID(uid);
  }, [selectedResult]);

  const incidentList = results?.data?.incidents ?? [];

  const getUid = (r) =>
    r?._id ??
    r?.id ??
    `${r?.School ?? "unknown"}-${r?.Date ?? "unknown"}-${r?.City ?? "unknown"}-${r?.State ?? "unknown"}`;

  return (
    <div className="col-span-3 flex flex-col bg-background h-screen pt-8">
      <p className="text-tertiary pb-4 border-b border-accent">
        <span className="font-bold text-lg ">{results.total}</span> school
        shootings found
      </p>
      <div className="w-full flex flex-col gap-4 h-full overflow-x-scroll scrollbar-hide">
        <div className="w-full">
          {incidentList.map((r, i) => {
            const uid = getUid(r);

            return (
              <ResultCard
                key={uid}
                id={uid}
                selectedID={selectedID}
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
                  setSelectedResult(r);
                  setSelectedID(uid);
                }}
              />
            );
          })}
        </div>
        {children}
      </div>
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
  selectedID,
  numKilled,
  onClick,
  id,
}) {
  return (
    <div
      className={`p-4 flex flex-col gap-2 cursor-pointer hover:bg-tertiary/5 ${selectedID === id ? "bg-tertiary/15" : "bg-background"}`}
      onClick={onClick}
    >
      <h3 className="text-secondary">{school}</h3>
      <div className="flex gap-8">
        <IconLabelDetail icon={faLocationDot} text={`${city}, ${state}`} />
        <IconLabelDetail icon={faCalendar} text={date} />
        <IconLabelDetail
          icon={faCircle}
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
