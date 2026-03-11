import React, { useState, useEffect } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

const App = () => {
  const [lang, setLang] = useState('en');
  const [user, setUser] = useState(null);

  const [currentPage, setCurrentPage] = useState('login');
  const [selectedMonth, setSelectedMonth] = useState('October 2023');

  useEffect(() => {
    const savedUser = localStorage.getItem('kanaku_user_session');

    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setCurrentPage('dashboard');
    }
  }, []);

  const handleLogin = (userData:any) => {
    setUser(userData);
    localStorage.setItem('kanaku_user_session', JSON.stringify(userData));
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('kanaku_user_session');
    setCurrentPage('login');
  };

  const toggleLang = () => {
    setLang(prev => (prev === 'en' ? 'ta' : 'en'));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col max-w-md mx-auto">

      {currentPage !== 'login' && (
        <header className="bg-white border-b p-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
  <img
  src="/K logo.png"
  alt="Kanaku Logo"
  className="w-9 h-9 object-contain"
/>
  <div className="flex items-center gap-2">
    <span className="font-bold text-[15px] text-slate-800">
      kanaku.co.in
    </span>

    <span className="text-[11px] text-blue-600 font-medium">
      Your Business Digital Accountant
    </span>
  </div>
</div>

          <button onClick={handleLogout}>
            Logout
          </button>
        </header>
      )}

      <main className="flex-1">

      {currentPage === 'login' && (
  <Login
    onLogin={handleLogin}
    lang={lang}
    toggleLang={toggleLang}
  />
)}
        {currentPage === 'dashboard' && (
          <Dashboard
            lang={lang}
            onNavigate={setCurrentPage}
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
          />
        )}

        {currentPage === 'docs' && (
          <div style={{padding:20}}>Docs Page</div>
        )}

        {currentPage === 'summary' && (
          <div style={{padding:20}}>Verify Page</div>
        )}

        {currentPage === 'profile' && (
          <div style={{padding:20}}>Profile Page</div>
        )}

      </main>

      {currentPage !== 'login' && (
<nav className="bg-white border-t flex justify-around py-3">

<button
onClick={() => setCurrentPage('dashboard')}
className="flex flex-col items-center text-blue-600"
>

<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
<rect x="3" y="3" width="7" height="7"/>
<rect x="14" y="3" width="7" height="7"/>
<rect x="14" y="14" width="7" height="7"/>
<rect x="3" y="14" width="7" height="7"/>
</svg>

<span className="text-xs mt-1">Home</span>
</button>

<button
onClick={() => setCurrentPage('docs')}
className="flex flex-col items-center text-slate-500"
>

<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
<polyline points="14 2 14 8 20 8"/>
</svg>

<span className="text-xs mt-1">Docs</span>
</button>

<button
onClick={() => setCurrentPage('summary')}
className="flex flex-col items-center text-slate-500"
>

<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
<polyline points="14 2 14 8 20 8"/>
<line x1="16" y1="13" x2="8" y2="13"/>
<line x1="16" y1="17" x2="8" y2="17"/>
</svg>

<span className="text-xs mt-1">Verify</span>
</button>

<button
onClick={() => setCurrentPage('profile')}
className="flex flex-col items-center text-slate-500"
>

<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
<circle cx="12" cy="7" r="4"/>
</svg>

<span className="text-xs mt-1">Profile</span>
</button>

</nav>
)}      )}
    </div>
  );
};

export default App;
