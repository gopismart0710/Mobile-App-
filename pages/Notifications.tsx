
import React, { useEffect } from 'react';
import { Language, Notification } from '../types';
import { translations } from '../translations';

interface NotificationsProps {
  lang: Language;
  notifications: Notification[];
  onBack: () => void;
  markAllAsRead: () => void;
}

const Notifications: React.FC<NotificationsProps> = ({ lang, notifications, onBack, markAllAsRead }) => {
  const t = translations[lang];

  useEffect(() => {
    // Mark as read when page is opened
    markAllAsRead();
  }, []);

  return (
    <div className="flex flex-col p-4 gap-6 animate-in slide-in-from-right duration-300">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-500 hover:text-blue-600 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <h2 className="text-xl font-bold text-slate-800">{t.notifications}</h2>
      </div>

      {notifications.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center py-20 text-center opacity-40">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          </div>
          <p className="font-bold">{t.no_notifications}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {notifications.map((n) => (
            <div 
              key={n.id}
              className={`p-4 rounded-2xl border transition-all ${
                n.isRead ? 'bg-white border-slate-100' : 'bg-blue-50 border-blue-100 shadow-sm'
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-bold text-slate-900 text-sm">{n.title}</h4>
                <span className="text-[9px] font-bold text-slate-400 uppercase">{n.timestamp}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {n.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
