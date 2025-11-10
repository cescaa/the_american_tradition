import DateInput from "./DateInput";
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

export default function Filters() {
  return (
    <div className="col-span-1 flex flex-col gap-4">
      <h2>Filters</h2>
      <Input label="State" inputType="text" />
      <DateInput />
      <RadioInput />
    </div>
  );
}

function Input({ label, inputType }) {
  return (
    <div>
      <div className="flex gap-1 items-center">
        <FontAwesomeIcon icon={faDove} className={`text-primary text-sm`} />

        <h4>{label}</h4>
      </div>
      <input
        type={inputType}
        className="focus:outline-none w-full border-b border-primary text-lg bg-accent placeholder-tertiary p-1"
        placeholder="CA"
      />
    </div>
  );
}

function RadioInput({}) {
  return (
    <div className="flex flex-col gap-1">
      <h4>Victims Killed</h4>
      <label className="flex items-center gap-1">
        <input
          type="radio"
          name="victimsKilled"
          value="yes"
          className="size-4 accent-primary transition-none"
        />
        1 or more
      </label>
      <label className="flex items-center gap-1">
        <input
          type="radio"
          name="victimsKilled"
          value="no"
          className="size-4 accent-primary outline-none bg-tertiary"
        />
        None
      </label>
      <label className="flex items-center gap-1">
        <input
          type="radio"
          name="victimsKilled"
          value="all"
          className="size-4 accent-primary outline-none bg-tertiary"
        />
        All of the above
      </label>
    </div>
  );
}
