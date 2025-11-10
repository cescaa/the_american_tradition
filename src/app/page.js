import Filters from "./components/Filters";
import SearchResults from "./components/SearchResults";
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
import IconLabelDetail from "./components/IconLabelDetail";
import LocationMap from "./components/LocationMap";

export default function Home() {
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
        <SearchResults />
        <div className="sticky top-8 max-h-screen overflow-y-scroll scrollbar-hide w-full col-span-3 p-8 pb-16 flex flex-col gap-4 items-center border border-accent">
          <small className="w-full text-right text-tertiary">#1234567890</small>
          <h1>Wilson Elementary School</h1>
          <div className="w-full grid grid-cols-3 gap-y-1">
            <IconLabelDetail
              icon={faLocationDot}
              text="Fresno, CA"
              iconSize="text-sm"
              textSize={3}
            />
            <IconLabelDetail
              icon={faCalendar}
              text="August 29, 2025"
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
            <p className="text-justify">
              A sixth grader who was distraught had a replica gun at Wilson
              Elementary School in Fresno, causing the school to go on lockdown
              Thursday, police said. At around 1:25 p.m., officers received
              reports of a juvenile with a gun at the elementary school at
              Ashlan Avenue and Hughes Avenue. Police said that the sixth grader
              was distraught due to something that had happened at school. The
              juvenile had a replica gun and pointed it at officers multiple
              times. Fresno Police’s crisis negotiation team talked to him and
              were able to get him to put the replica gun down after 30 minutes.
              No shots were fired. Police said that there were no reported
              injuries, and the sixth grader was taken into custody.
            </p>
          </div>
          <LocationMap />
        </div>
      </main>
    </>
  );
}
