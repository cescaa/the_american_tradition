"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const router = useRouter(); // allows dynamic navigation
  const [search, setSearch] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (search) {
      router.push(`/incidents?search=${encodeURIComponent(search)}`); // redirect to results page
    }
  }
  return (
    <form
      className="w-3/4 flex items-center gap-4  bg-accent p-4 h-full"
      onSubmit={handleSubmit}
    >
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        className="text-primary text-2xl"
      />
      <input
        type="text"
        className="flex-1 focus:outline-none h-full text-xl placeholder-tertiary"
        placeholder="Search shootings in American schools"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
}
