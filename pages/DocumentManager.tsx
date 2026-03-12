
import React, { useState, useRef } from 'react';
import { Language, DocCategory } from '../types';
import { translations } from '../translations';


interface DocumentManagerProps {
  lang: Language;
  onBack: () => void;
  selectedMonth: string;
}

interface UploadedDoc {
  id: string;
  category: DocCategory;
  date: string;
  amount: string;
  imageUrl: string;
  invoiceNumber: string;
}

const DocumentManager: React.FC<DocumentManagerProps> = ({ lang, onBack, selectedMonth }) => {
  const t = translations[lang];
  const [activeTab, setActiveTab] = useState<DocCategory | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastAnalysis, setLastAnalysis] = useState<any>(null);
  const [isRecentModalOpen, setIsRecentModalOpen] = useState(false);
  const [previewDoc, setPreviewDoc] = useState<UploadedDoc | null>(null);

  // Initialize with 10 demo documents
  const [recentDocs, setRecentDocs] = useState<UploadedDoc[]>(
    Array.from({ length: 10 }).map((_, i) => ({
      id: `demo-${i}`,
      category: ['sales', 'purchase', 'bank', 'voucher'][i % 4] as DocCategory,
      date: `${24 - i} Oct 2023`,
      amount: `₹${(1250 + i * 450).toLocaleString()}.00`,
      imageUrl: `https://picsum.photos/seed/${i + 50}/600/800`,
      invoiceNumber: `INV-00${10 - i}`
    }))
  );
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const excelInputRef = useRef<HTMLInputElement>(null);

  const categories: { id: DocCategory; label: string; icon: any }[] = [
    { id: 'sales', label: t.sales, icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg> },
    { id: 'purchase', label: t.purchase, icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg> },
    { id: 'bank', label: t.bank, icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg> },
    { id: 'voucher', label: t.vouchers, icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 9h20M2 15h20M10 9v6M14 9v6"/></svg> }
  ];

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setLastAnalysis(null);
    
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result as string;
      const result = {
  totalAmount: "---",
  gstAmount: "---",
  invoiceNumber: "DOC-" + Date.now(),
  date: new Date().toLocaleDateString()
};      
      if (result) {
        setLastAnalysis(result);
        const newDoc: UploadedDoc = {
          id: Date.now().toString(),
          category: activeTab!,
          date: result.date || new Date().toLocaleDateString(),
          amount: result.totalAmount ? `₹${result.totalAmount}` : '---',
          imageUrl: base64,
          invoiceNumber: result.invoiceNumber || 'NEW-DOC'
        };
        setRecentDocs(prev => [newDoc, ...prev].slice(0, 10)); // Keep only latest 10
      }
      
      setIsProcessing(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    };
    reader.onerror = () => {
      setIsProcessing(false);
    };
    reader.readAsDataURL(file);
  };

  const handleExcelUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    alert(`Excel Summary Update: ${file.name} for ${activeTab || 'category'}.`);
    if (excelInputRef.current) excelInputRef.current.value = '';
  };

  const handleAction = (type: 'photo' | 'excel') => {
    if (!activeTab) {
      alert(lang === 'ta' ? 'தயவுசெய்து ஒரு வகையைத் தேர்ந்தெடுக்கவும்' : 'Please select a document category first');
      return;
    }
    if (type === 'photo') {
      fileInputRef.current?.click();
    } else {
      excelInputRef.current?.click();
    }
  };

  return (
    <div className="flex flex-col pb-10">
      {/* Navigation Header */}
      <div className="bg-white border-b border-slate-200 sticky top-14 z-40 px-4 pt-4 pb-2">
        <div className="flex items-center gap-3 mb-2">
          <button onClick={onBack} className="p-2 -ml-2 text-slate-500 hover:text-blue-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          </button>
          <h2 className="text-lg font-bold text-slate-800">{t.dashboard_title}</h2>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col gap-6">
        {/* Category Selection */}
        <section>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
            {lang === 'ta' ? 'ஆவண வகையைத் தேர்ந்தெடுக்கவும்' : '1. Select Category'}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {categories.map(cat => (
              <label 
                key={cat.id}
                className={`relative flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                  activeTab === cat.id 
                    ? 'border-blue-600 bg-blue-50/50 shadow-sm' 
                    : 'border-slate-100 bg-white hover:border-slate-200 shadow-sm'
                }`}
              >
                <input 
                  type="radio" 
                  name="docCategory" 
                  className="hidden" 
                  checked={activeTab === cat.id}
                  onChange={() => setActiveTab(cat.id)}
                />
                <div className={`p-2 rounded-xl ${activeTab === cat.id ? 'text-blue-600' : 'text-slate-400'}`}>
                  {cat.icon}
                </div>
                <span className={`text-[11px] font-bold text-center uppercase tracking-tighter ${activeTab === cat.id ? 'text-blue-800' : 'text-slate-600'}`}>
                  {cat.label}
                </span>
                {activeTab === cat.id && (
                  <div className="absolute top-2 right-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                )}
              </label>
            ))}
          </div>
        </section>

        {/* Action Section */}
        <section className={`flex flex-col gap-4 transition-all duration-300 ${!activeTab ? 'opacity-40 grayscale pointer-events-none' : 'opacity-100'}`}>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-[-8px]">
            {lang === 'ta' ? 'ஆவணத்தைப் பகிரவும்' : '2. Share Document'}
          </h3>
          
          <div 
            onClick={() => handleAction('photo')}
            className="bg-white border-2 border-dashed border-blue-100 rounded-3xl p-8 flex flex-col items-center justify-center text-center gap-3 hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer shadow-sm active:scale-[0.99]"
          >
            <input 
              ref={fileInputRef}
              type="file" 
              accept="image/*" 
              capture="environment" 
              className="hidden"
              onChange={handleFileUpload}
            />
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
            </div>
            <p className="font-bold text-slate-800 text-md">{t.take_photo}</p>
          </div>

          <input 
            ref={excelInputRef}
            type="file" 
            accept=".xlsx, .xls, .csv" 
            className="hidden"
            onChange={handleExcelUpload}
          />
          <button 
            onClick={() => handleAction('excel')}
            className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-200 shadow-sm active:scale-[0.98] transition-all hover:border-emerald-200"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H9h-1"/></svg>
              </div>
              <span className="text-sm font-bold text-slate-700">{t.excel_update}</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </section>

        {/* History / Recent Uploads Button */}
        <section className="mt-2">
          <button 
            onClick={() => setIsRecentModalOpen(true)}
            className="w-full flex items-center justify-between p-4 bg-slate-800 text-white rounded-2xl shadow-lg shadow-slate-200 active:scale-[0.98] transition-all hover:bg-slate-900"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-700 rounded-lg">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M12 18v-6"/><path d="M9 15h6"/></svg>
              </div>
              <div className="text-left">
                <span className="block text-sm font-bold">{lang === 'ta' ? 'சமீபத்திய ஆவணங்களைக் காண்க' : 'View Recent Documents'}</span>
                <span className="text-[10px] text-slate-400 font-medium tracking-wide">Last 10 items updated</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-blue-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">10</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
            </div>
          </button>
        </section>

        {/* AI Processing Status */}
        {isProcessing && (
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-center gap-4 animate-pulse">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm font-semibold text-blue-700">{t.ai_process}</p>
          </div>
        )}

        {/* AI Result Card */}
        {lastAnalysis && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex flex-col gap-4 shadow-sm">
            <div className="flex justify-between items-center border-b border-emerald-100 pb-2">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-tight">AI Extracted ({activeTab})</span>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">Validated</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/60 p-3 rounded-xl border border-emerald-100">
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">{t.total_amount}</p>
                <p className="text-lg font-bold text-slate-800">₹{lastAnalysis.totalAmount || '---'}</p>
              </div>
              <div className="bg-white/60 p-3 rounded-xl border border-emerald-100">
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">{t.tax_amount}</p>
                <p className="text-lg font-bold text-slate-800">₹{lastAnalysis.gstAmount || '---'}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* History Modal */}
      {isRecentModalOpen && (
        <div className="fixed inset-0 z-[100] bg-white flex flex-col animate-in slide-in-from-bottom duration-300">
          <header className="bg-white px-4 py-4 border-b border-slate-100 flex items-center">
            <button 
              onClick={() => setIsRecentModalOpen(false)} 
              className="flex items-center gap-2 text-slate-800 hover:text-blue-600 transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
              <span className="font-bold text-lg leading-none">{t.back || 'Back'}</span>
            </button>
          </header>
          
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1 mb-1">Last 10 Uploads</h3>
            {recentDocs.map((doc) => (
              <button 
                key={doc.id} 
                onClick={() => setPreviewDoc(doc)}
                className="bg-white p-3 rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm active:scale-[0.98] transition-all text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 overflow-hidden border border-slate-100">
                    <img src={doc.imageUrl} alt="preview" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800 leading-tight">{doc.invoiceNumber}</p>
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter opacity-70 mb-0.5">{doc.category}</p>
                    <p className="text-[10px] text-slate-400 font-medium">{doc.date} • {doc.amount}</p>
                  </div>
                </div>
                <div className="text-slate-200 group-hover:text-blue-500 transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Document Preview Overlay */}
      {previewDoc && (
        <div className="fixed inset-0 z-[110] bg-black/95 flex flex-col p-4 animate-in fade-in duration-200">
          <div className="flex justify-between items-center mb-4">
            <div className="text-white">
              <h3 className="font-bold text-lg">{previewDoc.invoiceNumber}</h3>
              <p className="text-xs text-slate-400">{previewDoc.date} • {previewDoc.amount}</p>
            </div>
            <button 
              onClick={() => setPreviewDoc(null)}
              className="p-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          <div className="flex-1 relative flex items-center justify-center overflow-hidden">
            <img 
              src={previewDoc.imageUrl} 
              alt="Document Preview" 
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
          </div>
          <div className="mt-4 flex gap-3">
            <button 
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/10 text-white rounded-xl font-bold text-sm"
              onClick={() => setPreviewDoc(null)}
            >
              Close
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentManager;
