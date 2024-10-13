"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path: string) => pathname === path;

  return (
    <header className="w-full absolute z-10">
      <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4 bg-transparent">
        <Link href="/" className="flex justify-center items-center">
          <Image
            src="/logo.svg"
            alt="logo"
            width={30}
            height={30}
            className="object-contain"
          />
          <span className="text-orange-500 text-2xl ml-4 hidden sm:block">GoEVe</span>
        </Link>

        <div className="hidden sm:flex space-x-6">
          <Link
            href="/"
            className={`${isActive("/") ? "bg-orange-500 text-white" : "text-orange-500"
              } hover:bg-orange-600 hover:text-white font-medium py-2 px-4 rounded`}
          >
            Home
          </Link>
          <Link
            href="/create-event"
            className={`${isActive("/create-event") ? "bg-orange-500 text-white" : "text-orange-500"
              } hover:bg-orange-600 hover:text-white font-medium py-2 px-4 rounded`}
          >
            Create Event
          </Link>
          <Link
            href="/calender"
            className={`${isActive("/calender") ? "bg-orange-500 text-white" : "text-orange-500"
              } hover:bg-orange-600 hover:text-white font-medium py-2 px-4 rounded`}
          >
            Calendar
          </Link>
        </div>

        <div className="sm:hidden">
          <button
            type="button"
            className="text-orange-500 focus:outline-none"
            onClick={toggleDropdown}
          >
            <svg
              className="w-8 h-8"
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
          </button>
        </div>

        {isOpen && (
          <div className="absolute top-full right-6 mt-2 w-48 bg-white rounded-lg shadow-lg sm:hidden">
            <Link
              href="/"
              className={`block px-4 py-2 ${isActive("/") ? "bg-orange-500 text-white" : "text-orange-500"
                } hover:bg-orange-600 hover:text-white`}
              onClick={toggleDropdown}
            >
              Home
            </Link>
            <Link
              href="/create-event"
              className={`block px-4 py-2 ${isActive("/create-event") ? "bg-orange-500 text-white" : "text-orange-500"
                } hover:bg-orange-600 hover:text-white`}
              onClick={toggleDropdown}
            >
              Create Event
            </Link>
            <Link
              href="/calender"
              className={`block px-4 py-2 ${isActive("/calender") ? "bg-orange-500 text-white" : "text-orange-500"
                } hover:bg-orange-600 hover:text-white`}
              onClick={toggleDropdown}
            >
              Calendar
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default NavBar;

