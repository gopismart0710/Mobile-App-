
import React, { useState } from 'react';
import { Language, User } from '../types';
import { translations } from '../translations';

interface ProfileProps {
  lang: Language;
  user: User | null;
  onLogout: () => void;
  onNavigate: (page: any) => void;
}

interface Plan {
  name: string;
  desc: string;
  price: string;
  period: string;
  limit: string;
  color: string;
}

type BillingPeriod = 'monthly' | 'quarterly' | 'half_yearly' | 'annually';

const Profile: React.FC<ProfileProps> = ({ lang, user, onLogout, onNavigate }) => {
  const t = translations[lang];
  const [showPlans, setShowPlans] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<BillingPeriod>('monthly');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  if (!user) return null;

  const isActive = user.subscriptionType === 'pro';

  const subscriptionStatus = {
    plan: isActive ? t.vanigam_plan : 'Basic',
    expiry: '31st Mar 2024',
    price: isActive ? '₹999/month' : 'Free'
  };

  const plansData = [
    {
      category: t.smart_gst,
      plans: [
        { name: t.namma_plan, desc: lang === 'ta' ? 'மைக்ரோ மற்றும் தனிப்பட்ட ஆலோசகர்கள்' : 'Micro & Individuals consultants', price: '499', period: t.per_month, limit: `${t.up_to} 20 ${t.invoices}`, color: 'blue' },
        { name: t.vanigam_plan, desc: lang === 'ta' ? 'சிறு வணிகம் மற்றும் கடைகள்' : 'Small Business & Shops', price: '999', period: t.per_month, limit: `${t.up_to} 100 ${t.invoices}`, color: 'cyan' },
        { name: t.vanigam_plus, desc: lang === 'ta' ? 'சிறு வணிகம் மற்றும் கடைகள்' : 'Small Business & Shops', price: '9999', period: t.per_year, limit: `${t.up_to} 1500 ${t.invoices}`, color: 'emerald' },
      ]
    },
    {
      category: t.smart_accountant,
      plans: [
        { name: t.advantage, desc: lang === 'ta' ? 'சிறு வணிகம் மற்றும் கடைகள்' : 'Small Business & Shops', price: '2999', period: t.per_month, limit: `${t.up_to} 40 L ${t.revenue}`, color: 'indigo' },
        { name: t.advantage_plus, desc: lang === 'ta' ? 'நடுத்தர வணிகம்' : 'Medium Business', price: '3999', period: t.per_month, limit: `${t.above} 40 L ${t.revenue}`, color: 'slate' },
      ]
    }
  ];

  const calculateTotal = (basePrice: string, period: BillingPeriod): number => {
    const price = parseInt(basePrice);
    switch (period) {
      case 'monthly': return price;
      case 'quarterly': return price * 3;
      case 'half_yearly': return price * 6;
      case 'annually': return price * 10; // 2 months free
      default: return price;
    }
  };

  const handleRazorpayPayment = () => {
    if (!selectedPlan) return;

    const totalAmount = calculateTotal(selectedPlan.price, selectedPeriod);

    const options = {
      key: "rzp_test_dummykey",
      amount: totalAmount * 100,
      currency: "INR",
      name: "Kanaku.co.in",
      description: `Subscription for ${selectedPlan.name} (${selectedPeriod})`,
      handler: function (response: any) {
        setPaymentSuccess(true);
        setTimeout(() => {
          setPaymentSuccess(false);
          setSelectedPlan(null);
          setShowPlans(false);
        }, 3000);
      },
      prefill: {
        name: user.name,
        contact: user.phone
      },
      notes: {
        business: user.businessName,
        gstin: user.gstin,
        period: selectedPeriod
      },
      theme: {
        color: "#1e3a8a"
      }
    };

    if ((window as any).Razorpay) {
      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } else {
      alert("Razorpay SDK not loaded. Simulating success.");
      setPaymentSuccess(true);
      setTimeout(() => {
        setPaymentSuccess(false);
        setSelectedPlan(null);
        setShowPlans(false);
      }, 3000);
    }
  };

  if (selectedPlan) {
    const totalAmount = calculateTotal(selectedPlan.price, selectedPeriod);

    return (
      <div className="fixed inset-0 z-[100] bg-white flex flex-col animate-in slide-in-from-bottom duration-300">
        <header className="bg-white px-4 py-4 border-b border-slate-100 flex items-center">
          <button 
            onClick={() => setSelectedPlan(null)} 
            className="flex items-center gap-2 text-slate-800 hover:text-blue-600 transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
            <span className="font-bold text-lg leading-none">{t.back}</span>
          </button>
        </header>

        <div className="flex-1 p-6 flex flex-col">
          {!paymentSuccess ? (
            <>
              <div className="flex flex-col items-center mb-6">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </div>
                <h2 className="text-xl font-bold text-slate-800">{t.checkout_title}</h2>
                <p className="text-sm text-slate-500">{selectedPlan.name}</p>
              </div>

              <div className="space-y-3 mb-8 overflow-y-auto max-h-[40vh]">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">{t.billing_cycle}</h3>
                
                {[
                  { id: 'monthly' as BillingPeriod, label: t.monthly, multiplier: 1 },
                  { id: 'quarterly' as BillingPeriod, label: t.quarterly, multiplier: 3 },
                  { id: 'half_yearly' as BillingPeriod, label: t.half_yearly, multiplier: 6 },
                  { id: 'annually' as BillingPeriod, label: t.annually, multiplier: 10, saving: true }
                ].map((period) => {
                  const amount = calculateTotal(selectedPlan.price, period.id);
                  return (
                    <button
                      key={period.id}
                      onClick={() => setSelectedPeriod(period.id)}
                      className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
                        selectedPeriod === period.id 
                          ? 'border-blue-600 bg-blue-50/30' 
                          : 'border-slate-100 bg-white hover:border-slate-200'
                      }`}
                    >
                      <div className="flex flex-col items-start">
                        <span className={`text-sm font-bold ${selectedPeriod === period.id ? 'text-blue-800' : 'text-slate-700'}`}>
                          {period.label}
                        </span>
                        {period.saving && (
                          <span className="text-[10px] font-bold text-emerald-600">
                            {t.save_2_months}
                          </span>
                        )}
                      </div>
                      <span className={`text-sm font-black ${selectedPeriod === period.id ? 'text-blue-900' : 'text-slate-900'}`}>
                        ₹{amount.toLocaleString()}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-auto pt-4 border-t border-slate-100">
                <div className="flex justify-between items-center mb-4 px-1">
                  <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">{t.total_amount}</span>
                  <span className="text-2xl font-black text-blue-800">₹{totalAmount.toLocaleString()}</span>
                </div>
                <button 
                  onClick={handleRazorpayPayment}
                  className="w-full py-4 bg-blue-800 text-white rounded-2xl font-bold text-lg shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                  {t.pay_now}
                </button>
                <p className="text-[10px] text-center text-slate-400 mt-4 font-medium uppercase tracking-widest">
                  {t.payment_secure}
                </p>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center animate-in zoom-in duration-500">
              <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <h2 className="text-2xl font-black text-slate-800 mb-2">{t.payment_success}</h2>
              <p className="text-sm text-slate-500">{t.payment_desc}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (showPlans) {
    return (
      <div className="flex flex-col min-h-full bg-slate-50 animate-in slide-in-from-right duration-300">
        <header className="bg-white px-4 py-4 border-b border-slate-200 sticky top-0 z-50 flex items-center">
          <button 
            onClick={() => setShowPlans(false)}
            className="flex items-center gap-2 text-slate-800 hover:text-blue-600 transition-colors group"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
            <span className="text-lg font-bold leading-none">{t.back_to_profile}</span>
          </button>
        </header>
        <div className="p-4 flex flex-col gap-8 pb-10">
          {plansData.map((group, idx) => (
            <div key={idx} className="flex flex-col gap-4">
              <div className="flex items-center gap-2 px-1">
                <div className="w-1 h-5 bg-blue-600 rounded-full"></div>
                <h3 className="text-md font-extrabold text-slate-800 uppercase tracking-tight">{group.category}</h3>
              </div>
              <div className="flex flex-col gap-3">
                {group.plans.map((plan, pIdx) => (
                  <div key={pIdx} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-slate-900 text-lg">{plan.name}</h4>
                      <div className="text-right">
                        <span className="text-xl font-black text-slate-900">₹{plan.price}</span>
                        <span className="text-[10px] text-slate-400 font-bold ml-0.5">{plan.period}</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 font-medium mb-3">{plan.desc}</p>
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-50">
                      <span className="text-[11px] font-bold text-slate-700">{plan.limit}</span>
                      <button 
                        onClick={() => setSelectedPlan(plan)}
                        className={`px-4 py-1.5 rounded-lg text-[11px] font-bold transition-colors bg-${plan.color}-600 text-white hover:bg-${plan.color}-700`}
                      >
                        {t.view_plans}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-4 gap-6 animate-in fade-in duration-300">
      <section className="flex flex-col items-center py-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 text-2xl font-bold mb-3 border-2 border-white shadow-md">
          {user.name.charAt(0)}
        </div>
        <h2 className="text-xl font-bold text-slate-800">{user.name}</h2>
        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{user.designation}</p>
        <div className="mt-3 px-4 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider rounded-full">
          {t.active}
        </div>
      </section>

      <section>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 px-1">{t.business_details}</h3>
        <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 overflow-hidden shadow-sm">
          <div className="p-4 flex flex-col gap-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{t.gstin}</span>
            <span className="text-sm font-bold text-slate-800">{user.gstin}</span>
          </div>
          <div className="p-4 flex flex-col gap-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{t.business_name_label}</span>
            <span className="text-sm font-bold text-slate-800">{user.businessName}</span>
          </div>
          <div className="p-4 flex flex-col gap-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{t.business_type}</span>
            <span className="text-sm font-bold text-slate-800">{t[user.businessType]}</span>
          </div>
          
          {/* Primary Contact */}
          <div className="p-4 flex flex-col gap-1">
            <span className="text-[10px] text-blue-600 font-black uppercase tracking-widest">Primary Contact</span>
            <div className="flex justify-between items-baseline mt-1">
              <span className="text-sm font-bold text-slate-800">{user.name}</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase">{user.designation}</span>
            </div>
            <span className="text-sm font-bold text-slate-800">+91 {user.phone}</span>
          </div>

          {/* Alternative Contact */}
          {(user.altPersonName || user.altPhone) && (
            <div className="p-4 flex flex-col gap-1 bg-slate-50/30">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Alternative Contact</span>
              {user.altPersonName && (
                <div className="flex justify-between items-baseline mt-1">
                  <span className="text-sm font-bold text-slate-700">{user.altPersonName}</span>
                  {user.altDesignation && <span className="text-[10px] text-slate-400 font-medium uppercase">{user.altDesignation}</span>}
                </div>
              )}
              {user.altPhone && <span className="text-sm font-bold text-slate-700">+91 {user.altPhone}</span>}
            </div>
          )}

          <div className="p-4 flex flex-col gap-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{t.address}</span>
            <span className="text-sm font-medium text-slate-700 leading-relaxed">
              {user.address.street},<br />
              {user.address.city}, {user.address.district},<br />
              {user.address.state} - {user.address.pincode}
            </span>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 px-1">{t.subscription}</h3>
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">{t.plan}</p>
              <p className="text-lg font-bold">{subscriptionStatus.plan}</p>
            </div>
            <div className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-lg text-xs font-bold border border-blue-500/30">
              {subscriptionStatus.price}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {isActive ? (
              <>
                <button 
                  onClick={() => setSelectedPlan(plansData[0].plans[1])}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 transition-colors rounded-xl text-sm font-bold"
                >
                  {t.renew}
                </button>
                <button 
                  onClick={() => setShowPlans(true)}
                  className="text-[11px] font-bold text-slate-400 underline decoration-slate-600 underline-offset-4"
                >
                  {t.view_other_plans}
                </button>
              </>
            ) : (
              <button 
                onClick={() => setShowPlans(true)}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 transition-colors rounded-xl text-sm font-bold"
              >
                {t.view_plans}
              </button>
            )}
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 px-1">Internal Settings</h3>
        <button 
          onClick={() => onNavigate('admin')}
          className="w-full flex items-center justify-between p-4 bg-slate-100 rounded-2xl border border-slate-200 text-slate-700 active:scale-95 transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-200 rounded-lg">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
            </div>
            <span className="text-sm font-bold">{t.admin_portal} (Demo)</span>
          </div>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </section>

      <div className="flex flex-col gap-2">
        <button onClick={onLogout} className="flex items-center justify-between p-4 bg-red-50 rounded-2xl border border-red-100 shadow-sm active:scale-95 transition-all">
          <span className="text-sm font-bold text-red-700">{t.logout}</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
        </button>
      </div>

      <p className="text-[10px] text-center text-slate-400 px-8 mt-4 pb-8 font-medium uppercase tracking-widest">
        Kanaku.co.in . India
      </p>
    </div>
  );
};

export default Profile;
