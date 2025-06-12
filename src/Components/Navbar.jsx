import React from "react";
import {
  BookCopy,
  BookOpenText,
  BookPlus,
  BookText,
  House,
} from "lucide-react";
import useTheme from "../Hooks/UseTheme";
import { Link, NavLink } from "react-router";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <nav className="">
        <div className="flex justify-between items-center container mx-auto bg-base-300 rounded-full p-3 my-2">
          <NavLink to='/' className="flex items-center gap-2">
            <BookOpenText className="text-primary size-10" />
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#01ecc9] via-[#01e7d4] to-[#00d4ff] bg-clip-text text-transparent">
              BookGalaxy
            </h1>
          </NavLink>
          <div className="flex flex-wrap gap-4 items-center justify-center md:justify-start">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-1 px-3 py-2 rounded-full transition duration-200 ${
                  isActive
                    ? "bg-primary text-primary-content border-primary"
                    : "hover:text-accent hover:bg-base-200"
                }`
              }
            >
              <House className="size-5" /> Home
            </NavLink>

            <NavLink
              to="/all-books"
              className={({ isActive }) =>
                `flex items-center gap-1 px-3 py-2 rounded-full transition duration-200 ${
                  isActive
                    ? "bg-primary text-primary-content border-primary"
                    : "hover:text-accent hover:bg-base-200"
                }`
              }
            >
              <BookCopy className="size-5" /> All Books
            </NavLink>

            <NavLink
              to="/borrowed-books"
              className={({ isActive }) =>
                `flex items-center gap-1 px-3 py-2 rounded-full transition duration-200 ${
                  isActive
                    ? "bg-primary text-primary-content border-primary"
                    : "hover:text-accent hover:bg-base-200"
                }`
              }
            >
              <BookText className="size-5" /> Borrowed Books
            </NavLink>

            <NavLink
              to="/add-book"
              className={({ isActive }) =>
                `flex items-center gap-1 px-3 py-2 rounded-full transition duration-200 ${
                  isActive
                    ? "bg-primary text-primary-content border-primary"
                    : "hover:text-accent hover:bg-base-200"
                }`
              }
            >
              <BookPlus className="size-5" /> Add Book
            </NavLink>
          </div>

          <div className="flex gap-2">
            <Link to='/login'>
              <button className="btn btn-primary">Login</button>
            </Link>
            <Link to='/register'>
              <button className="btn btn-primary">Register</button>
            </Link>

            <label className="swap swap-rotate">
              <input
                type="checkbox"
                className="theme-controller"
                value="dark"
                checked={theme === "dark"}
                onChange={(e) => toggleTheme(e.target.checked)}
              />

              <svg
                className="swap-off h-8 w-8 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>

              <svg
                className="swap-on h-8 w-8 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
