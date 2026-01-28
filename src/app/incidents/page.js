import { Suspense } from "react";
import Incidents from "../components/Incidents";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6">Loading incidents…</div>}>
      <Incidents />
    </Suspense>
  );
}
