import React, { useState, useEffect } from 'react';
import { Language, User, Notification } from './types';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [user, setUser] = useState<User | null>(null);

  const [currentPage, setCurrentPage] = useState<
    'login' | 'dashboard' | 'docs' | 'summary' | 'profile' | 'notifications' | 'admin'
  >('login');

  const [selectedMonth, setSelectedMonth] = useState('October 2023');

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'October Filing Reminder',
      message:
        'Please upload all sales invoices before 10th November for timely GSTR-1 filing.',
      timestamp: '2 hours ago',
      isRead: false
    }
  ]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Persist login session
  useEffect(() => {
    const savedUser = localStorage.getItem('kanaku_user_session');

    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setCurrentPage('dashboard');
    }
  }, []);

  const handleLogin = (u: any) => {
    setUser(u);
    localStorage.setItem('kanaku_user_session', JSON.stringify(u));
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

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col max-w-md mx-auto shadow-xl ring-1 ring-slate-200 overflow-x-hidden">

      {/* Header */}
      {currentPage !== 'login' && (
        <header className="sticky top-0 z-50 bg-white border-b border-slate-200 px-4 py-2 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Kanaku" className="w-8 h-8" />

            <div>
              <h1 className="font-bold text-slate-800 text-[16px]">
                Kanaku.co.in
              </h1>

              <p className="text-[8px] font-bold text-blue-600">
                Your accountant, Always in your Pocket.
              </p>
            </div>
          </div>

          {/* Header actions */}
          <div className="flex items-center gap-3">

            <button
              onClick={() => setCurrentPage('notifications')}
              className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full"
            >
              🔔
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[9px] rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {currentPage === 'dashboard' && (
              <button
                onClick={toggleLang}
                className="px-2 py-1 text-xs bg-slate-100 border rounded"
              >
                {lang === 'en' ? 'தமிழ்' : 'English'}
              </button>
            )}

            <button
              onClick={handleLogout}
              className="text-slate-500 hover:text-red-500"
            >
              Logout
            </button>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className="flex-1 pb-20">

        {currentPage === 'login' && (
          <Login onLogin={handleLogin} lang={lang} toggleLang={toggleLang} />
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
          <div style={{ padding: 20 }}>Docs Page</div>
        )}

        {currentPage === 'summary' && (
          <div style={{ padding: 20 }}>Verify Page</div>
        )}

        {currentPage === 'profile' && (
          <div style={{ padding: 20 }}>Profile Page</div>
        )}

        {currentPage === 'notifications' && (
          <div style={{ padding: 20 }}>
            Notifications Page
            <button onClick={markAllAsRead}>Mark all as read</button>
          </div>
        )}

        {currentPage === 'admin' && (
          <div style={{ padding: 20 }}>Admin Page</div>
        )}

      </main>

      {/* Bottom Navigation */}
      {currentPage !== 'login' && (
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-slate-200 flex justify-around py-3">

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
