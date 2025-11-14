import { Home, HomeIcon, PanelRightClose } from "lucide-react";
import React from "react";
import ThemeToggleBtn from "../Components/Customs/ThemeToggleBtn";

const DashboardLayout = () => {

  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        {/* top section */}
        <div className="drawer-content bg-primary/5">
          <nav className="bg-base-300 py-6 rounded-2xl m-6">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost lg:hidden"
            >
              {/* Sidebar toggle icon */}
              <PanelRightClose />
            </label>

            <div>
              <div className="text-2xl font-semibold px-4 text-primary">
                Welcome to BookGalaxy
              </div>
              <div>
               <ThemeToggleBtn/>
              </div>
            </div>
          </nav>
          {/* Page content here */}
          <div className="p-4">Page Content</div>
        </div>

        <div className="drawer-side is-drawer-close:overflow-visible">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
            {/* Sidebar content here */}
            <span className="px-8 py-6">BookGalaxy</span>
            <ul className="menu w-full grow px-10">
              {/* List item */}
              <li>
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Homepage"
                >
                  {/* Home icon */}
                  <HomeIcon />
                  <span className="is-drawer-close:hidden">Homepage</span>
                </button>
              </li>

              {/* List item */}
              <li>
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Settings"
                >
                  {/* Settings icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="my-1.5 inline-block size-4"
                  >
                    <path d="M20 7h-9"></path>
                    <path d="M14 17H5"></path>
                    <circle cx="17" cy="17" r="3"></circle>
                    <circle cx="7" cy="7" r="3"></circle>
                  </svg>
                  <span className="is-drawer-close:hidden">Settings</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
