import React, { useState } from "react";
import { Language } from "../types";

interface Props {
  lang: Language;
  selectedMonth: string;
}

const SummaryConfirmation: React.FC<Props> = ({ lang, selectedMonth }) => {

  const [activeTab, setActiveTab] = useState<"gstr1" | "gstr3b">("gstr1");
  const [confirmed, setConfirmed] = useState(false);

  return (
    <div className="p-4 flex flex-col gap-5">

      {/* Page Title */}
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-bold text-slate-800">
          Dashboard
        </h1>
      </div>

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

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-200 rounded-full flex items-center justify-center">
            ⏰
          </div>

          <div>
            <p className="text-xs font-bold text-amber-700 uppercase">
              Filing Deadline
            </p>

            <p className="text-lg font-bold text-slate-800">
              11th Nov 2023
            </p>
          </div>
        </div>

        <span className="bg-amber-200 text-amber-900 px-3 py-1 rounded-full text-xs font-bold">
          {selectedMonth}
        </span>
      </div>

      {/* Verification Card */}
      <div className="bg-white rounded-2xl border shadow-sm p-5 flex flex-col gap-4">

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            📄
          </div>

          <div>
            <h2 className="font-bold text-lg">
              Verify GSTR-1
            </h2>

            <p className="text-sm text-slate-400">
              {selectedMonth}
            </p>
          </div>
        </div>

        {/* Total Sales */}
        <div className="bg-slate-50 rounded-xl p-4">

          <p className="text-xs text-slate-500 uppercase font-bold">
            Total Sales Value
          </p>

          <p className="text-3xl font-bold text-slate-900">
            ₹4,25,000
          </p>

          <p className="text-sm text-blue-600 font-semibold">
            12 Tax Invoices Detected
          </p>

        </div>

        {/* GST Liability */}
        <div className="flex justify-between text-lg font-semibold">
          <span>Output GST Liability</span>
          <span>₹76,500</span>
        </div>

        {/* Download Button */}
        <button className="w-full border border-slate-200 rounded-xl p-3 font-semibold hover:bg-slate-50">
          Download Sales Data
        </button>

      </div>

      {/* Confirmation */}
      <label className="flex items-start gap-3 text-sm">

        <input
          type="checkbox"
          checked={confirmed}
          onChange={() => setConfirmed(!confirmed)}
          className="mt-1 accent-blue-600"
        />

        <span>
          I confirm the GSTR-1 sales summary details for this filing
        </span>

      </label>

      {/* Submit Button */}
      <button
        disabled={!confirmed}
        className={`w-full p-3 rounded-xl font-bold transition ${
          confirmed
            ? "bg-blue-600 text-white"
            : "bg-slate-300 text-slate-500"
        }`}
      >
        Submit for Filing
      </button>

    </div>
  );
};

export default SummaryConfirmation;
