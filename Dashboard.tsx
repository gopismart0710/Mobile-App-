
import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';

interface DashboardProps {
  lang: Language;
  onNavigate: (page: 'dashboard' | 'docs' | 'summary') => void;
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ lang, onNavigate, selectedMonth, setSelectedMonth }) => {
  const t = translations[lang];
  const months = ['August 2023', 'September 2023', 'October 2023', 'November 2023'];

  const deadlines = [
    { title: 'GSTR-1 Filing', date: '11th Nov 2023', status: 'pending' },
    { title: 'GSTR-3B Filing', date: '20th Nov 2023', status: 'upcoming' },
    { title: 'TDS Payment', date: '07th Nov 2023', status: 'urgent' }
  ];

  return (
    <div className="p-4 flex flex-col gap-6">
      {/* Welcome & Month Selector */}
      <section className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-sm font-medium text-slate-500">Welcome back,</h2>
            <p className="text-xl font-bold text-slate-800">AK Enterprises</p>
          </div>
        </div>
        
        <div className="relative">
          <select 
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {months.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </div>
        </div>
      </section>

      {/* Compliance Status */}
      <section>
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-2">
          <div className="w-1.5 h-4 bg-blue-600 rounded-full"></div>
          {t.current_status}
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold text-slate-400 uppercase">GSTR-1</span>
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">In Progress</p>
              <p className="text-[10px] text-slate-500">Docs pending: 4</p>
            </div>
            <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
              <div className="bg-yellow-500 h-full w-[60%]"></div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold text-slate-400 uppercase">GSTR-3B</span>
              <div className="w-2 h-2 rounded-full bg-slate-300"></div>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">Not Started</p>
              <p className="text-[10px] text-slate-500">Upload sales first</p>
            </div>
            <div className="w-full bg-slate-100 h-1 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Deadlines */}
      <section>
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-2">
          <div className="w-1.5 h-4 bg-red-600 rounded-full"></div>
          {t.deadlines}
        </h3>
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden divide-y divide-slate-100">
          {deadlines.map((d, i) => (
            <div key={i} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${d.status === 'urgent' ? 'bg-red-50 text-red-600' : 'bg-slate-50 text-slate-600'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">{d.title}</p>
                  <p className="text-[10px] text-slate-500">Deadline: {d.date}</p>
                </div>
              </div>
              <div className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                d.status === 'urgent' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'
              }`}>
                {d.status}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Action */}
      <section className="mb-4">
        <div 
          onClick={() => onNavigate('docs')}
          className="bg-blue-600 rounded-3xl p-6 shadow-xl shadow-blue-200 text-white flex items-center justify-between cursor-pointer active:scale-[0.98] transition-all hover:bg-blue-700 group"
        >
          <div className="flex-1">
            <p className="text-lg font-bold leading-tight">{t.upload_docs}</p>
            <p className="text-xs text-blue-100 mt-1">Tap icon to upload invoices</p>
          </div>
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm group-hover:bg-white/30 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="17 8 12 3 7 8"/>
              <line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
