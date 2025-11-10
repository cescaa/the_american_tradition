import IconLabelDetail from "./IconLabelDetail";
import {
  faCalendar,
  faLocationDot,
  faDove,
} from "@fortawesome/free-solid-svg-icons";

export default function SearchResults({}) {
  return (
    <div className="col-span-3  flex flex-col gap-4">
      <p className="text-tertiary">
        <span className="font-bold text-lg ">12345</span> school shootings found
      </p>
      {[...Array(12)].map((elem, i) => (
        <ResultCard
          key={i}
          school="Wilson Elementary School"
          city="Fresno"
          state="CA"
          date="August 29, 2025"
          summary="Adult with rifle, shotgun, and handgun fired through the windows of the
        schools church at students who were inside for morning mass"
        />
      ))}
    </div>
  );
}

// individual result card
function ResultCard({ school, city, state, date, summary }) {
  return (
    <div className="p-4 flex flex-col gap-2 cursor-pointer hover:bg-tertiary/10">
      <h3 className="text-secondary">{school}</h3>
      <div className="flex gap-8">
        <IconLabelDetail icon={faLocationDot} text={`${city}, ${state}`} />
        <IconLabelDetail icon={faCalendar} text={date} />
        <IconLabelDetail icon={faDove} text="1 Victims Killed" />
      </div>
      <p>{summary}</p>
    </div>
  );
}
