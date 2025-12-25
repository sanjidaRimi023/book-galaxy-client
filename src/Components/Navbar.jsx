import React, { useState } from "react";
import {
  BookCopy,
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
import { Link, NavLink, useNavigate } from "react-router";
import toast from "react-hot-toast";
import ThemeToggleBtn from "./Customs/ThemeToggleBtn";
import { useAuth } from "../Hooks/useAuth";
import icon from "../assets/book.png";

// eslint-disable-next-line no-unused-vars
const NavItem = ({ to, icon: Icon, label, onClick, mobile = false }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      mobile
        ? `block py-2 ${isActive ? "text-primary" : "text-base-content"}`
        : `flex items-center gap-1 px-3 py-2 rounded-full text-sm transition ${
            isActive
              ? "bg-primary text-primary-content"
              : "hover:text-accent hover:bg-base-200"
          }`
    }
  >
    <Icon className="size-4 mr-2" />
    {label}
  </NavLink>
);

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logOutUser } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = async () => {
    try {
      await logOutUser();
      toast.success("Logout successfully");
      navigate("/");
    } catch {
      toast.error("Logout failed");
    }
  };


  const publicLinks = [
    { to: "/", label: "Home", icon: House },
    { to: "/reading-tips", label: "Reading Tips", icon: PencilRuler },
    { to: "/about-us", label: "About Us", icon: UsersRound },
  ];

  const privateLinks = [
    { to: "/all-books", label: "All Books", icon: BookCopy },
    { to: "/add-book", label: "Add Book", icon: BookPlus },
  ];

  return (
    <>
      {/* Top Info Bar */}
      <div className="bg-primary p-4 hidden md:flex justify-center text-primary-content overflow-hidden">
        <div className="flex flex-wrap gap-6 items-center">
          <span className="flex gap-2 items-center">
            <Clock size={18} /> Sunday to Thursday, 9:00 AM to 6:00 PM
          </span>
          <span className="flex gap-2 items-center">
            <Phone size={18} /> +88019-4208-4201
          </span>
          <span className="flex gap-2 items-center">
            <Mail size={18} /> bookgalaxy2000@gmail.com
          </span>
        </div>
      </div>

      <nav className="sticky top-0 z-50">
        <div className="container mx-auto bg-base-300 rounded-full p-3 my-2 shadow-lg flex justify-between items-center">
   
          <NavLink to="/" className="flex items-center gap-2">
            <img src={icon} alt="BookGalaxy" className="w-10" />
            <h1 className="text-xl md:text-3xl font-bold">BookGalaxy</h1>
          </NavLink>

 
          <div className="hidden lg:flex gap-2 items-center">
            {publicLinks.map((link) => (
              <NavItem key={link.to} {...link} />
            ))}
            {user &&
              privateLinks.map((link) => (
                <NavItem key={link.to} {...link} />
              ))}
          </div>

  
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="relative">
                <img
                  src={user.photoURL || "https://i.ibb.co/yP7s5gZ/user.png"}
                  alt="profile"
                  className="w-10 h-10 rounded-full border-2 border-primary cursor-pointer"
                  onClick={() => setShowProfileMenu((v) => !v)}
                />

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-64 bg-base-200 rounded-xl shadow-lg p-4 space-y-3">
                    <div>
                      <p className="font-semibold">
                        {user.displayName || "No Name"}
                      </p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>

                    <div className="divider" />

                    <Link
                      to="/dashboard"
                      onClick={() => setShowProfileMenu(false)}
                      className="flex justify-center items-center gap-2 bg-primary text-white px-4 py-2 rounded-full"
                    >
                      <LayoutDashboard size={18} /> Dashboard
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="flex justify-center items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full w-full"
                    >
                      <LogOut size={18} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="btn btn-primary">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary">
                  Register
                </Link>
              </>
            )}
            <ThemeToggleBtn />
          </div>


          <button
            className="lg:hidden"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden bg-base-200 px-4 pb-4">
            {publicLinks.map((link) => (
              <NavItem
                key={link.to}
                {...link}
                mobile
                onClick={() => setMenuOpen(false)}
              />
            ))}

            {user &&
              privateLinks.map((link) => (
                <NavItem
                  key={link.to}
                  {...link}
                  mobile
                  onClick={() => setMenuOpen(false)}
                />
              ))}

            <div className="divider" />

            {user ? (
              <button
                onClick={handleLogout}
                className="btn btn-error w-full"
              >
                <LogOut /> Logout
              </button>
            ) : (
              <div className="flex gap-2">
                <Link to="/login" className="flex-1 btn btn-primary">
                  Login
                </Link>
                <Link to="/register" className="flex-1 btn btn-primary">
                  Register
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
