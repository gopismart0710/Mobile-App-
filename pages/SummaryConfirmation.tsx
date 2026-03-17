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

        );
};

export default SummaryConfirmation;
