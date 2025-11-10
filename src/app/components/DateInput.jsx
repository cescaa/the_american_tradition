"use client";
import { useEffect } from "react";
import DatePicker from "react-datepicker";

export default function DateInput({ dateType = "", placeholderDate }) {
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
      <h4>{dateType} Date</h4>
      <DatePicker
        placeholderText={`Select a ${dateType.toLowerCase()} date`}
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
