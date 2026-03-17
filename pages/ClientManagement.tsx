import React, { useState } from "react";

const ClientManagement = () => {

  const [clients, setClients] = useState<any[]>([]);
  const [name, setName] = useState("");

  const addClient = () => {
    const newClient = {
      name,
      status: "Active",
      renewal: "2026-04-01"
    };

    const updated = [...clients, newClient];
    setClients(updated);
    localStorage.setItem("clients", JSON.stringify(updated));
    setName("");
  };

  return (
    <div className="p-6">

      <h1 className="text-xl font-bold mb-4">Client Management</h1>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Client Name"
        className="border p-2 mr-2"
      />

      <button onClick={addClient} className="bg-blue-600 text-white px-4 py-2">
        Add
      </button>

      <div className="mt-4">
        {clients.map((c, i) => (
          <div key={i}>{c.name} - {c.renewal}</div>
        ))}
      </div>

    </div>
  );
};

export default ClientManagement;
