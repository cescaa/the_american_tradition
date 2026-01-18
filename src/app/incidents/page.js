// https://nodejs-practice-delta.vercel.app/v1/incidents/?State=AZ

"use client";
import Filters from "../components/Filters";
import SearchResults from "../components/SearchResults";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Script from "next/script";
import {
  faCalendar,
  faLocationDot,
  faDove,
  faExplosion,
  faBurst,
  faSuitcaseMedical,
  faSchool,
} from "@fortawesome/free-solid-svg-icons";
import IconLabelDetail from "../components/IconLabelDetail";
import LocationMap from "../components/LocationMap";
import { useEffect, useState } from "react";
import { Input } from "../components/Filters";
import DateInput from "../components/DateInput";
import { RadioInput } from "../components/Filters";
import { US_STATES, API_ENDPOINT } from "../data/data";

export default function Incidents() {
  const CLEARED = {
    State: null,
    victimsKilled: null,
  };
  const [results, setResults] = useState([]); // all incidents from api data
  const [selectedResult, setSelectedResult] = useState([]); // user-selected incident
  const [filterParam, setFilterParam] = useState(""); // string-formatted parameters for endpoint
  const [pendingFilters, setPendingFilters] = useState(CLEARED); // stores the selected filter inputs before they're applied to the incidents

  // when page renders, fetch all incidents from api
  useEffect(
    function () {
      fetch(API_ENDPOINT + filterParam)
        .then((res) => res.json())
        .then((d) => {
          setResults(d.data.incidents);
          if (d.data.incidents.length > 0)
            setSelectedResult(d.data.incidents[0]);
        });
      console.log("FILTERPARAM: ", API_ENDPOINT + filterParam);
    },
    [filterParam], // re-fetch data with selected parameters when filters change
  );

  // When apply button is clicked, applyFilters() updates the filter string
  // by creating a new paramerter obj and including values based on the values in pendingFilters.
  const applyFilters = (pf) => {
    const params = new URLSearchParams(); // create a NEW query param object, so no need to delete old filters

    // if pendingFilters contains values, include them in the query params
    if (pf.State) params.set("State", pf.State);
    if (pf.victimsKilled === "gte1") {
      params.set("Victims_Killed[gte]", "1");
    } else if (pf.victimsKilled === "0") {
      params.set("Victims_Killed", "0");
    }
    setFilterParam(params.toString()); // update the filter string used by the API
  };

  // When "Clear All" btn is clicked, clear all filters
  const clearFilters = () => {
    setPendingFilters(CLEARED);
    applyFilters(CLEARED);
  };

  // When user selects a U.S. state, update pendingFilters
  const handleStateSelect = (stateCode) => {
    setPendingFilters((prev) => ({
      ...prev,
      State: stateCode,
    }));
  };

  // When user selects num of victims, update pendingFilters
  const handleVictimSelect = (val) => {
    setPendingFilters((prev) => ({
      ...prev,
      victimsKilled: val,
    }));
  };

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
      <main className="main-side-padding py-8 grid gap-4 grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] items-start">
        {/* COLUMN 1: Filters */}
        <Filters>
          <Input
            label="State"
            inputType="text"
            dataOptions={US_STATES}
            onStateSelect={handleStateSelect}
            selectedState={pendingFilters.State} // passes U.S. State or null so parent can clear input when "Clear All" is clicked
          />
          <DateInput setFilterParam={setFilterParam} />
          <RadioInput
            onVictimSelect={handleVictimSelect}
            selectedVictim={pendingFilters.victimsKilled}
          />

          <div className="flex mt-4 justify-between">
            <button
              className="w-fit text-secondary border border-secondary p-1 px-4 cursor-pointer hover:bg-accent"
              onClick={() => applyFilters(pendingFilters)}
            >
              Apply
            </button>
            <button
              className="w-fit text-secondary border-b border-secondary p-1 cursor-pointer hover:bg-accent"
              onClick={clearFilters}
            >
              Clear All
            </button>
          </div>
        </Filters>

        {/* COLUMN 2: Search Results */}
        <SearchResults
          results={results}
          setSelectedResult={setSelectedResult}
        />

        {/* COLUMN 3: Detailed info on selected incident */}
        <div className="sticky top-8 max-h-screen overflow-y-scroll scrollbar-hide w-full col-span-3 p-8 pb-16 flex flex-col gap-4 items-center border border-accent">
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
              icon={faDove}
              text="2 Victims Killed"
              iconSize="text-sm"
              textSize={3}
            />
            <IconLabelDetail
              icon={faSuitcaseMedical}
              text="3 Victims Injured"
              iconSize="text-sm"
              textSize={3}
            />

            <IconLabelDetail
              icon={faBurst}
              text="12 Shots Fired"
              iconSize="text-sm"
              textSize={3}
            />

            <IconLabelDetail
              icon={faSchool}
              text="3rd Shooting"
              iconSize="text-sm"
              textSize={3}
            />
          </div>
          <div>
            <h2>Summary</h2>
            <p className="text-justify">{selectedResult.Narrative}</p>
          </div>
          <LocationMap lati={selectedResult.LAT} longi={selectedResult.LNG} />
        </div>
      </main>
    </>
  );
}
