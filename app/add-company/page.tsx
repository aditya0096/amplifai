"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCompanies } from "@/components/providers/CompaniesProvider";
import Sidebar from "@/components/layout/Sidebar";

export default function AddCompanyPage() {
  const { addCompany } = useCompanies();
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    logo: "",
    ceoName: "",
    ceoAvatar: "",
    revenue: "",
    profit: "",
    ebitda: "",
    grossMargin: "",
    keyInsights: "",
    revenueChange: "positive",
    profitChange: "positive",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation
    if (!form.name || !form.ceoName || !form.revenue || !form.profit) {
      setError("Please fill in all required fields.");
      setSuccess(false);
      return;
    }
    setError("");
    // Prepare company object for context
    addCompany({
      name: form.name,
      logo: form.logo,
      ceo: { name: form.ceoName, avatar: form.ceoAvatar },
      revenue: form.revenue,
      profit: form.profit,
      ebitda: form.ebitda,
      grossMargin: form.grossMargin ? parseFloat(form.grossMargin) : 0,
      keyInsights: form.keyInsights.split(",").map((s) => s.trim()).filter(Boolean),
      revenueChange: form.revenueChange as "positive" | "negative",
      profitChange: form.profitChange as "positive" | "negative",
    });
    setSuccess(true);
    setForm({
      name: "",
      logo: "",
      ceoName: "",
      ceoAvatar: "",
      revenue: "",
      profit: "",
      ebitda: "",
      grossMargin: "",
      keyInsights: "",
      revenueChange: "positive",
      profitChange: "positive",
    });
    // Redirect to companies page
    router.push("/companies");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded shadow">
      <div className="min-h-screen bg-gray-50">
        <Sidebar />
      <h1 className="text-2xl font-bold mb-6">Add New Company</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Company Name *</label>
          <input name="name" value={form.name} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block font-medium">Logo (emoji)</label>
          <input name="logo" value={form.logo} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="e.g. 🟣" />
        </div>
        <div>
          <label className="block font-medium">CEO Name *</label>
          <input name="ceoName" value={form.ceoName} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block font-medium">CEO Avatar (emoji)</label>
          <input name="ceoAvatar" value={form.ceoAvatar} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="e.g. 👨‍💼" />
        </div>
        <div>
          <label className="block font-medium">Revenue (€M) *</label>
          <input name="revenue" value={form.revenue} onChange={handleChange} className="w-full border rounded px-3 py-2" required placeholder="e.g. €100M" />
        </div>
        <div>
          <label className="block font-medium">Profit (€M) *</label>
          <input name="profit" value={form.profit} onChange={handleChange} className="w-full border rounded px-3 py-2" required placeholder="e.g. €10M" />
        </div>
        <div>
          <label className="block font-medium">EBITDA (€M)</label>
          <input name="ebitda" value={form.ebitda} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="e.g. €5M" />
        </div>
        <div>
          <label className="block font-medium">Gross Margin (%)</label>
          <input name="grossMargin" value={form.grossMargin} onChange={handleChange} className="w-full border rounded px-3 py-2" type="number" step="0.1" placeholder="e.g. 20.5" />
        </div>
        <div>
          <label className="block font-medium">Key Insights (comma separated)</label>
          <input name="keyInsights" value={form.keyInsights} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="e.g. Strong Growth, Tech" />
        </div>
        <div className="flex space-x-4">
          <div>
            <label className="block font-medium">Revenue Change</label>
            <select name="revenueChange" value={form.revenueChange} onChange={handleChange} className="border rounded px-3 py-2">
              <option value="positive">Positive</option>
              <option value="negative">Negative</option>
            </select>
          </div>
          <div>
            <label className="block font-medium">Profit Change</label>
            <select name="profitChange" value={form.profitChange} onChange={handleChange} className="border rounded px-3 py-2">
              <option value="positive">Positive</option>
              <option value="negative">Negative</option>
            </select>
          </div>
        </div>
        {error && <div className="text-red-600">{error}</div>}
        {success && <div className="text-green-600">Company added successfully! (Demo only)</div>}
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700">Add Company</button>
      </form>
      </div>
    </div>
  );
}

