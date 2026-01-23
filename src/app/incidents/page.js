// https://nodejs-practice-delta.vercel.app/v1/incidents/?State=AZ

"use client";
import { useSearchParams } from "next/navigation";
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
import { useEffect, useState } from "react";
import { API_ENDPOINT } from "../data/data";

export default function Incidents() {
  const [results, setResults] = useState([]); // all incidents from api data
  const [selectedResult, setSelectedResult] = useState([]); // user-selected incident
  const [filterParam, setFilterParam] = useState(""); // string-formatted parameters for endpoint
  const searchParams = useSearchParams(); // reads URL string of page
  const searchQry = searchParams.get("search") ?? ""; // gets value of search field

  const paramsObj = new URLSearchParams(filterParam);
  if (searchQry) paramsObj.set("search", searchQry);

  const queryString = paramsObj.toString();
  const url = queryString ? `${API_ENDPOINT}${queryString}` : API_ENDPOINT;

  // when page renders, fetch all incidents from api
  useEffect(
    function () {
      fetch(url)
        .then((res) => res.json())
        .then((d) => {
          setResults(d.data.incidents);
          if (d.data.incidents.length > 0)
            setSelectedResult(d.data.incidents[0]);
        });
      console.log("FILTERPARAM: ", url);
    },
    [url], // re-fetch data with selected parameters when filters change
  );

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
      <main className="main-side-padding bg-background py-8 grid gap-4 grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] items-start">
        {/* COLUMN 1: Filters */}
        <Filters setFilterParam={setFilterParam} />
        {/* COLUMN 2: Search Results */}
        <SearchResults
          results={results}
          setSelectedResult={setSelectedResult}
        />
        {/* COLUMN 3: Detailed info on selected incident */}
        <div className="sticky top-32 max-h-screen overflow-y-scroll scrollbar-hide w-full col-span-3 p-8 pb-16 flex flex-col gap-4 items-center border border-accent">
          <small className="w-full text-right text-tertiary">#1234567890</small>
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
              text="3rd Shooting"
              iconSize="text-sm"
              textSize={3}
            />

            <IconLabelDetail
              icon={faCircle}
              text="12 Shots Fired"
              iconSize="text-xs"
              textSize={3}
            />
            <IconLabelDetail
              icon={faCircle}
              text="2 Victims Killed"
              iconSize="text-xs"
              textSize={3}
            />
            <IconLabelDetail
              icon={faCircle}
              text="3 Victims Injured"
              iconSize="text-xs"
              textSize={3}
            />
          </div>
          <div className="w-full">
            <h2>Summary</h2>
            <p className="text-justify">{selectedResult.Narrative}</p>
          </div>
          <LocationMap lati={selectedResult.LAT} longi={selectedResult.LNG} />
        </div>
      </main>
    </>
  );
}
