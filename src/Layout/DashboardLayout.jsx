import { ArchiveRestore, LayoutDashboard, ShieldUser } from "lucide-react";
import toast from "react-hot-toast";
import { Outlet, useNavigate } from "react-router";

import { useAuth } from "../Hooks/useAuth";
import useUserRole from "../Hooks/useUserRole";
import Sidebar from "../Pages/Dashboard/components/Sidebar";
import TopBar from "../Pages/Dashboard/components/Topbar";

const DashboardLayout = () => {
  const { user, logOutUser } = useAuth();
  const navigate = useNavigate();
  const userRole = useUserRole();
  const isAdmin = userRole?.role === "admin";

  const handleLogout = async () => {
    try {
      await logOutUser();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navItems = isAdmin
    ? [
        { path: "/dashboard/admin", title: "Overview", icon: LayoutDashboard },
        {
          path: "/dashboard/admin/manage-users",
          title: "Users",
          icon: ShieldUser,
        },
        
      ]
    : [
        {
          path: "/dashboard/user/overview",
          title: "Overview",
          icon: LayoutDashboard,
        },
        {
          path: "/dashboard/user/borrow-book",
          title: "My Borrows",
          icon: ArchiveRestore,
        },
      ];

  return (
    <div className="drawer lg:drawer-open min-h-screen">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col">
        <TopBar user={user} />

        <main className="flex-1 px-6 pb-6">
          <div className="bg-base-300 min-h-[calc(100vh-160px)] rounded-3xl p-6 shadow-sm">
            <Outlet />
          </div>
        </main>
      </div>

      <div className="drawer-side z-40">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <Sidebar navItems={navItems} handleLogout={handleLogout} />
      </div>
    </div>
  );
};

export default DashboardLayout;
