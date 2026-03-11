import React, { useState } from "react";

const Login = ({ onLogin, lang, toggleLang }: any) => {
  const [mobile, setMobile] = useState("");

  const handleSubmit = () => {
    if (mobile.length !== 10) {
      alert("Enter valid mobile number");
      return;
    }

    onLogin({ mobile });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">

      {/* Language Toggle */}
      <div className="absolute top-5 right-5">
        <button
          onClick={toggleLang}
          className="px-3 py-1 text-sm bg-gray-200 rounded-lg"
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
          : "உங்கள் மொபைல் எண்ணை உள்ளிடவும்"}
      </p>

      {/* Mobile Input */}
      <input
        type="tel"
        placeholder={lang === "en" ? "Enter mobile number" : "மொபைல் எண்"}
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        className="w-full max-w-sm p-3 border rounded-lg mb-4"
      />

      {/* Send OTP */}
      <button
        onClick={handleSubmit}
        className="w-full max-w-sm bg-blue-700 text-white p-3 rounded-lg"
      >
        {lang === "en" ? "Send OTP" : "OTP அனுப்பு"}
      </button>

    </div>
  );
};

export default Login;
