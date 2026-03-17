import React from "react";

interface DashboardProps {
  lang: string;
  onNavigate: any;
  selectedMonth: string;
  setSelectedMonth: any;
}
interface Deadline {
  title: string;
  dueDate: string;
  daysLeft: number;
}

const Dashboard: React.FC<DashboardProps> = ({
  onNavigate,
  selectedMonth,
  setSelectedMonth
}) => {
  return (
    <div className="p-4 space-y-6">

      {/* Welcome Card */}
      <div className="bg-white rounded-2xl shadow p-5">
        <p className="text-slate-500 text-sm">Welcome back,</p>
        <h2 className="text-2xl font-bold text-slate-800">AK Enterprises</h2>

        <div className="mt-4 border rounded-xl p-3 flex justify-between items-center">
          <span className="text-slate-700">{selectedMonth}</span>
          <span>▼</span>
        </div>
      </div>

      {/* Filing Status */}
      <div>
        <h3 className="font-bold text-slate-600 mb-3">FILING STATUS</h3>

        <div className="grid grid-cols-2 gap-4">

          <div className="bg-white rounded-xl p-4 shadow">
            <p className="text-slate-400 text-sm">GSTR-1</p>
            <p className="font-bold text-lg">In Progress</p>
            <p className="text-sm text-slate-500">Docs pending: 4</p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow">
            <p className="text-slate-400 text-sm">GSTR-3B</p>
            <p className="font-bold text-lg">Not Started</p>
            <p className="text-sm text-slate-500">Upload sales first</p>
          </div>

        </div>
      </div>

      {/* Deadlines */}
      <div>
        <h3 className="font-bold text-slate-600 mb-3">UPCOMING DEADLINES</h3>

        <div className="bg-white rounded-xl p-4 shadow mb-3">
          <p className="font-semibold">GSTR-1 Filing</p>
          <p className="text-sm text-slate-500">Deadline: 11th Nov 2023</p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow mb-3">
          <p className="font-semibold">GSTR-3B Filing</p>
          <p className="text-sm text-slate-500">Deadline: 20th Nov 2023</p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow">
          <p className="font-semibold">TDS Payment</p>
          <p className="text-sm text-slate-500">Deadline: 7th Nov 2023</p>
        </div>
      </div>

      {/* Quick Button */}
      <button
        onClick={() => onNavigate("docs")}
        className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold"
      >
        Go to Docs
      </button>

    </div>
  );
};

export default Dashboard;
