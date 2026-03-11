import React from "react";

interface DashboardProps {
  lang: string;
  onNavigate: any;
  selectedMonth: string;
  setSelectedMonth: any;
}

const Dashboard: React.FC<DashboardProps> = ({
  onNavigate,
  selectedMonth
}) => {
  return (
    <div className="p-4 space-y-6">

      {/* Welcome Card */}
      <div className="bg-white rounded-2xl shadow p-5">
        <p className="text-slate-500 text-sm">Welcome back,</p>
        <h2 className="text-2xl font-bold text-slate
