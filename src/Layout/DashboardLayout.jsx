import {
  ArchiveRestore,
  Home,
  HomeIcon,
  LayoutDashboard,
  LogOut,
  PanelRightClose,
  Settings,
  ShieldUser,
} from "lucide-react";
import React from "react";
import ThemeToggleBtn from "../Components/Customs/ThemeToggleBtn";
import { useAuth } from "../Hooks/useAuth";
import icon from "../assets/book.png";
import { Link, Outlet, useNavigate } from "react-router";
import DashboardSideBar from "../Components/Customs/dashboard-sidebar";
import toast from "react-hot-toast";
import useUserRole from "../Hooks/useUserRole";

const SideBarContent = ({ navItems, handleLogout }) => {
  return (
    <>
      <div className="flex flex-col justify-between">
        <div>
          <DashboardSideBar navItems={navItems} />
        </div>

        <div>
          <button
            onClick={handleLogout}
            className="flex gap-2 items-center justify-center px-4 py-1.5 my-4 text-lg font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition w-52 ml-4"
          >
            <LogOut />
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

const DashboardLayout = () => {
  const { user, logOutUser } = useAuth();
  const navigate = useNavigate();
  const userRole = useUserRole();
  const isAdmin = userRole.role === "admin";
  console.log(isAdmin);

  const handleLogout = async () => {
    try {
      await logOutUser();
      toast.success("logout successfully");
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const dashboardItems = {
    user: [
      {
        path: "/dashboard/user/overview",
        title: "Dashboard",
        icon: LayoutDashboard,
      },
      {
        path: "/dashboard/user/borrow-book",
        title: "borrow-book",
        icon: ArchiveRestore,
      },
    ],
    admin: [
      {
        path: "/dashboard/admin",
        title: "Admin Dashboard",
        icon: LayoutDashboard,
      },
      {
        path: "/dashboard/admin/manage-users",
        title: "Manage Users",
        icon: ShieldUser,
      },
    ],
  };

  const navItems = isAdmin ? dashboardItems?.admin : dashboardItems?.user;
  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        {/* top section */}
        <div className="drawer-content bg-base-200">
          <nav className="py-4 rounded-2xl m-6 bg-base-300">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost lg:hidden"
            >
              {/* Sidebar toggle icon */}
              <PanelRightClose />
            </label>

            <div className="md:flex hidden justify-end items-center px-4">
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
                  <span>Name: {user?.displayName}</span>
                  <span>Email : {user?.email}</span>
                </div>
                <div className="divider divider-horizontal"></div>
                <ThemeToggleBtn />
              </div>
            </div>
          </nav>
          <div className="mx-8 bg-base-300 mb-4 rounded-2xl p-4">
            <Outlet />
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
            <Link
              to="/"
              className="px-8 py-6 flex text-2xl gap-2 font-bold items-center"
            >
              <img src={icon} className="w-10" alt="website logo" />
              BookGalaxy
            </Link>
            <div>
              <SideBarContent
                navItems={navItems}
                user={user}
                handleLogout={handleLogout}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
