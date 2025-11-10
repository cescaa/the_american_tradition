"use client";
import { useEffect } from "react";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

export default function DateInput({}) {
  useEffect(() => {
    const s = document.createElement("style");
    s.innerHTML = `
      .react-datepicker .react-datepicker__day--selected.react-datepicker__day--selected,
      .react-datepicker .react-datepicker__day--selected.react-datepicker__day--selected:hover,
      .react-datepicker .react-datepicker__day--keyboard-selected.react-datepicker__day--keyboard-selected,
      .react-datepicker .react-datepicker__day--keyboard-selected.react-datepicker__day--keyboard-selected:hover,
      .react-datepicker .react-datepicker__day--in-range.react-datepicker__day--in-range,
      .react-datepicker .react-datepicker__day--in-range.react-datepicker__day--in-range:hover,
      .react-datepicker .react-datepicker__day--in-selecting-range.react-datepicker__day--in-selecting-range,
      .react-datepicker .react-datepicker__day--in-selecting-range.react-datepicker__day--in-selecting-range:hover {
        background-color:#641211 !important; color:#fff !important; border-radius:9999px !important;
      }`;
    document.head.appendChild(s);
    return () => document.head.removeChild(s);
  }, []);

  return (
    <div>
      <div className="flex gap-1 items-center">
        <FontAwesomeIcon icon={faCalendar} className={`text-primary text-sm`} />

        <h4>Date Range</h4>
      </div>
      <small>Start Date</small>
      <DatePicker
        placeholderText={`Select a start date`}
        dateFormat="MMMM d, yyyy" // -> August 25, 2025
        wrapperClassName="w-full"
        className="focus:outline-none w-full border-b border-primary text-lg bg-accent placeholder-tertiary p-1"
        calendarClassName="my-datepicker"
        minDate={new Date(2025, 0, 1)} // Jan = 0
        maxDate={new Date(2025, 7, 29)} // Aug = 7
        isClearable
        showPopperArrow={false}
      />
      <small>End Date</small>
      <DatePicker
        placeholderText={`Select an end date`}
        dateFormat="MMMM d, yyyy" // -> August 25, 2025
        wrapperClassName="w-full"
        className="focus:outline-none w-full border-b border-primary text-lg bg-accent placeholder-tertiary p-1"
        calendarClassName="my-datepicker"
        minDate={new Date(2025, 0, 1)} // Jan = 0
        maxDate={new Date(2025, 7, 29)} // Aug = 7
        isClearable
        showPopperArrow={false}
      />
    </div>
  );
}
