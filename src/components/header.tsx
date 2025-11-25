import Link from "next/link";
import { Zap } from "./zap";

export const Header = ({
  hasStartTestButton,
}: {
  hasStartTestButton: boolean;
}) => (
  <header className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-sm shadow-lg">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
      <Link href="/">
        <div className="flex items-center">
          <Zap className="h-6 w-6 text-indigo-400 mr-2" />
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-white tracking-tight -mb-1">
              Quizzy<span className="text-indigo-400">Dock</span>
            </span>
            <span className="text-[12px] font-medium text-gray-400 tracking-wider">
              TECH SKILLS
            </span>
          </div>
        </div>
      </Link>
      <nav className="hidden md:flex space-x-8">
        {/* {["Subjects", "Features", "Pricing", "Start Test"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase().replace(" ", "-")}`}
            className="text-gray-300 hover:text-indigo-400 transition duration-150 font-medium"
          >
            {item}
          </a>
        ))} */}
      </nav>
      {hasStartTestButton && (
        <a
          href={`${process.env.NEXT_PUBLIC_PLAY_STORE_URL}`}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-full transition duration-300 shadow-lg shadow-indigo-500/50"
        >
          Download App
        </a>
      )}
      {/* <button className="md:hidden text-white focus:outline-none">
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          ></path>
        </svg>
      </button> */}
    </div>
  </header>
);
