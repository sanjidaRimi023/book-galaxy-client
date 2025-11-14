// dashboardItems.js
import { MdDashboard } from "react-icons/md";
import { SiBlogger } from "react-icons/si";
import { FaUserCircle, FaUsersCog } from "react-icons/fa";
import { IoPricetagsOutline, IoAddCircleOutline } from "react-icons/io5";
import { RiListSettingsFill } from "react-icons/ri";
import { TiUserAdd } from "react-icons/ti";

export const dashboardItems = {
  user: [
    { path: "/dashboard/user", title: "Dashboard", icon: MdDashboard },
    {
      path: "/dashboard/user/my-books",
      title: "borrowed Books",
      icon: SiBlogger,
    },
    { path: "/dashboard/user/profile", title: "Profile", icon: FaUserCircle },
    {
      path: "/dashboard/user/subscription",
      title: "Subscriptions",
      icon: IoPricetagsOutline,
    },
    {
      path: "/dashboard/user/add-article",
      title: "Add Article",
      icon: IoAddCircleOutline,
    },
  ],
  admin: [
    { path: "/dashboard/admin", title: "Admin Dashboard", icon: MdDashboard },
    {
      path: "/dashboard/admin/manage-users",
      title: "Manage Users",
      icon: RiListSettingsFill,
    },
    {
      path: "/dashboard/admin/manage-articles",
      title: "Manage Articles",
      icon: SiBlogger,
    },
    {
      path: "/dashboard/admin/add-publisher",
      title: "Add Publisher",
      icon: TiUserAdd,
    },
    {
      path: "/dashboard/admin/manage-publisher",
      title: "Manage Publisher",
      icon: FaUsersCog,
    },
  ],
  librarian: [
    // optional: sample librarian items
    {
      path: "/dashboard/librarian",
      title: "Librarian Dashboard",
      icon: MdDashboard,
    },
    {
      path: "/dashboard/librarian/manage-books",
      title: "Manage Books",
      icon: RiListSettingsFill,
    },
  ],
};
