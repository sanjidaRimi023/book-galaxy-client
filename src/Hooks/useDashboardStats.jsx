// hooks/useDashboardStats.js
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useDashboardStats = () => {
  const axiosSecure = useAxiosSecure();
  return useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/dashboard");
      return res.data; // Expected: { totalBooks, borrowed, activeMembers, overdue, trends }
    },
  });
};

export default useDashboardStats;