import React, { useState } from "react";

const Login = ({ onLogin, lang, toggleLang }: any) => {
  const [mobile, setMobile] = useState("");

  const handleSubmit = () => {
    if (mobile.length !== 10) {
      alert(lang === "en" ? "Enter valid mobile number" : "சரியான மொபைல் எண்ணை உள்ளிடவும்");
      return;
    }

    onLogin({ mobile });
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">

      {/* Language Toggle */}
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleLang}
          className="px-3 py-1 text-xs font-semibold bg-white border border-gray-300 rounded-md shadow"
        >
          {lang === "en" ? "தமிழ்" : "English"}
        </button>
      </div>

      {/* Logo */}
      <img
        src="/logo.png"
        alt="Kanaku Logo"
        className="w-48 mb-10"
      />

      {/* Login Title */}
      <h2 className="text-2xl font-bold mb-2">
        {lang === "en" ? "Login" : "உள்நுழை"}
      </h2>

      <p className="text-gray-500 mb-6 text-center">
        {lang === "en"
          ? "Enter your registered mobile number"
          : "உங்கள் பதிவு செய்யப்பட்ட மொபைல் எண்ணை உள்ளிடவும்"}
      </p>

      {/* Mobile Number Label */}
      <label className="w-full max-w-sm text-sm text-gray-500 mb-2">
        {lang === "en" ? "PRIMARY MOBILE NUMBER" : "மொபைல் எண்"}
      </label>

      {/* Mobile Input */}
      <div className="flex w-full max-w-sm bg-white border rounded-xl p-3 mb-5">
        <span className="text-gray-400 mr-2">+91</span>

        <input
          type="tel"
          placeholder="00000 00000"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="flex-1 outline-none"
        />
      </div>

      {/* Send OTP */}
      <button
        onClick={handleSubmit}
        className="w-full max-w-sm bg-blue-800 text-white py-3 rounded-xl font-semibold shadow"
      >
        {lang === "en" ? "Send OTP" : "OTP அனுப்பு"}
      </button>

      {/* Register */}
      <p className="mt-6 text-blue-600 font-medium">
        {lang === "en" ? "New User? Register Now" : "புதிய பயனர்? பதிவு செய்யவும்"}
      </p>

    </div>
  );
};

export default Login;
