import React from "react";
import { PanelRightClose } from "lucide-react";
import ThemeToggleBtn from "../../../Components/Customs/ThemeToggleBtn";
import { User } from "lucide-react";


const TopBar = ({ user }) => {
  console.log(user)
  return (
    <nav className="py-4 rounded-2xl m-6 bg-base-300 flex justify-between lg:justify-end items-center px-4">
      {/* Mobile Drawer Toggle */}
      <label
        htmlFor="dashboard-drawer"
        aria-label="open sidebar"
        className="btn btn-square btn-ghost lg:hidden"
      >
        <PanelRightClose />
      </label>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center bg-linear-to-r from-cyan-400 to-teal-500 px-4 py-1.5 text-xs md:text-sm text-black rounded-xl shadow-sm">
          <img
            src={user?.photoURL || "https://i.ibb.co/yP7s5gZ/user.png"}
            alt="profile"
            className="w-8 h-8 rounded-full border-2 border-white mr-3"
          />
          <div className="flex flex-col">
             <h4 className="">{user?.email.split("@")[0]}</h4>
            <span className="opacity-80 text-[10px] md:text-xs">{user?.email}</span>
          </div>
        </div>
        
        <div className="divider divider-horizontal mx-0"></div>
        <ThemeToggleBtn />
      </div>
    </nav>
  );
};

export default TopBar;