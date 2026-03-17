import React from "react";
import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import * as XLSX from "xlsx";

const AdminDashboard = () => {

  const clients = [
    { name: "ABC Traders", status: "Filed" },
    { name: "XYZ Pvt Ltd", status: "Pending" },
    { name: "MNO Stores", status: "Overdue" }
  ];

  const totalClients = clients.length;
  const filed = clients.filter(c => c.status === "Filed").length;
  const overdue = clients.filter(c => c.status === "Overdue");

  return (
    <div className="p-6 space-y-6">

      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">

        <div className="bg-white p-4 rounded-xl shadow">
          <p>Total Clients</p>
          <p className="text-xl font-bold">{totalClients}</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p>GSTR-1</p>
          <p>Filed: {filed}</p>
          <p>Due: 11th</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p>GSTR-3B</p>
          <p>Filed: {filed}</p>
          <p>Due: 20th</p>
        </div>

      </div>

      {/* Overdue */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-bold mb-2">Overdue Clients</h2>

        {overdue.map((c, i) => (
          <div key={i} className="text-red-500">
            {c.name}
          </div>
        ))}

      </div>

    </div>
  );
};

export default AdminDashboard;
