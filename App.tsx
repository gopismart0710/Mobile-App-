import React, { useState, useEffect } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DocumentManager from "./pages/DocumentManager";
import SummaryConfirmation from "./pages/SummaryConfirmation";

const App = () => {

  const [lang, setLang] = useState("en");
  const [user, setUser] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState("login");
  const [selectedMonth, setSelectedMonth] = useState("October 2023");

  useEffect(() => {
    const savedUser = localStorage.getItem("kanaku_user_session");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setCurrentPage("dashboard");
    }
  }, []);

  const handleLogin = (userData:any) => {
    setUser(userData);
    localStorage.setItem("kanaku_user_session", JSON.stringify(userData));
    setCurrentPage("dashboard");
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("kanaku_user_session");
    setCurrentPage("login");
  };

  const toggleLang = () => {
    setLang(prev => (prev === "en" ? "ta" : "en"));
  };

  return (

    <div className="min-h-screen bg-slate-50 flex flex-col max-w-md mx-auto">

      {/* Header */}
      {currentPage !== "login" && (

  <header className="sticky top-0 z-50 bg-white border-b px-4 py-3 flex justify-between items-center">
  <div className="flex items-center gap-3">

    <img
      src="/k-logo.png"
      alt="Kanaku"
      className="w-8 h-8 object-contain"
    />

    <div className="flex items-center gap-2">

      <span className="font-bold text-[16px] text-slate-800">
        kanaku.co.in
      </span>

      <span className="text-[12px] text-blue-600 font-medium">
        Your Business Digital Accountant
      </span>

    </div>

  </div>

  <button
    onClick={handleLogout}
    className="text-red-500 font-semibold text-sm"
  >
    Logout
  </button>

</header>
      )}

      {/* Main Content */}

      <main className="flex-1 pb-20">

  {currentPage === "login" && (
    <Login
      onLogin={handleLogin}
      lang={lang}
      toggleLang={toggleLang}
    />
  )}

  {currentPage === "dashboard" && (
    <Dashboard
      lang={lang}
      onNavigate={setCurrentPage}
      selectedMonth={selectedMonth}
      setSelectedMonth={setSelectedMonth}
    />
  )}

  {currentPage === "docs" && (
    <DocumentManager
      lang={lang}
      selectedMonth={selectedMonth}
      onBack={() => setCurrentPage("dashboard")}
    />
  )}

  {currentPage === "summary" && (
    <SummaryConfirmation
      lang={lang}
      selectedMonth={selectedMonth}
    />
  )}

  {currentPage === "profile" && (

    <div className="p-4 space-y-5">

      {/* Profile Card */}
      <div className="bg-white rounded-3xl shadow p-6 flex flex-col items-center text-center">

        <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-bold text-blue-600 mb-3">
          {user?.name ? user.name.charAt(0) : "A"}
        </div>

        <h2 className="text-xl font-bold text-slate-800">
          {user?.name || "AK Enterprises"}
        </h2>

        <p className="text-sm text-slate-500 uppercase">
          Proprietor
        </p>

        <span className="mt-2 px-4 py-1 text-xs font-bold bg-green-100 text-green-700 rounded-full">
          ACTIVE
        </span>

      </div>

      {/* Business Details */}
      <div className="bg-white rounded-2xl border divide-y">

        <div className="p-4">
          <p className="text-xs text-slate-400 font-bold">GSTIN</p>
          <p className="font-bold text-slate-800">33AAAAA0000A1Z5</p>
        </div>

        <div className="p-4">
          <p className="text-xs text-slate-400 font-bold">Business Name</p>
          <p className="font-bold text-slate-800">
            {user?.name || "AK Enterprises"}
          </p>
        </div>

        <div className="p-4">
          <p className="font-bold text-slate-700">Proprietorship</p>
        </div>

        <div className="p-4">
          <p className="text-xs text-blue-600 font-bold mb-1">
            PRIMARY CONTACT
          </p>
          <p className="font-semibold text-slate-800">
            {user?.name || "Owner"}
          </p>
          <p className="text-slate-600">
            {user?.mobile || "+91 XXXXXXXX"}
          </p>
        </div>

      </div>

      <button
        onClick={handleLogout}
        className="w-full bg-red-500 text-white py-3 rounded-xl font-semibold"
      >
        Logout
      </button>

    </div>

  )}
   
      </main>

      {/* Bottom Navigation */}

      {currentPage !== "login" && (

  <nav className="bg-white border-t fixed bottom-0 left-0 right-0 max-w-md mx-auto flex justify-around py-3">

  {/* Home */}
  <button
   onClick={() => setCurrentPage("Home")}
   className={`flex flex-col items-center ${
  currentPage === "dashboard"
    ? "text-blue-600"
    : "text-slate-500"
}`}  >

    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7"/>
      <rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/>
      <rect x="3" y="14" width="7" height="7"/>
    </svg>

    <span className="text-xs mt-1">Home</span>

  </button>

  {/* Docs */}
  <button
  onClick={() => setCurrentPage("Docs")}
  className={`flex flex-col items-center ${
  currentPage === "docs"
    ? "text-blue-600"
    : "text-slate-500"
}`}  >

    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
    </svg>

    <span className="text-xs mt-1">Docs</span>

  </button>

  {/* Verify */}
  <button
     onClick={() => setCurrentPage("Verify")}
    className={`flex flex-col items-center ${
  currentPage === "summary"
    ? "text-blue-600"
    : "text-slate-500"
}`}  >

    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
    </svg>

    <span className="text-xs mt-1">Verify</span>

  </button>

  {/* Profile */}
  <button
    onClick={() => setCurrentPage("profile")}
    className={`flex flex-col items-center ${
  currentPage === "dashboard"
    ? "text-blue-600"
    : "text-slate-500"
}`}  >

    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>

    <span className="text-xs mt-1">Profile</span>

  </button>

</nav>
      )}

    </div>

  );

};

export default App;
