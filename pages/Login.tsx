
import React, { useState } from 'react';
import { Language, User, BusinessLegalType } from '../types';
import { translations } from '../translations';
import { Logo } from '../components/Logo';
import { verifyGSTIN } from '../services/gemini';

interface LoginProps {
  onLogin: (user: User) => void;
  lang: Language;
  toggleLang: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, lang, toggleLang }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifyingGstin, setIsVerifyingGstin] = useState(false);
  const [gstinVerified, setGstinVerified] = useState(false);
  
  // Registration fields
  const [gstin, setGstin] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [personName, setPersonName] = useState('');
  const [designation, setDesignation] = useState('');
  const [primaryPhone, setPrimaryPhone] = useState('');
  const [altPersonName, setAltPersonName] = useState('');
  const [altDesignation, setAltDesignation] = useState('');
  const [altPhone, setAltPhone] = useState('');
  
  // Structured Address
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [state, setState] = useState('Tamil Nadu');
  const [pincode, setPincode] = useState('');
  
  const [businessType, setBusinessType] = useState<BusinessLegalType>('proprietorship');

  const t = translations[lang];

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulation: In a real app, this verifies Phone + OTP
    setTimeout(() => {
      // For demo: Mocking a user login
      onLogin({
        id: 'existing-user-id',
        name: 'John Doe',
        designation: 'Proprietor',
        businessName: 'Mock Business Ltd',
        gstin: '33AAAAA0000A1Z5',
        phone: phone,
        address: { street: 'Main St', city: 'Chennai', district: 'Chennai', state: 'Tamil Nadu', pincode: '600001' },
        businessType: 'proprietorship',
        subscriptionType: 'pro'
      });
      setIsLoading(false);
    }, 1500);
  };

  const handleVerifyGSTIN = async () => {
    if (!gstin || gstin.length < 15) {
      alert(lang === 'ta' ? 'முறையான GSTIN ஐ உள்ளிடவும்' : 'Please enter a valid 15-digit GSTIN');
      return;
    }

    setIsVerifyingGstin(true);
    try {
      const data = await verifyGSTIN(gstin);
      if (data && data.isValid) {
        setBusinessName(data.businessName || '');
        setGstinVerified(true);
        if (data.address) {
          if (data.address.street) setStreet(data.address.street);
          if (data.address.city) setCity(data.address.city);
          if (data.address.district) setDistrict(data.address.district);
          if (data.address.state) setState(data.address.state);
          if (data.address.pincode) setPincode(data.address.pincode);
        }
      } else {
        alert(t.gstin_error);
      }
    } catch (err) {
      alert(t.gstin_error);
    } finally {
      setIsVerifyingGstin(false);
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      onLogin({
        id: Date.now().toString(),
        name: personName,
        designation: designation,
        businessName: businessName,
        gstin: gstin,
        phone: primaryPhone,
        altPersonName: altPersonName,
        altDesignation: altDesignation,
        altPhone: altPhone,
        address: {
          street, city, district, state, pincode
        },
        businessType: businessType,
        subscriptionType: 'basic',
        isFirstTime: true
      });
      setIsLoading(false);
    }, 1500);
  };

  if (mode === 'register') {
    return (
      <div className="flex flex-col px-6 py-8 bg-white">
        <div className="mb-6 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">{t.setup_profile_title}</h2>
            <p className="text-sm text-slate-500 mt-1">{t.setup_profile_desc}</p>
          </div>
          <button onClick={() => setMode('login')} className="text-xs font-bold text-blue-600 underline uppercase tracking-tighter">
            {t.login_title}
          </button>
        </div>

        <form onSubmit={handleRegisterSubmit} className="space-y-6 pb-10">
          {/* GSTIN Section */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{t.gstin}*</label>
            <div className="flex gap-2">
              <input 
                required
                value={gstin}
                onChange={(e) => {
                  setGstin(e.target.value.toUpperCase());
                  setGstinVerified(false);
                }}
                placeholder="33AAAAA0000A1Z5"
                className={`flex-1 px-4 py-3 bg-slate-50 border ${gstinVerified ? 'border-emerald-500' : 'border-slate-100'} rounded-xl focus:ring-2 focus:ring-blue-600 outline-none font-bold`}
              />
              <button 
                type="button"
                onClick={handleVerifyGSTIN}
                disabled={isVerifyingGstin}
                className={`px-4 py-3 rounded-xl font-bold text-xs transition-all whitespace-nowrap ${gstinVerified ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-600 text-white'}`}
              >
                {isVerifyingGstin ? t.verifying_gstin : gstinVerified ? '✓ Verified' : t.verify_gstin_btn}
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{t.business_name_label}*</label>
            <input 
              required
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>

          {/* Primary Contact Group */}
          <div className="pt-2 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1 h-4 bg-blue-600 rounded-full"></div>
              <h3 className="text-[10px] font-black text-blue-600 uppercase tracking-widest px-1">Primary Contact</h3>
            </div>
            
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{t.person_name}*</label>
              <input 
                required
                value={personName}
                onChange={(e) => setPersonName(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{t.designation}*</label>
              <input 
                required
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{t.phone_label}*</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold border-r border-slate-100 pr-3">+91</span>
                <input 
                  required
                  type="tel"
                  value={primaryPhone}
                  onChange={(e) => setPrimaryPhone(e.target.value)}
                  placeholder="Primary mobile for login"
                  className="w-full pl-16 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none font-bold"
                />
              </div>
            </div>
          </div>

          {/* Alternative Contact Group */}
          <div className="pt-2 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1 h-4 bg-slate-400 rounded-full"></div>
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Alternative Contact (Optional)</h3>
            </div>
            
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{t.alt_person_name}</label>
              <input value={altPersonName} onChange={(e) => setAltPersonName(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" />
            </div>
            
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{t.alt_designation}</label>
              <input value={altDesignation} onChange={(e) => setAltDesignation(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{t.alt_phone}</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold border-r border-slate-100 pr-3">+91</span>
                <input type="tel" value={altPhone} onChange={(e) => setAltPhone(e.target.value)} className="w-full pl-16 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" />
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div className="pt-4 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1 h-4 bg-slate-800 rounded-full"></div>
              <h3 className="text-[10px] font-black text-slate-800 uppercase tracking-widest px-1">{t.address}</h3>
            </div>
            
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{t.street}*</label>
              <input required value={street} onChange={(e) => setStreet(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <input required placeholder={t.city} value={city} onChange={(e) => setCity(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" />
              <input required placeholder={t.district} value={district} onChange={(e) => setDistrict(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <select value={state} onChange={(e) => setState(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none text-sm">
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Puducherry">Puducherry</option>
              </select>
              <input required type="number" placeholder={t.pincode} value={pincode} onChange={(e) => setPincode(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" />
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{t.business_type}*</label>
            <div className="grid grid-cols-2 gap-2">
              {(['proprietorship', 'partnership', 'llp', 'pvt_ltd'] as BusinessLegalType[]).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setBusinessType(type)}
                  className={`py-2.5 px-2 rounded-xl text-[11px] font-bold border transition-all ${
                    businessType === type 
                      ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-200' 
                      : 'bg-white border-slate-100 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {t[type]}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" disabled={isLoading} className="w-full bg-blue-800 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-blue-900 active:scale-95 transition-all mt-6 disabled:opacity-50">
            {isLoading ? (
              <div className="flex items-center justify-center gap-3">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>{t.ai_process}</span>
              </div>
            ) : t.save_profile}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex flex-col px-6 pt-12 pb-8 bg-white">
      <div className="mb-10 flex flex-col items-center text-center">
        <Logo size={140} className="mb-2" />
        <div className="mt-[-5px]">
          <h2 className="text-2xl font-light text-slate-700 tracking-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
            kanaku<span className="font-bold text-slate-900">.co.in</span>
          </h2>
          <p className="text-blue-700 font-semibold text-sm mt-1 tracking-wide">
            Your Smart Digital Accountant
          </p>
        </div>
        <div className="mt-8 flex flex-col gap-1">
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">{t.login_title}</h1>
          <p className="text-xs text-slate-400 font-medium">{t.login_subtitle}</p>
        </div>
      </div>

      <form onSubmit={handleLoginSubmit} className="flex-1 flex flex-col gap-6">
        <div className="space-y-1">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">
            {t.phone_label}
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold border-r border-slate-100 pr-3">+91</span>
            <input 
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="00000 00000"
              className="w-full pl-16 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-600 focus:bg-white outline-none transition-all font-medium text-lg"
              required
            />
          </div>
        </div>

        <button type="submit" disabled={isLoading} className="w-full bg-[#1e3a8a] text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-blue-900 active:scale-95 transition-all disabled:opacity-50">
          {isLoading ? (
            <div className="flex items-center justify-center gap-3">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Processing...</span>
            </div>
          ) : t.otp_button}
        </button>

        <div className="flex flex-col items-center gap-4 mt-4">
          <button 
            type="button"
            onClick={() => setMode('register')}
            className="text-blue-700 font-bold text-sm hover:underline"
          >
            {t.new_user}
          </button>
          
          <button type="button" onClick={toggleLang} className="text-slate-600 font-bold text-xs bg-slate-100 px-6 py-2 rounded-full border border-slate-200 transition-colors hover:bg-slate-200">
            {lang === 'en' ? 'தமிழ் மொழி' : 'English Mode'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
