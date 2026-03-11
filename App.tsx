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
            <img src="/logo.png" className="w-8 h-8" />
            <span className="font-bold">Kanaku</span>
          </div>

          <button onClick={handleLogout}>
            Logout
          </button>
        </header>
      )}

      <main className="flex-1">

        {currentPage === 'login' && (
<Login onLogin={handleLogin} />
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
        <nav className="bg-white border-t flex justify-around p-3">

          <button onClick={() => setCurrentPage('dashboard')}>
            Home
          </button>

          <button onClick={() => setCurrentPage('docs')}>
            Docs
          </button>

          <button onClick={() => setCurrentPage('summary')}>
            Verify
          </button>

          <button onClick={() => setCurrentPage('profile')}>
            Profile
          </button>

        </nav>
      )}
    </div>
  );
};

export default App;
