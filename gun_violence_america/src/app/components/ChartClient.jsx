"use client";
import dynamic from "next/dynamic";
const IncidentsLine = dynamic(() => import("./IncidentsLine"), {
  ssr: false,
});
export default IncidentsLine;
