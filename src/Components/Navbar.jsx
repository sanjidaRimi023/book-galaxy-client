import React, { useContext, useState } from "react";
import {
  BookCopy,
  BookOpenText,
  BookPlus,
  BookText,
  Clock,
  House,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  PencilRuler,
  Phone,
  UsersRound,
  X,
} from "lucide-react";
import useTheme from "../Hooks/UseTheme";
import { Link, NavLink, useNavigate } from "react-router";
import { Authcontext } from "../Context/AuthContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { user, logOutUser } = useContext(Authcontext);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = async () => {
    try {
      await logOutUser();
      toast.success("Logout successfully");
      navigate("/");
    } catch (error) {
      toast.error("Logout failed", error);
    }
  };

  return (
    <>
      <div className="bg-primary p-4">
        <div className="hidden md:flex w-full flex-col lg:flex-row justify-center items-center text-primary-content">
          <div className="flex gap-2 items-center">
            <Clock size={20} />
            <p>Sunday to Thursday, 9:00 AM to 6:00 PM.</p>
          </div>
          <div className="divider divider-warning lg:divider-horizontal"></div>
          <div className="flex gap-2 items-center">
            <Phone size={20} />
            <p>+88019-4208-4201</p>
          </div>
          <div className="divider divider-warning lg:divider-horizontal"></div>
          <div className="flex gap-2 items-center">
            <Mail size={20} />
            <p>bookgalaxy2000@gmail.com</p>
          </div>
        </div>
      </div>
      <nav className="sticky top-0 z-50">
        <div className="flex justify-between items-center container mx-auto bg-base-300 rounded-full p-3 my-2 shadow-lg">
          <NavLink to="/" className="flex items-center gap-2">
            <BookOpenText className="size-10 text-info" />
            <h1 className="text-xl md:text-3xl font-bold">
              BookGalaxy
            </h1>
          </NavLink>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex flex-wrap gap-4 items-center justify-center">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-1 px-3 py-2 rounded-full transition duration-200 text-sm ${
                  isActive
                    ? "bg-primary text-primary-content"
                    : "hover:text-accent hover:bg-base-200"
                }`
              }
            >
              <House className="size-4" /> Home
            </NavLink>
            <NavLink
              to="/reading-tips"
              onClick={toggleMenu}
              className={({ isActive }) =>
                `flex items-center gap-1 px-3 py-2 rounded-full transition duration-200 text-sm ${
                  isActive
                    ? "bg-primary text-primary-content"
                    : "hover:text-accent hover:bg-base-200"
                }`
              }
            >
              <PencilRuler className="inline size-4 mr-2" />
              Reading Tips
            </NavLink>
            <NavLink
              to="/about-us"
              onClick={toggleMenu}
              className={({ isActive }) =>
                `flex items-center gap-1 px-3 py-2 rounded-full transition duration-200 text-sm  ${
                  isActive
                    ? "bg-primary text-primary-content"
                    : "hover:text-accent hover:bg-base-200"
                }`
              }
            >
             <UsersRound className="inline size-4 mr-2" />
              About Us
            </NavLink>

            {user && (
              <>
                <NavLink
                  to="/all-books"
                  className={({ isActive }) =>
                    `flex items-center gap-1 px-3 py-2 rounded-full transition duration-200 text-sm ${
                      isActive
                        ? "bg-primary text-primary-content"
                        : "hover:text-accent hover:bg-base-200"
                    }`
                  }
                >
                  <BookCopy className="size-4" /> All Books
                </NavLink>
                <NavLink
                  to="/borrowed-books"
                  className={({ isActive }) =>
                    `flex items-center gap-1 px-3 py-2 rounded-full transition duration-200 text-sm ${
                      isActive
                        ? "bg-primary text-primary-content"
                        : "hover:text-accent hover:bg-base-200"
                    }`
                  }
                >
                  <BookText className="size-4" /> Borrowed Books
                </NavLink>
                <NavLink
                  to="/add-book"
                  className={({ isActive }) =>
                    `flex items-center gap-1 px-3 py-2 rounded-full transition duration-200 text-sm ${
                      isActive
                        ? "bg-primary text-primary-content"
                        : "hover:text-accent hover:bg-base-200"
                    }`
                  }
                >
                  <BookPlus className="size-4" /> Add Book
                </NavLink>
              </>
            )}
          </div>

          {/* Desktop User Area & Theme Toggle */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="relative">
                <img
                  src={user.photoURL || "https://i.ibb.co/yP7s5gZ/user.png"}
                  alt="profile"
                  className="w-10 h-10 rounded-full border-2 border-primary cursor-pointer"
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                />
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-64 bg-base-100 rounded-xl shadow-lg p-4 z-50 space-y-3">
                    {/* User Info */}
                    <div>
                      <p className="font-semibold text-base-content">
                        {user?.displayName || "No Name"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {user?.email || "No Email"}
                      </p>
                    </div>

                    <div className="divider my-1"></div>

                    {/* Dashboard Link */}
                    <Link
                      to="/dashboard"
                      onClick={() => setShowProfileMenu(false)}
                      className="flex items-center justify-center gap-2 text-primary border border-primary px-4 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-200"
                    >
                      <LayoutDashboard size={18} /> Dashboard
                    </Link>

                    {/* Logout Button */}
                    <button
                      onClick={() => {
                        handleLogout();
                        setShowProfileMenu(false);
                      }}
                      className="flex w-full justify-center items-center gap-2 text-red-500 border border-red-500 px-4 py-2 rounded-full hover:bg-red-500 hover:text-white transition-all duration-200"
                    >
                      <LogOut size={18} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login">
                  <button className="btn btn-primary">Login</button>
                </Link>
                <Link to="/register">
                  <button className="btn btn-primary">Register</button>
                </Link>
              </>
            )}

            <label className="swap swap-rotate">
              <input
                type="checkbox"
                className="theme-controller"
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

          {/* Mobile Hamburger Menu Icon */}
          <div className="lg:hidden">
            <button onClick={toggleMenu} className="text-base-content">
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden bg-base-200 border-t px-4 pb-4 space-y-2">
            <NavLink
              to="/"
              onClick={toggleMenu}
              className={({ isActive }) =>
                `block py-2 ${isActive ? "text-primary" : "text-base-content"}`
              }
            >
              <House className="inline size-4 mr-2" />
              Home
            </NavLink>
            <NavLink
              to="/reading-tips"
              onClick={toggleMenu}
              className={({ isActive }) =>
                `block py-2 ${isActive ? "text-primary" : "text-base-content"}`
              }
            >
              <House className="inline size-4 mr-2" />
              Reading Tips
            </NavLink>

            {user && (
              <>
                <NavLink
                  to="/borrowed-books"
                  onClick={toggleMenu}
                  className={({ isActive }) =>
                    `block py-2 ${
                      isActive ? "text-primary" : "text-base-content"
                    }`
                  }
                >
                  <BookText className="inline size-4 mr-2" />
                  Borrowed Books
                </NavLink>
                <NavLink
                  to="/all-books"
                  onClick={toggleMenu}
                  className={({ isActive }) =>
                    `block py-2 ${
                      isActive ? "text-primary" : "text-base-content"
                    }`
                  }
                >
                  <BookCopy className="inline size-4 mr-2" />
                  All Books
                </NavLink>
                <NavLink
                  to="/add-book"
                  onClick={toggleMenu}
                  className={({ isActive }) =>
                    `block py-2 ${
                      isActive ? "text-primary" : "text-base-content"
                    }`
                  }
                >
                  <BookPlus className="inline size-4 mr-2" />
                  Add Book
                </NavLink>
              </>
            )}
            <div className="divider"></div>
            {user ? (
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-base-content">
                    {user.displayName || "User"}
                  </p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <button onClick={handleLogout} className="btn btn-sm btn-error">
                  <span className="flex gap-2">
                    {" "}
                    <LogOut /> Logout
                  </span>
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link to="/login" onClick={toggleMenu} className="flex-1">
                  <button className="btn btn-primary w-full">Login</button>
                </Link>
                <Link to="/register" onClick={toggleMenu} className="flex-1">
                  <button className="btn btn-primary w-full">Register</button>
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
