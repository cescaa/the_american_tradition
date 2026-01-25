import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDove } from "@fortawesome/free-solid-svg-icons";
import { US_STATES } from "../data/data";
import DateInput from "./DateInput";

export default function Filters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams(); // reads params of URL of page

  const CLEARED = {
    State: null,
    victimsKilled: null,
    startDate: null,
    endDate: null,
    page: 1,
  };

  // react-datepicker only accepts Date objects for its selected value
  const [startDateObj, setStartDateObj] = useState(null);
  const [endDateObj, setEndDateObj] = useState(null);
  const [pendingFilters, setPendingFilters] = useState(CLEARED); // stores the selected filter inputs before they're applied to the incidents

  // When apply button is clicked, applyFilters() updates the filter string
  // by creating a new paramerter obj and including values based on the values in pendingFilters.
  const applyFilters = (pf) => {
    const params = new URLSearchParams(searchParams.toString());

    // if pendingFilters contains values, include them in the query params
    pf.State ? params.set("State", pf.State) : params.delete("State");
    pf.startDate
      ? params.set("Date[gte]", pf.startDate)
      : params.delete("Date[gte]");
    pf.endDate
      ? params.set("Date[lte]", pf.endDate)
      : params.delete("Date[lte]");

    params.set("page", "1"); // when filters applied, go to first page

    // optional safety check
    if (pf.startDate && pf.endDate && pf.startDate > pf.endDate) {
      params.delete("Date[lte]");
    }

    if (pf.victimsKilled === "gte1") {
      params.set("Victims_Killed[gte]", "1");
      params.delete("Victims_Killed");
    } else if (pf.victimsKilled === "0") {
      params.set("Victims_Killed", "0");
      params.delete("Victims_Killed[gte]");
    } else {
      params.delete("Victims_Killed[gte]");
      params.delete("Victims_Killed");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  // When "Clear All" btn is clicked, clear all filters
  const clearFilters = () => {
    setPendingFilters(CLEARED);

    const params = new URLSearchParams(searchParams.toString());
    params.delete("State");
    params.delete("Date[gte]");
    params.delete("Date[lte]");
    params.delete("Victims_Killed");
    params.delete("Victims_Killed[gte]");
    params.set("page", "1");

    router.replace(`${pathname}?${params.toString()}`);

    setStartDateObj(null);
    setEndDateObj(null);
  };

  // When user selects a U.S. state, update pendingFilters
  const handleStateSelect = (stateCode) => {
    setPendingFilters((prev) => ({
      ...prev,
      State: stateCode,
    }));
  };

  // When user selects start date, update pendingFilters
  const handleStartDateSelect = (dateObj) => {
    setStartDateObj(dateObj);

    setPendingFilters((prev) => ({
      ...prev,
      startDate: formatDateString(dateObj),
    }));
  };

  // When user selects end date, update pendingFilters
  const handleEndDateSelect = (dateObj) => {
    setEndDateObj(dateObj);

    setPendingFilters((prev) => ({
      ...prev,
      endDate: formatDateString(dateObj),
    }));
  };

  // When user selects num of victims, update pendingFilters
  const handleVictimSelect = (val) => {
    setPendingFilters((prev) => ({
      ...prev,
      victimsKilled: val,
    }));
  };

  const formatDateString = (d) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");

    return `${y}-${m}-${day}`;
  };

  return (
    <div className="col-span-1 flex flex-col gap-4">
      <h2>Filters</h2>
      <Input
        label="State"
        inputType="text"
        dataOptions={US_STATES}
        onStateSelect={handleStateSelect}
        selectedState={pendingFilters.State} // passes U.S. State or null so parent can clear input when "Clear All" is clicked
      />
      <DateInput
        onStartDateSelect={handleStartDateSelect}
        onEndDateSelect={handleEndDateSelect}
        selectedStartDate={startDateObj}
        selectedEndDate={endDateObj}
      />
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
    </div>
  );
}
export function Input({
  label,
  inputType,
  dataOptions = US_STATES,
  onStateSelect,
  selectedState,
}) {
  const [filtered, setFiltered] = useState(dataOptions); // for filtering filter options (the matching filter options based on user's input)
  const [inputValue, setInputValue] = useState(""); // for showing inputed value in field
  const [dropdownOpen, setDropdownOpen] = useState(false); // for showing filter options

  // Ensures input field is empty when user clicks "Clear All" btn
  useEffect(() => {
    if (selectedState === null) {
      setInputValue("");
    }
  }, [selectedState]);

  // Based on user's input, show all matching states they can choose from
  const handleChange = (e) => {
    const inputVal = e.target.value;
    setInputValue(inputVal); // show inputed value in input field

    const query = inputVal.trim().toLowerCase();

    // if user doesn't enter value, show ALL filter options
    if (!query) {
      setFiltered(dataOptions);
      setDropdownOpen(true);
      onStateSelect(null);
      return;
    }

    // else, return array of matching options based on inputed value
    const matches = dataOptions.filter(({ name, code }) => {
      const nameMatch = name.toLowerCase().startsWith(query);
      const codeMatch = code.toLowerCase().startsWith(query);
      return nameMatch || codeMatch;
    });

    // show only matching filter options based on inputed value
    setFiltered(matches);
    setDropdownOpen(matches.length > 0);
  };

  // when user selects from filter options, display selected option in input field
  // and updates pendingFilters obj, so it can be added to filter string
  const handleSelect = ({ name, code }) => {
    setInputValue(`${name} (${code})`); // displays selected U.S. state in input field
    onStateSelect(code); // updates pendingFilters
  };

  const handleBlur = () => {
    setTimeout(() => {
      setDropdownOpen(false);
    }, 100);
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
        value={inputValue}
        className="focus:outline-none w-full border-b border-primary text-lg bg-accent placeholder-tertiary p-1 px-2"
        placeholder="Select State"
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
      />

      {/* DROPDOWN*/}
      {dropdownOpen && (
        <div className="absolute z-10 w-full h-fit max-h-80 overflow-y-scroll scrollbar-hide bg-accent shadow">
          <ul className="space-y-1">
            {/* the matching filter options based on user's input */}
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

export function RadioInput({ onVictimSelect, selectedVictim }) {
  const radioOptions = [
    { str: "1 or more", sqlStr: "gte1" },
    { str: "None", sqlStr: "0" },
    { str: "All of the above", sqlStr: "" },
  ];

  // updates pendingFilters when radio option is selected,
  // so corresponding value can be added to filter string
  const handleChange = (e) => {
    onVictimSelect(e.target.value);
  };

  return (
    <div className="flex flex-col gap-1">
      <h4>Victims Killed</h4>
      {radioOptions.map((opt, i) => (
        <label className="flex items-center gap-1" key={i}>
          <input
            type="radio"
            name="victimsKilled"
            value={opt.sqlStr}
            className="size-4 accent-primary transition-none"
            onChange={(e) => handleChange(e)}
            checked={(selectedVictim ?? "") === opt.sqlStr} // ensures correct radio button is clicked
          />
          {opt.str}
        </label>
      ))}
    </div>
  );
}
