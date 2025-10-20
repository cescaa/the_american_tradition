import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
//import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';

export default function Home() {
  return (
    <>
      <div className="main-side-padding w-full h-20 bg-background border-b-1 border-primary py-2 flex items-center gap-36">
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
        <div className="flex-1 text-secondary">
          <ul className="flex font-cor-sc justify-between ">
            <li>
              <Link className="text-lg" href="#">
                Home
              </Link>
            </li>
            <li>
              <Link className="text-lg" href="#">
                Browse Shootings
              </Link>
            </li>
            <li>
              <Link className="text-lg" href="#">
                Stories
              </Link>
            </li>
            <li>
              <Link className="text-lg" href="#">
                Sources
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <main className="main-side-padding py-8 grid gap-4 grid-cols-[repeat(auto-fit,minmax(12rem,1fr))]">
        <div className="col-span-1 ">
          <div>
            <input
              type="text"
              className="focus:outline-none w-full border-b-1 border-primary text-lg bg-accent placeholder-tertiary p-1"
              placeholder="CA"
            />
          </div>
        </div>
        <div className="col-span-3  flex flex-col gap-2">
          <div className="p-4 flex flex-col gap-2">
            <h3>Wilson Elementary School</h3>
            <div className="flex gap-8">
              <h4>Fresno, CA</h4>
              <h4>August 29, 2025</h4>
            </div>
            <p>
              Adult with rifle, shotgun, and handgun fired through the windows
              of the schools church at students who were inside for morning mass
            </p>
          </div>
          <div className="p-4 flex flex-col gap-2 bg-tertiary/10">
            <h3>Wilson Elementary School</h3>
            <div className="flex gap-8">
              <h4>Fresno, CA</h4>
              <h4>August 29, 2025</h4>
              <h4>123</h4>
            </div>
            <p>
              Adult with rifle, shotgun, and handgun fired through the windows
              of the schools church at students who were inside for morning mass
            </p>
          </div>{" "}
          <div className="p-4 flex flex-col gap-2">
            <h3>Wilson Elementary School</h3>
            <div className="flex gap-8">
              <h4>Fresno, CA</h4>
              <h4>August 29, 2025</h4>
            </div>
            <p>
              Adult with rifle, shotgun, and handgun fired through the windows
              of the schools church at students who were inside for morning mass
            </p>
          </div>
        </div>
        <div className="col-span-3 bg-accent">c</div>
      </main>
    </>
  );
}
