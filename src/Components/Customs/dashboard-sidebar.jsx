import React from "react";
import { Link, useLocation } from "react-router";

export default function DashboardSideBar({ navItems }) {
  const { pathname: path } = useLocation();
  return (
    <nav className="space-y-4 w-56">
      {navItems?.map((nav, idx) => (
        <Link
          to={nav?.path}
          key={idx}
          className={`flex ml-5 items-center justify-center px-4 py-2 ${
            path == nav?.path ? "bg-primary dark:text-black " : "bg-base-200"
          } rounded-md`}
        >
          {nav?.icon && <nav.icon />}
          <span className="mx-2 font-medium">{nav?.title}</span>
        </Link>
      ))}
    </nav>
  );
}
