import React, { useState, useEffect } from 'react';
import { Language, User, Notification } from './types';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DocumentManager from './pages/DocumentManager';
import SummaryConfirmation from './pages/SummaryConfirmation';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
import AdminPortal from './pages/AdminPortal';
import { translations } from './translations';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<'login' | 'dashboard' | 'docs' | 'summary' | 'profile' | 'notifications' | 'admin'>('login');
  const [selectedMonth, setSelectedMonth] = useState('October 2023');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'October Filing Reminder',
      message: 'Please upload all sales invoices before 10th November for timely GSTR-1 filing.',
      timestamp: '2 hours ago',
      isRead: false
    }
  ]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Simple auth persistence simulation
  useEffect(() => {
    const savedUser = localStorage.getItem('kanaku_user_session');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setCurrentPage('dashboard');
    }
  }, []);

  const handleLogin = (u: User) => {
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
    setLang(prev => prev === 'en' ? 'ta' : 'en');
  };

  const addNotification = (n: Omit<Notification, 'id' | 'timestamp' | 'isRead'>) => {
    const newNotif: Notification = {
      ...n,
      id: Date.now().toString(),
      timestamp: 'Just now',
      isRead: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col max-w-md mx-auto shadow-xl ring-1 ring-slate-200 overflow-x-hidden">
      {/* Header (Sticky) */}
      {currentPage !== 'login' && (
        <header className="sticky top-0 z-50 bg-white border-b border-slate-200 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center shrink-0">
              <svg
                width="28"
                height="28"
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M40 30V170H85V100L130 170H185L120 85L180 30H125L85 85V30H40Z" fill="#1e3a8a" />
                <path d="M20 100H60L75 60L95 140L115 80L135 120L150 100H180" stroke="#22d3ee" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M150 100L185 45" stroke="#22d3ee" strokeWidth="8" strokeLinecap="round" />
              </svg>
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="font-bold text-slate-800 text-[16px] leading-tight">Kanaku.co.in</h1>
              <p className="text-[7.5px] font-bold text-blue-600 uppercase tracking-tighter whitespace-nowrap opacity-80 leading-none mt-0.5">
                Your accountant, Always in your Pocket.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Notification Icon */}
            <button 
              onClick={() => setCurrentPage('notifications')}
              className={`relative p-2 rounded-full transition-colors ${currentPage === 'notifications' ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-100'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-black rounded-full flex items-center justify-center ring-2 ring-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Language toggle only appears on the Dashboard (Home page) as requested */}
            {currentPage === 'dashboard' && (
              <button 
                onClick={toggleLang}
                className="px-2 py-1 text-xs font-semibold bg-slate-100 border border-slate-300 rounded hover:bg-slate-200 transition-colors"
              >
                {lang === 'en' ? 'தமிழ்' : 'English'}
              </button>
            )}
            <button 
              onClick={handleLogout}
              className="p-1 text-slate-400 hover:text-red-500 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            </button>
          </div>
        </header>
      )}
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
    <DocumentManager
      lang={lang}
      onBack={() => setCurrentPage('dashboard')}
      selectedMonth={selectedMonth}
    />
  )}

  {currentPage === 'summary' && (
    <SummaryConfirmation
      lang={lang}
      onBack={() => setCurrentPage('dashboard')}
      selectedMonth={selectedMonth}
    />
  )}

  {currentPage === 'profile' && (
    <Profile
      lang={lang}
      user={user}
      onLogout={handleLogout}
      onNavigate={setCurrentPage}
    />
  )}

  {currentPage === 'notifications' && (
    <Notifications
      lang={lang}
      notifications={notifications}
      onBack={() => setCurrentPage('dashboard')}
      markAllAsRead={markAllAsRead}
    />
  )}

  {currentPage === 'admin' && (
    <AdminPortal
      lang={lang}
      onBack={() => setCurrentPage('profile')}
      onSend={addNotification}
    />
  )}
</main>

      {/* Mobile Navigation */}
      {currentPage !== 'login' && (
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-slate-200 flex justify-around py-3 px-2 z-50">
          <button 
            onClick={() => setCurrentPage('dashboard')}
            className={`flex flex-col items-center gap-1 transition-colors ${currentPage === 'dashboard' ? 'text-blue-700' : 'text-slate-400'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            <span className="text-[10px] font-medium">Home</span>
          </button>
          <button 
            onClick={() => setCurrentPage('docs')}
            className={`flex flex-col items-center gap-1 transition-colors ${currentPage === 'docs' ? 'text-blue-700' : 'text-slate-400'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
            <span className="text-[10px] font-medium">Docs</span>
          </button>
          <button 
            onClick={() => setCurrentPage('summary')}
            className={`flex flex-col items-center gap-1 transition-colors ${currentPage === 'summary' ? 'text-blue-700' : 'text-slate-400'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
            <span className="text-[10px] font-medium">Verify</span>
          </button>
          <button 
            onClick={() => setCurrentPage('profile')}
            className={`flex flex-col items-center gap-1 transition-colors ${currentPage === 'profile' || currentPage === 'admin' ? 'text-blue-700' : 'text-slate-400'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <span className="text-[10px] font-medium">Profile</span>
          </button>
        </nav>
      )}
    </div>
  );
};

export default App;
