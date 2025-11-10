import DateInput from "./DateInput";

export default function Filters() {
  return (
    <div className="col-span-1 flex flex-col gap-4">
      <h2>Filters</h2>
      <Input label="State" inputType="text" />
      <DateInput dateType="Start" />
      <DateInput dateType="End" />
    </div>
  );
}

function Input({ label, inputType }) {
  return (
    <div>
      <h4>{label}</h4>
      <input
        type={inputType}
        className="focus:outline-none w-full border-b border-primary text-lg bg-accent placeholder-tertiary p-1"
        placeholder="CA"
      />
    </div>
  );
}
