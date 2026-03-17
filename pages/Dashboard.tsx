import React, { useEffect, useState } from "react";

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

const getGSTDeadlines = (): Deadline[] => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const deadlines = [
    { title: "GSTR-1 Filing", day: 11 },
    { title: "GSTR-3B Filing", day: 20 },
    { title: "TDS Payment", day: 7 },
  ];

  return deadlines.map((item) => {
    const dueDate = new Date(year, month, item.day);

    // Move to next month if already passed
    if (dueDate < today) {
      dueDate.setMonth(month + 1);
    }

    const diffTime = dueDate.getTime() - today.getTime();
    const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return {
      title: item.title,
      dueDate: dueDate.toDateString(),
      daysLeft,
    };
  });
};

const Dashboard: React.FC<DashboardProps> = ({
  onNavigate,
  selectedMonth,
  setSelectedMonth
}) => {
  const [deadlines, setDeadlines] = useState<Deadline[]>([]);

  useEffect(() => {
    setDeadlines(getGSTDeadlines());
  }, []);

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
        <h3 className="font-bold text-slate-600 mb-3">UPCOMI
