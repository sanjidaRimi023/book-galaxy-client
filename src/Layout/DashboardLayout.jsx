import { Home, HomeIcon, PanelRightClose, Settings } from "lucide-react";
import React from "react";
import ThemeToggleBtn from "../Components/Customs/ThemeToggleBtn";
import { useAuth } from "../Hooks/useAuth";
import icon from "../assets/book.png";
import { Link } from "react-router";
import ComingSoonPage from "../Components/Customs/come-soon";
const DashboardLayout = () => {
  const { user } = useAuth();

  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        {/* top section */}
        <div className="drawer-content bg-base-200">
          <nav className="py-4 rounded-2xl m-6 bg-white dark:bg-stone-800">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost lg:hidden"
            >
              {/* Sidebar toggle icon */}
              <PanelRightClose />
            </label>

            <div className="flex justify-between items-center px-4">
              <label className="input border-primary bg-base-200">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </g>
                </svg>
                <input type="search" required placeholder="Search" />
              </label>
              <div className="flex items-center">
                <img
                  src={user?.photoURL || "https://i.ibb.co/yP7s5gZ/user.png"}
                  alt="profile"
                  className="w-10 h-10 rounded-full border-2 border-primary cursor-pointer"
                />
                <div
                  className="flex flex-col border border-primary 
                  bg-gradient-to-r 
                  from-[#1df3ef] 
                  via-[#14e9cc] 
                  to-[#13b1b1] 
                  px-4 py-1/2 text-sm text-black rounded-xl ml-4"
                >
                  <span>{user?.displayName}</span>
                  <span>{user?.email}</span>
                </div>
                <div className="divider divider-horizontal"></div>
                <ThemeToggleBtn />
              </div>
            </div>
          </nav>
          {/*TODO: Page content here ->build dynamic */}
          <div className="p-4">
            
            <ComingSoonPage/>
          </div>
        </div>

        <div className="drawer-side is-drawer-close:overflow-visible ">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="flex min-h-full flex-col items-start is-drawer-close:w-14 is-drawer-open:w-64 bg-white dark:bg-stone-800">
            {/* Sidebar content here */}
            <div className="px-8 py-6 flex text-2xl gap-2 font-bold items-center">
              <img src={icon} className="w-10" alt="website logo" />
              BookGalaxy
            </div>
            <ul className="menu w-full grow px-10">
              {/* List item */}
              <li>
                <Link to="/"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Homepage"
                >
                  {/* Home icon */}
                  <HomeIcon />
                  <span className="is-drawer-close:hidden">Homepage</span>
                </Link>
              </li>

              {/* List item */}
              <li>
                <Link to="/"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Settings"
                >
                  {/* Settings icon */}
                  <Settings />
                  <span className="is-drawer-close:hidden">Settings</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
