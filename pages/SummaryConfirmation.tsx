import React, { useState } from "react";
import { Language } from "../types";

interface Props {
  lang: Language;
  selectedMonth: string;
}

const SummaryConfirmation: React.FC<Props> = ({ selectedMonth }) => {

  const [activeTab, setActiveTab] = useState<"gstr1" | "gstr3b">("gstr1");

  return (
    <div className="p-4 flex flex-col gap-5">

      {/* GST Selector */}
      <div className="bg-slate-200 rounded-xl p-1 flex">
        <button
          onClick={() => setActiveTab("gstr1")}
          className={`flex-1 py-2 rounded-lg font-bold ${
            activeTab === "gstr1"
              ? "bg-white text-blue-600 shadow"
              : "text-slate-500"
          }`}
        >
          GSTR-1
        </button>

        <button
          onClick={() => setActiveTab("gstr3b")}
          className={`flex-1 py-2 rounded-lg font-bold ${
            activeTab === "gstr3b"
              ? "bg-white text-blue-600 shadow"
              : "text-slate-500"
          }`}
        >
          GSTR-3B
        </button>
      </div>

      {/* Filing Deadline */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex justify-between items-center">
        <div>
          <p className="text-xs font-bold text-amber-700 uppercase">
            Filing Deadline
          </p>
          <p className="text-lg font-bold text-slate-800">
            11th Nov 2023
          </p>
        </div>

        <span className="bg-amber-200 text-amber-900 px-3 py-1 rounded-full text-xs font-bold">
          {selectedMonth}
        </span>
      </div>

      {/* Summary Card */}
      <div className="bg-white rounded-2xl border shadow-sm p-5">

        <h2 className="font-bold text-lg mb-3">
          Verify GSTR-1
        </h2>

        <div className="bg-slate-50 rounded-xl p-4 mb-4">
          <p className="text-xs text-slate-500 uppercase font-bold">
            Total Sales Value
          </p>
          <p className="text-2xl font-bold text-slate-900">
            ₹4,25,000
          </p>
          <p className="text-sm text-blue-600 font-semibold">
            12 Tax Invoices Detected
          </p>
        </div>

        <div className="flex justify-between items-center mb-4">
          <p className="text-slate-600">Output GST Liability</p>
          <p className="font-bold text-slate-800">₹76,500</p>
        </div>

        <button className="w-full border rounded-xl py-3 font-semibold">
          Download Sales Data
        </button>

      </div>

      {/* Confirm + Submit */}
      <div className="flex items-center gap-2">
        <input type="checkbox" />
        <p className="text-sm">
          I confirm the GSTR-1 sales summary details for this filing
        </p>
      </div>

      <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold">
        Submit for Filing
      </button>

    </div>
  );
};

export default SummaryConfirmation;
