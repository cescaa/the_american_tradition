import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function SearchBar() {
  return (
    <div className="w-7/12 flex items-center gap-4  bg-accent p-2 rounded-sm">
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        className="text-primary text-2xl"
      />
      <input
        type="text"
        className="flex-1 focus:outline-none h-full text-xl placeholder-tertiary"
        placeholder="Search shootings in American schools"
      />
    </div>
  );
}
