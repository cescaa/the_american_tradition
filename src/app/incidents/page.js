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

export default function Incidents() {
  const [results, setResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState([]);

  useEffect(function () {
    fetch("https://nodejs-practice-delta.vercel.app/v1/incidents/")
      .then((res) => res.json())
      .then((d) => {
        setResults(d.data.incidents);
        if (results.length > 0) setSelectedResult(results[0]);
      });
  }, []);

  return (
    <>
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
        <Filters />
        <SearchResults
          results={results}
          setSelectedResult={setSelectedResult}
        />
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
