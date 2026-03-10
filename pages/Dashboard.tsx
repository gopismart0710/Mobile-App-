import React from "react";

interface Props {
  lang: string;
  onNavigate: any;
  selectedMonth: string;
  setSelectedMonth: any;
}

const Dashboard: React.FC<Props> = ({ selectedMonth }) => {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>
      <p>Selected Month: {selectedMonth}</p>
    </div>
  );
};

export default Dashboard;
