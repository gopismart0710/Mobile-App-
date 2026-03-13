import React, { useState } from "react";
import Dashboard from "./pages/Dashboard";
import DocumentManager from "./pages/DocumentManager";
import SummaryConfirmation from "./pages/SummaryConfirmation";

type Page = "home" | "docs" | "verify" | "profile";

const App: React.FC = () => {

  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [selectedMonth, setSelectedMonth] = useState("October 2023");
  const [isLoggedIn, setIsLoggedIn] = useState(true); // change to false if login page exists

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
          <h2 className="text-lg font-bold text-slate-800">
            Profile
          </h2>
          <p className="text-sm text-slate-500">
            Profile page coming soon
          </p>
        </div>
      );
    }

  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <button
          onClick={() => setIsLoggedIn(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold"
        >
          Login
        </button>
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-slate-100 flex justify-center">

      {/* Mobile App Container */}
      <div className="w-full max-w-md bg-white min-h-screen flex flex-col">

        {/* Header */}
        <div className="sticky top-0 z-40 bg-white border-b px-4 py-3 flex items-center justify-between">

          <div className="flex items-center gap-2">

            <img
              src="/logo.png"
              alt="Kanaku"
              className="h-8"
            />

            <div className="text-[10px] text-blue-600 font-semibold leading-tight">
              YOUR ACCOUNTANT, ALWAYS IN YOUR POCKET.
            </div>

          </div>

          <div className="flex items-center gap-4 text-slate-500">

            <div className="relative text-lg">
              🔔
              <span className="absolute -top-1 -right-2 text-[10px] bg-red-500 text-white rounded-full px-1">
                1
              </span>
            </div>

            <button
              onClick={() => setIsLoggedIn(false)}
              className="text-lg"
            >
              ⇢
            </button>

          </div>

        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto pb-20">

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
