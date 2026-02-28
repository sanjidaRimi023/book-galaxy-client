import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useUserDashboard = () => {
  const axiosSecure = useAxiosSecure();
  return useQuery({
    queryKey: ["user-dashboard-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/dashboard");
      return res.data;
    },
  });
};

export default useUserDashboard;