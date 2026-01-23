import Link from "next/link";
import SearchBar from "./SearchBar";

export default function MainMenu() {
  const menuItems = [
    {
      pageName: "Home",
      pathName: "#",
    },
    {
      pageName: "Petition",
      pathName: "#",
    },
    {
      pageName: "Sources",
      pathName: "#",
    },
  ];

  return (
    <div className="main-side-padding w-full h-24 bg-background border-b border-primary py-4 pt-6 flex items-center gap-36 fixed z-900">
      <SearchBar />
      <div className="flex-1 text-secondary">
        <ul className="flex font-cor-sc justify-between ">
          {menuItems.map((item, i) => (
            <li key={i}>
              <Link className="text-lg" href={item.pathName}>
                {item.pageName}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
