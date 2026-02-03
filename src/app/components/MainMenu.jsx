"use client";
import { usePathname } from "next/navigation";
import SearchBar from "./SearchBar";
import Link from "next/link";

export default function MainMenu() {
  const pathname = usePathname();

  const menuItems = [
    { pageName: "Home", pathName: "/" },
    { pageName: "Sources", pathName: "/sources" },
  ];
  //     { pageName: "Petition", pathName: "/petition" },

  return (
    <div className="main-side-padding w-full h-24 bg-background border-b border-primary py-4 pt-6 flex items-center gap-30 fixed z-50">
      <SearchBar />

      <div className="flex-1 text-secondary">
        <ul className="flex font-cor-sc justify-between">
          {menuItems.map((item) => {
            const isActive = pathname === item.pathName;

            return (
              <li key={item.pathName}>
                <Link
                  href={item.pathName}
                  className={`text-lg transition ${
                    isActive ? "underline underline-offset-8" : ""
                  }`}
                >
                  {item.pageName}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
