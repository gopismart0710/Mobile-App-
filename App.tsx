import React, { useState } from "react";
import Dashboard from "./pages/Dashboard";
import DocumentManager from "./pages/DocumentManager";
import SummaryConfirmation from "./pages/SummaryConfirmation";
import Logo from "./Logo";

type Page = "home" | "docs" | "verify" | "profile" | "login";

const App: React.FC = () => {

  const [page, setPage] = useState<Page>("login");
  const [selectedMonth, setSelectedMonth] = useState("October 2023");

  const renderPage = () => {

    switch (page) {

      case "home":
        return (
          <Dashboard
            lang="en"
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
            onNavigate={setPage}
          />
        );

      case "docs":
        return (
          <DocumentManager
            lang="en"
            selectedMonth={selectedMonth}
            onBack={() => setPage("home")}
          />
        );

      case "verify":
        return (
          <SummaryConfirmation
            lang="en"
            selectedMonth={selectedMonth}
          />
        );

      case "profile":
        return (
          <div className="p-4">
            <h2 className="text-lg font-bold">Profile</h2>
          </div>
        );

      case "login":
        return (
          <div className="flex flex-col items-center justify-center h-full p-6 gap-4">

            <Logo />

            <button
              onClick={() => setPage("home")}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold"
            >
              Login
            </button>

          </div>
        );

    }

  };

  return (

    <div className="min-h-screen bg-slate-100 flex justify-center">

      {/* Mobile container */}
      <div className="w-full max-w-md bg-white min-h-screen flex flex-col">

        {/* HEADER */}
        <div className="border-b bg-white px-4 py-3 flex items-center justify-between">

          <div className="flex items-center gap-2">
            <Logo />
            <span className="text-blue-600 text-sm font-semibold">
              Your Business Digital Accountant
            </span>
          </div>

          {page !== "login" && (
            <button
              onClick={() => setPage("login")}
              className="text-red-600 font-semibold"
            >
              Logout
            </button>
          )}

        </div>

        {/* PAGE CONTENT */}
        <div className="flex-1 overflow-y-auto pb-20">

          {renderPage()}

        </div>

        {/* FOOTER NAVIGATION */}
        {page !== "login" && (

          <div className="fixed bottom-0 w-full max-w-md bg-white border-t flex justify-around py-2">

            <button
              onClick={() => setPage("home")}
              className={`flex flex-col items-center text-xs ${
                page === "home" ? "text-blue-600" : "text-gray-400"
              }`}
            >
              <div className="text-xl">⬛</div>
              Home
            </button>

            <button
              onClick={() => setPage("docs")}
              className={`flex flex-col items-center text-xs ${
                page === "docs" ? "text-blue-600" : "text-gray-400"
              }`}
            >
              <div className="text-xl">📄</div>
              Docs
            </button>

            <button
              onClick={() => setPage("verify")}
              className={`flex flex-col items-center text-xs ${
                page === "verify" ? "text-blue-600" : "text-gray-400"
              }`}
            >
              <div className="text-xl">📑</div>
              Verify
            </button>

            <button
              onClick={() => setPage("profile")}
              className={`flex flex-col items-center text-xs ${
                page === "profile" ? "text-blue-600" : "text-gray-400"
              }`}
            >
              <div className="text-xl">👤</div>
              Profile
            </button>

          </div>

        )}

      </div>

    </div>

  );
};

export default App;
