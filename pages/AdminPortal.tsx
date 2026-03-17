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

  // 🔹 Dummy client data (next step: make dynamic)
  const clients = [
    { name: "ABC Traders", status: "Not Filed" },
    { name: "XYZ Pvt Ltd", status: "Filed" },
    { name: "MNO Stores", status: "In Progress" }
  ];

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

      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-500 hover:text-blue-600">
          ←
        </button>
        <h2 className="text-xl font-bold text-slate-800">{t.admin_portal}</h2>
      </div>

      {/* 🔷 Admin Stats */}
      <div className="grid grid-cols-2 gap-4">

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-sm text-gray-500">Total Clients</p>
          <p className="text-xl font-bold">{clients.length}</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-sm text-gray-500">Pending Filings</p>
          <p className="text-xl font-bold text-red-500">
            {clients.filter(c => c.status !== "Filed").length}
          </p>
        </div>

      </div>

      {/* 🔷 Client List */}
      <div className="bg-white rounded-xl shadow p-4 space-y-2">
        <h3 className="font-semibold mb-2">Clients</h3>

        {clients.map((c, i) => (
          <div key={i} className="flex justify-between text-sm">
            <span>{c.name}</span>
            <span className={
              c.status === "Filed"
                ? "text-green-600"
                : c.status === "In Progress"
                ? "text-yellow-600"
                : "text-red-500"
            }>
              {c.status}
            </span>
          </div>
        ))}
      </div>

      {/* 🔷 Notification Section (existing feature) */}
      <div className="bg-blue-800 text-white p-6 rounded-3xl shadow-xl">
        <h3 className="font-bold text-lg mb-1">Broadcast Notification</h3>
        <p className="text-xs opacity-80">Send message to all clients</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <input
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Message Title"
          className="w-full px-4 py-3 border rounded-xl"
        />

        <textarea
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          placeholder="Message Body"
          className="w-full px-4 py-3 border rounded-xl"
        />

        <button
          type="submit"
          className={`w-full py-3 rounded-xl font-bold ${
            sent ? 'bg-green-600' : 'bg-blue-600'
          } text-white`}
        >
          {sent ? "Sent ✅" : "Send Notification"}
        </button>

      </form>

    </div>
  );
};

export default AdminPortal;
