import { Mail, Search, Shield, UserCheck } from "lucide-react";
import { useState } from "react";
import useAllUsers from "../../../Hooks/useAllUser";

const ManageUsers = () => {
  const [users, loading] = useAllUsers();
  const [searchTerm, setSearchTerm] = useState("");

  // Filtering Logic
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading)
    return <div className="p-10 text-center font-bold">Loading Users...</div>;

  return (
    <div className="p-6 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold  tracking-tight">
            User Management
          </h2>
          <p className=" text-sm font-medium">
            Manage and monitor all registered users
          </p>
        </div>

        {/* Search Bar - Modern Design */}
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-blue-500 transition-colors w-5 h-5" />
          <input
            type="text"
            placeholder="Search by name or email..."
            className="pl-10 pr-4 py-2.5 bg-base-100 border border-slate-200 rounded-xl w-full md:w-80 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all shadow-sm"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-base-200 rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-base-100 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider ">
                  User Info
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider ">
                  Role
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider ">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider  text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredUsers.map((u) => (
                <tr
                  key={u._id}
                  className="hover:bg-base-100 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-primary font-bold uppercase overflow-hidden">
                        {u.photoURL ? (
                          <img src={u.photoURL} alt="" />
                        ) : (
                          u.name.slice(0, 2)
                        )}
                      </div>
                      <div>
                        <div className="font-semibold ">{u.name}</div>
                        <div className="text-sm  flex items-center gap-1">
                          <Mail className="w-3 h-3" /> {u.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                        u.role === "admin"
                          ? "bg-accent/10 text-accent"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      {u.role === "admin" ? (
                        <Shield className="w-3 h-3" />
                      ) : (
                        <UserCheck className="w-3 h-3" />
                      )}
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="h-2 w-2 rounded-full bg-green-500 inline-block mr-2 animate-pulse"></span>
                    <span className="text-sm">Active</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-sm font-semibold text-primary ">
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredUsers.length === 0 && (
          <div className="p-20 text-center">
            <p className="font-medium">
              No users found matching "{searchTerm}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
