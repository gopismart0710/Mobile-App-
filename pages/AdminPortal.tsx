
import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../translations';

interface AdminPortalProps {
  lang: Language;
  onBack: () => void;
  onSend: (n: { title: string; message: string }) => void;
}

const AdminPortal: React.FC<AdminPortalProps> = ({ lang, onBack, onSend }) => {
  const t = translations[lang];
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !message) return;
    
    onSend({ title, message });
    setSent(true);
    setTitle('');
    setMessage('');
    
    setTimeout(() => {
      setSent(false);
      onBack();
    }, 2000);
  };

  return (
    <div className="flex flex-col p-6 gap-6 animate-in slide-in-from-bottom duration-300">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-500 hover:text-blue-600 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <h2 className="text-xl font-bold text-slate-800">{t.admin_portal}</h2>
      </div>

      <div className="bg-blue-800 text-white p-6 rounded-3xl shadow-xl shadow-blue-200">
        <h3 className="font-bold text-lg mb-1">Broadcast Notification</h3>
        <p className="text-xs text-blue-200 opacity-80">This simulates the Accountant's back-office portal sending messages to clients.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Message Title</label>
          <input 
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., GST Update, Holiday Notice"
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none font-bold"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Message Body</label>
          <textarea 
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            placeholder="Enter your message here..."
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none font-medium text-sm"
          />
        </div>

        <button 
          type="submit"
          className={`w-full py-4 rounded-2xl font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-3 ${
            sent ? 'bg-emerald-600 text-white' : 'bg-blue-600 text-white active:scale-95'
          }`}
        >
          {sent ? (
            <>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
              {t.msg_sent}
            </>
          ) : t.send_notification}
        </button>
      </form>
    </div>
  );
};

export default AdminPortal;
