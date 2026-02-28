import { BookOpen, RotateCcw, Clock } from "lucide-react";
import StatCard from "./StatCard"; 

const UserStats = ({ summary }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard
        icon={BookOpen}
        title="Currently Borrowed"
        value={summary?.borrowedCount || 0}
        iconColor="#3b82f6"
        delay={0.1}
      />
      <StatCard
        icon={RotateCcw}
        title="Total Returned"
        value={summary?.returnedCount || 0}
        iconColor="#10b981"
        delay={0.2}
      />
      <StatCard
        icon={Clock}
        title="Pending Returns"
        value={summary?.pendingCount || 0}
        iconColor="#f43f5e"
        delay={0.3}
      />
    </div>
  );
};

export default UserStats;