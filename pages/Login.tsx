import { useState } from "react";

export default function Login() {
  const [mobile, setMobile] = useState("");

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start pt-10 px-6">

      {/* Logo */}
    <div className="flex flex-col items-center mb-10">
  <img
    src="/logo.png"
    alt="Kanaku Logo"
    className="w-52"
  />
</div>
      {/* Login title */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Login</h2>
      <p className="text-gray-500 text-sm mb-8 text-center">
        Enter your registered mobile number
      </p>

      {/* Mobile Label */}
      <label className="w-full text-gray-500 text-sm font-semibold mb-2">
        PRIMARY MOBILE NUMBER
      </label>

      {/* Mobile Input */}
      <div className="w-full flex items-center bg-white rounded-2xl shadow-sm px-4 py-4 mb-6">
        <span className="text-gray-400 mr-3">+91</span>
        <input
          type="tel"
          placeholder="00000 00000"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="w-full outline-none text-gray-700"
        />
      </div>

      {/* Send OTP */}
      <button
  onClick={() => {
    if (mobile.length !== 10) {
      alert("Enter valid mobile number");
      return;
    }

    window.location.href = "/dashboard";
  }}
  className="w-full bg-blue-800 text-white py-4 rounded-2xl"
>
  Send OTP
</button>
      {/* Register */}
      <p className="text-blue-600 mt-8 font-medium">
        New User? Register Now
      </p>

      {/* Tamil Button */}
      <button className="mt-4 bg-gray-200 text-gray-700 px-6 py-2 rounded-full">
        தமிழ் மொழி
      </button>

    </div>
  );
}
