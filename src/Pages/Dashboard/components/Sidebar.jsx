import { LogOut } from "lucide-react";
import { Link, NavLink } from "react-router";
import icon from "/book.png";

const Sidebar = ({ navItems, handleLogout }) => {
  return (
    <div className="flex flex-col h-full w-64 bg-base-300">
      <Link
        to="/"
        className="px-8 py-8 flex text-2xl gap-2 font-bold items-center"
      >
        <img src={icon} className="w-10" alt="BookGalaxy" />
        <span className="tracking-tight">BookGalaxy</span>
      </Link>

      <div className="flex-1 px-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-primary text-white"
                  : "text-gray-600 dark:text-gray-300 hover:bg-base-200 dark:hover:bg-stone-800"
              }`
            }
          >
            <item.icon size={20} />
            <span className="font-medium">{item.title}</span>
          </NavLink>
        ))}
      </div>

      {/* Logout Footer */}
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-white bg-red-500 hover:bg-red-600 rounded-xl transition-all font-semibold"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
