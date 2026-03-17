import React, { useState } from "react";

const Verification = () => {

  const [form, setForm] = useState({
    gstin: "",
    invoice: "",
    amount: ""
  });

  return (
    <div className="flex h-screen">

      {/* LEFT IMAGE */}
      <div className="w-1/2 bg-gray-100 flex items-center justify-center">
        <p>Invoice Image</p>
      </div>

      {/* RIGHT FORM */}
      <div className="w-1/2 p-6 space-y-3">

        <input
          placeholder="GSTIN"
          onChange={(e) => setForm({...form, gstin: e.target.value})}
          className="border p-2 w-full"
        />

        <input
          placeholder="Invoice No"
          onChange={(e) => setForm({...form, invoice: e.target.value})}
          className="border p-2 w-full"
        />

        <input
          placeholder="Amount"
          onChange={(e) => setForm({...form, amount: e.target.value})}
          className="border p-2 w-full"
        />

        <button className="bg-green-600 text-white px-4 py-2">
          Approve
        </button>

      </div>

    </div>
  );
};

export default Verification;
