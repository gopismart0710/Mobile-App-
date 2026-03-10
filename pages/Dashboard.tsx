import React from "react";

interface DashboardProps {
  lang: string;
  onNavigate: any;
  selectedMonth: string;
  setSelectedMonth: any;
}

const Dashboard: React.FC<DashboardProps> = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>
      <p>Kanaku App Running Successfully</p>
    </div>
  );
};

export default Dashboard;
