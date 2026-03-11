import React from "react";

interface DashboardProps {
  lang: string;
  onNavigate: any;
  selectedMonth: string;
  setSelectedMonth: any;
}

const Dashboard: React.FC<DashboardProps> = ({
  lang,
  onNavigate,
  selectedMonth,
  setSelectedMonth
}) => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>
      <p>Kanaku App Running Successfully</p>

      <button
        onClick={() => onNavigate("docs")}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          background: "#1e3a8a",
          color: "white",
          border: "none",
          borderRadius: "6px"
        }}
      >
        Go to Docs
      </button>
    </div>
  );
};

export default Dashboard;
