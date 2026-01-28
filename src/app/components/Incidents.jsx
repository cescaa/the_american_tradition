// https://nodejs-practice-delta.vercel.app/v1/incidents/?State=AZ

"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Filters from "../components/Filters";
import SearchResults from "../components/SearchResults";
import Script from "next/script";
import {
  faCalendar,
  faLocationDot,
  faSchool,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import IconLabelDetail from "../components/IconLabelDetail";
import LocationMap from "../components/LocationMap";
import ResultsNav from "../components/ResultsNav";
import { useEffect, useState } from "react";
import { API_ENDPOINT } from "../data/data";

export default function Incidents() {
  const [results, setResults] = useState(null); // all incidents from api data
  const [selectedResult, setSelectedResult] = useState({}); // user-selected incident

  const searchParams = useSearchParams(); // reads params in url of page

  const queryString = searchParams.toString();
  const url = queryString ? `${API_ENDPOINT}${queryString}` : API_ENDPOINT;

  // when page renders, fetch all incidents from api
  useEffect(
    function () {
      fetch(url)
        .then((res) => res.json())
        .then((d) => {
          setResults(d);
          if (d?.data?.incidents.length > 0)
            setSelectedResult(d.data.incidents[0]);
          console.log("SELECTED RESULT!!!!");
        });
      console.log("FILTERPARAM: ", url);
    },
    [url], // re-fetch data with selected parameters when filters change
  );

  const incidents = results?.data?.incidents ?? [];

  const sameSchoolIncidents = selectedResult?.School
    ? incidents.filter((r) => r.School === selectedResult.School)
    : [];

  const sortedByDate = sameSchoolIncidents
    .slice()
    .sort((a, b) => new Date(a.Date) - new Date(b.Date));

  const occurrenceIndex = selectedResult?._id
    ? sortedByDate.findIndex((r) => r._id === selectedResult._id)
    : -1;

  const occurrenceNumber = occurrenceIndex >= 0 ? occurrenceIndex + 1 : null;

  function getOrdinalSuffix(n) {
    if (n % 100 >= 11 && n % 100 <= 13) return "th";
    switch (n % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  return (
    <>
      {/* displays the location in Google map for each result */}
      <Script
        id="gmaps-bootstrap"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=\`https://maps.googleapis.com/maps/api/js?\`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
              key: "${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}",
              v: "weekly"
            });
          `,
        }}
      />
      <main className="main-side-padding bg-background py-0 pb-0 grid gap-4 grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] items-start">
        {/* COLUMN 1: Filters */}
        <Filters />
        {/* COLUMN 2: Search Results */}
        <SearchResults
          results={results ?? []}
          setSelectedResult={setSelectedResult}
          selectedResult={selectedResult}
        >
          <ResultsNav totalPages={results?.totalPages ?? 0} />
        </SearchResults>
        {/* COLUMN 3: Detailed info on selected incident */}
        <div className="sticky top-32 pt-8 max-h-screen overflow-y-scroll scrollbar-hide w-full col-span-3 p-8 pb-16 flex flex-col gap-4 items-center border-0 border-accent">
          <small className="w-full text-right text-tertiary">{`ID: ${selectedResult._id}`}</small>
          <h1>{selectedResult.School}</h1>
          <div className="w-full grid grid-cols-3 gap-y-1">
            <IconLabelDetail
              icon={faLocationDot}
              text={`${selectedResult.City}, ${selectedResult.State}`}
              iconSize="text-sm"
              textSize={3}
            />
            <IconLabelDetail
              icon={faCalendar}
              text={
                selectedResult.Date
                  ? new Date(selectedResult.Date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "Date unavailable"
              }
              iconSize="text-sm"
              textSize={3}
            />
            <IconLabelDetail
              icon={faSchool}
              text={`School's ${occurrenceNumber}${getOrdinalSuffix(occurrenceNumber)} incident`}
              iconSize="text-sm"
              textSize={3}
            />

            <IconLabelDetail
              icon={faCircle}
              text={
                selectedResult?.Shots_Fired >= 0
                  ? selectedResult?.Shots_Fired === 1
                    ? `1 Shot Fired`
                    : `${selectedResult?.Shots_Fired} Shots Fired`
                  : "Shots fired unknown"
              }
              iconSize="text-xs"
              textSize={3}
            />
            <IconLabelDetail
              icon={faCircle}
              text={
                selectedResult?.Victims_Killed >= 0
                  ? selectedResult?.Victims_Killed === 1
                    ? `1 Victim Killed`
                    : `${selectedResult?.Victims_Killed} Victims Killed`
                  : "Victims killed unknown"
              }
              iconSize="text-xs"
              textSize={3}
            />
            <IconLabelDetail
              icon={faCircle}
              text={
                selectedResult?.Victims_Injured >= 0
                  ? selectedResult?.Victims_Injured === 1
                    ? `1 Victim Injured`
                    : `${selectedResult?.Victims_Injured} Victims Injured`
                  : "Victims injured unknown"
              }
              iconSize="text-xs"
              textSize={3}
            />
          </div>
          <div className="w-full">
            <h2>Summary</h2>
            <p className="text-justify">{selectedResult.Narrative}</p>
          </div>
          {selectedResult?.LAT && selectedResult?.LNG ? (
            <LocationMap
              center={{
                lat: Number(selectedResult.LAT),
                lng: Number(selectedResult.LNG),
              }}
            />
          ) : (
            <p className="text-tertiary">Location coordinates unavailable.</p>
          )}
        </div>
      </main>
    </>
  );
}
