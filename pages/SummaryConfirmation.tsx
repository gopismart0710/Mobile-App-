
import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../translations';

interface SummaryConfirmationProps {
  lang: Language;
  onBack: () => void;
  selectedMonth: string;
}

const SummaryConfirmation: React.FC<SummaryConfirmationProps> = ({ lang, onBack, selectedMonth }) => {
  const t = translations[lang];
  const [activeTab, setActiveTab] = useState<'sales' | 'purchase'>('sales');
  const [salesConfirmed, setSalesConfirmed] = useState(false);
  const [purchaseConfirmed, setPurchaseConfirmed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Helper to get deadline in requested format: "11th Nov 2023"
  const getDeadline = (type: 'sales' | 'purchase') => {
    try {
      // selectedMonth format is "Month Year" (e.g., "October 2023")
      const parts = selectedMonth.split(' ');
      const monthIndex = new Date(`${parts[0]} 1, ${parts[1]}`).getMonth();
      let year = parseInt(parts[1]);
      
      // Deadline is usually the next month
      let nextMonthIndex = monthIndex + 1;
      if (nextMonthIndex > 11) {
        nextMonthIndex = 0;
        year += 1;
      }

      // Format month as 'short' (e.g., 'Nov') and ensure first letter is Capitalized
      const dateForMonth = new Date(year, nextMonthIndex);
      let nextMonthName = dateForMonth.toLocaleString('default', { month: 'short' });
      nextMonthName = nextMonthName.charAt(0).toUpperCase() + nextMonthName.slice(1);

      const day = type === 'sales' ? '11' : '20';
      const suffix = (d: string) => {
        if (d === '11') return 'th';
        if (d === '20') return 'th';
        const last = d.charAt(d.length - 1);
        if (last === '1') return 'st';
        if (last === '2') return 'nd';
        if (last === '3') return 'rd';
        return 'th';
      };

      return `${day}${suffix(day)} ${nextMonthName} ${year}`;
    } catch (e) {
      return type === 'sales' ? '11th Nov 2023' : '20th Nov 2023';
    }
  };

  const handleDownload = (type: 'sales' | 'purchase') => {
    const headers = type === 'sales' 
      ? "Date,Invoice No,Customer,Value,GST\n" 
      : "Date,Voucher No,Supplier,Value,ITC\n";
    const rows = type === 'sales'
      ? "2023-10-01,INV-001,Demo Client A,10000,1800\n2023-10-05,INV-002,Demo Client B,5000,900"
      : "2023-10-02,PUR-001,Demo Supplier X,8000,1440\n2023-10-10,PUR-002,Demo Supplier Y,3000,540";
    
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', `${type === 'sales' ? 'GSTR1_Sales' : 'GSTR3B_Purchase'}_${selectedMonth.replace(' ', '_')}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleConfirm = (type: 'sales' | 'purchase') => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const msg = type === 'sales' 
        ? (lang === 'ta' ? 'GSTR-1 சுருக்கம் உறுதி செய்யப்பட்டது!' : 'GSTR-1 summary confirmed!')
        : (lang === 'ta' ? 'GSTR-3B மற்றும் நிகர வரி உறுதி செய்யப்பட்டது!' : 'GSTR-3B and Net Tax confirmed!');
      alert(msg);
      if (type === 'sales') setActiveTab('purchase');
      else onBack();
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-full">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-4 pt-4 pb-2 sticky top-14 z-40">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={onBack} className="p-2 -ml-2 text-slate-500 hover:text-blue-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            <span className="sr-only">{t.back}</span>
          </button>
          <h2 className="text-lg font-bold text-slate-800">{t.dashboard_title}</h2>
        </div>

        {/* Verification Tabs */}
        <div className="flex p-1 bg-slate-100 rounded-xl">
          <button 
            onClick={() => setActiveTab('sales')}
            className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'sales' 
                ? 'bg-white text-blue-700 shadow-sm' 
                : 'text-slate-500'
            }`}
          >
            GSTR-1
          </button>
          <button 
            onClick={() => setActiveTab('purchase')}
            className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'purchase' 
                ? 'bg-white text-blue-700 shadow-sm' 
                : 'text-slate-500'
            }`}
          >
            GSTR-3B
          </button>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col gap-6">
        {/* Deadline Notice Card */}
        <div className="bg-amber-50 border border-amber-100 p-3 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <div>
              <p className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">{t.filing_deadline}</p>
              <p className="text-sm font-bold text-slate-900 tracking-tight">{getDeadline(activeTab)}</p>
            </div>
          </div>
          <div className="text-[10px] font-bold text-amber-800 bg-amber-200/50 px-2 py-1 rounded-lg">
            {selectedMonth}
          </div>
        </div>

        {activeTab === 'sales' ? (
          /* Sales (GSTR-1) Verification Section */
          <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-left-4 duration-300">
            <section className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">{t.verify_sales}</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{selectedMonth}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-xs font-bold text-slate-400 uppercase mb-1">{t.sales_value}</p>
                  <p className="text-2xl font-bold text-slate-800">₹4,25,000.00</p>
                  <p className="text-[10px] text-blue-600 font-bold mt-1">12 Tax Invoices Detected</p>
                </div>

                <div className="flex justify-between items-center px-2">
                  <span className="text-sm font-medium text-slate-500">Output GST Liability</span>
                  <span className="text-sm font-bold text-slate-800">₹76,500.00</span>
                </div>
              </div>

              {/* Download for Sales Data button */}
              <button 
                onClick={() => handleDownload('sales')}
                className="w-full flex items-center justify-center gap-2 py-3 border-2 border-slate-100 rounded-2xl text-slate-600 font-bold text-sm hover:bg-slate-50 hover:border-slate-200 transition-all active:scale-95"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                {t.download_sales}
              </button>
            </section>

            <section className="mt-auto flex flex-col gap-4">
              <label className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl cursor-pointer border border-slate-200 hover:border-blue-200 transition-colors">
                <input 
                  type="checkbox" 
                  checked={salesConfirmed}
                  onChange={(e) => setSalesConfirmed(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <p className="text-xs leading-relaxed text-slate-600 font-medium">
                  {lang === 'ta' ? 'GSTR-1 விற்பனைத் தகவலை நான் உறுதிப்படுத்துகிறேன்.' : 'I confirm the GSTR-1 sales summary details for this filing period after cross-checking.'}
                </p>
              </label>

              <button 
                onClick={() => handleConfirm('sales')}
                disabled={!salesConfirmed || isProcessing}
                className={`w-full py-4 rounded-2xl font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-3 ${
                  salesConfirmed && !isProcessing 
                    ? 'bg-blue-600 text-white active:scale-95' 
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                }`}
              >
                {isProcessing ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : t.confirm_sales_btn}
              </button>
            </section>
          </div>
        ) : (
          /* Purchase (GSTR-3B) Verification Section */
          <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <section className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H9h-1"/></svg>
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">{t.verify_purchase}</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{selectedMonth}</p>
                </div>
              </div>

              <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
                <p className="text-xs font-bold text-emerald-600 uppercase mb-1">GSTR-3B Purchase Value</p>
                <p className="text-xl font-bold text-slate-800">₹1,12,400.00</p>
                <div className="flex justify-between items-center mt-2 pt-2 border-t border-emerald-100">
                   <span className="text-[10px] font-bold text-emerald-700">{t.itc_value}</span>
                   <span className="text-xs font-bold text-emerald-700">₹20,232.00</span>
                </div>
              </div>

              <div className="p-5 bg-slate-900 rounded-2xl shadow-inner text-white">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Final Liability</span>
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
                </div>
                <div className="flex justify-between items-end">
                   <div>
                     <p className="text-[11px] text-slate-400 mb-0.5">{t.net_tax_payable}</p>
                     <p className="text-2xl font-bold">₹56,268.00</p>
                   </div>
                   <div className="text-right">
                     <p className="text-[9px] text-slate-500 font-medium">Auto-Calculated Summary</p>
                   </div>
                </div>
              </div>

              {/* Download for Purchase Data button */}
              <button 
                onClick={() => handleDownload('purchase')}
                className="w-full flex items-center justify-center gap-2 py-3 border-2 border-slate-100 rounded-2xl text-slate-600 font-bold text-sm hover:bg-slate-50 hover:border-slate-200 transition-all active:scale-95"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                {t.download_purchase}
              </button>
            </section>

            <section className="mt-auto flex flex-col gap-4">
              <label className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl cursor-pointer border border-slate-200 hover:border-blue-200 transition-colors">
                <input 
                  type="checkbox" 
                  checked={purchaseConfirmed}
                  onChange={(e) => setPurchaseConfirmed(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <p className="text-xs leading-relaxed text-slate-600 font-medium">
                  {lang === 'ta' ? 'GSTR-3B கொள்முதல் மற்றும் நிகர வரிப் பொறுப்பை நான் உறுதிப்படுத்துகிறேன்.' : 'I confirm the GSTR-3B purchase value and the calculated net tax liability after cross-checking.'}
                </p>
              </label>

              <button 
                onClick={() => handleConfirm('purchase')}
                disabled={!purchaseConfirmed || isProcessing}
                className={`w-full py-4 rounded-2xl font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-3 ${
                  purchaseConfirmed && !isProcessing 
                    ? 'bg-slate-800 text-white active:scale-95' 
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                }`}
              >
                {isProcessing ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : t.confirm_purchase_btn}
              </button>
            </section>
          </div>
        )}
      </div>

      <p className="text-[10px] text-center text-slate-400 px-8 py-4 bg-slate-50/50 mt-4">
        Audit support provided by Kanaku.co.in. Ensure all bank statements are uploaded for correct ITC verification.
      </p>
    </div>
  );
};

export default SummaryConfirmation;
