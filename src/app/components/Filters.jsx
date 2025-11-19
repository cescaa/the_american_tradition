import { useState } from "react";
import DateInput from "./DateInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faLocationDot,
  faDove,
  faExplosion,
  faBurst,
  faSuitcaseMedical,
  faSchool,
} from "@fortawesome/free-solid-svg-icons";
import { US_STATES } from "../data/data";

export default function Filters() {
  return (
    <div className="col-span-1 flex flex-col gap-4">
      <h2>Filters</h2>
      <Input label="State" inputType="text" dataOptions={US_STATES} />
      <DateInput />
      <RadioInput />
    </div>
  );
}

function Input({ label, inputType, dataOptions }) {
  const [filtered, setFiltered] = useState(dataOptions);
  const [value, setValue] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);

    const query = inputValue.trim().toLowerCase();

    if (!query) {
      setFiltered(dataOptions);
      setDropdownOpen(true);
      return;
    }

    const matches = dataOptions.filter(({ name, code }) => {
      const nameMatch = name.toLowerCase().includes(query);
      const codeMatch = code.toLowerCase().includes(query);
      return nameMatch || codeMatch;
    });

    setFiltered(matches);
    setDropdownOpen(matches.length > 0);
  };

  const handleSelect = ({ name, code }) => {
    setValue(`${name} (${code})`);
    setDropdownOpen(false);
  };

  const handleBlur = () => {
    setTimeout(() => setDropdownOpen(false), 100);
  };

  const handleFocus = () => {
    if (filtered.length > 0) setDropdownOpen(true);
  };

  return (
    <div className="relative">
      <div className="flex gap-1 items-center">
        <FontAwesomeIcon icon={faDove} className={`text-primary text-sm`} />

        <h4>{label}</h4>
      </div>
      <input
        type={inputType}
        value={value}
        className="focus:outline-none w-full border-b border-primary text-lg bg-accent placeholder-tertiary p-1 px-2"
        placeholder="CA"
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
      />
      {dropdownOpen && (
        <div className="absolute z-10 w-full h-fit max-h-80 overflow-y-scroll scrollbar-hide bg-accent shadow">
          <ul className="space-y-1">
            {filtered.map(({ name, code }, i) => {
              return (
                <li
                  key={i}
                  onMouseDown={() => handleSelect({ name, code })}
                  className="cursor-pointer hover:bg-tertiary/10 p-1 px-2"
                >{`${name} (${code})`}</li>
              );
            })}
          </ul>
        </div>
      )}
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
