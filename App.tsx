import React, { useState } from "react";
import Dashboard from "./pages/Dashboard";
import DocumentManager from "./pages/DocumentManager";
import SummaryConfirmation from "./pages/SummaryConfirmation";
type Page = "home" | "docs" | "verify" | "profile";

const App: React.FC = () => {

  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [selectedMonth, setSelectedMonth] = useState("October 2023");

  const renderPage = () => {

    if (currentPage === "home") {
      return (
        <Dashboard
          lang="en"
          onNavigate={setCurrentPage}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
        />
      );
    }

    if (currentPage === "docs") {
      return (
        <DocumentManager
          lang="en"
          selectedMonth={selectedMonth}
          onBack={() => setCurrentPage("home")}
        />
      );
    }

    if (currentPage === "verify") {
      return (
        <SummaryConfirmation
          lang="en"
          selectedMonth={selectedMonth}
        />
      );
    }

    if (currentPage === "profile") {
      return (
        <div className="p-4">
          <h2 className="text-lg font-bold">Profile</h2>
          <p className="text-sm text-slate-500">Coming soon</p>
        </div>
      );
    }

  };

  return (

    <div className="min-h-screen bg-slate-100 flex justify-center">

      {/* Mobile App Container */}
      <div className="w-full max-w-md bg-white min-h-screen flex flex-col">

        {/* Top Header */}
        <div className="sticky top-0 z-40 bg-white border-b px-4 py-3 flex items-center justify-between">

          <div className="flex items-center gap-2">
            <span className="font-bold text-lg text-blue-600">
              Kanaku.co.in
            </span>
          </div>

          <div className="flex items-center gap-3 text-slate-500">

            {/* Notification */}
            <div className="relative">
              🔔
              <span className="absolute -top-1 -right-2 text-xs bg-red-500 text-white rounded-full px-1">
                1
              </span>
            </div>

            {/* Logout */}
            <span>⇢</span>

          </div>

        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto pb-16">

          {renderPage()}

        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 w-full max-w-md bg-white border-t flex justify-around py-2">

          <button
            onClick={() => setCurrentPage("home")}
            className={`flex flex-col items-center text-xs ${
              currentPage === "home"
                ? "text-blue-600"
                : "text-slate-500"
            }`}
          >
            ⬛
            Home
          </button>

          <button
            onClick={() => setCurrentPage("docs")}
            className={`flex flex-col items-center text-xs ${
              currentPage === "docs"
                ? "text-blue-600"
                : "text-slate-500"
            }`}
          >
            📄
            Docs
          </button>

          <button
            onClick={() => setCurrentPage("verify")}
            className={`flex flex-col items-center text-xs ${
              currentPage === "verify"
                ? "text-blue-600"
                : "text-slate-500"
            }`}
          >
            ✔
            Verify
          </button>

          <button
            onClick={() => setCurrentPage("profile")}
            className={`flex flex-col items-center text-xs ${
              currentPage === "profile"
                ? "text-blue-600"
                : "text-slate-500"
            }`}
          >
            👤
            Profile
          </button>

        </div>

      </div>

    </div>

  );
};

export default App;
