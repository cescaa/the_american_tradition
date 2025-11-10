import Link from "next/link";
import SearchBar from "./SearchBar";

export default function MainMenu() {
  const menuItems = [
    {
      pageName: "Home",
      pathName: "#",
    },
    {
      pageName: "Browse Shootings",
      pathName: "#",
    },
    {
      pageName: "Stories",
      pathName: "#",
    },
    {
      pageName: "Stories",
      pathName: "#",
    },
  ];

  return (
    <div className="main-side-padding w-full h-20 bg-background border-b border-primary py-2 flex items-center gap-36">
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
