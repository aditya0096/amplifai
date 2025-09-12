"use client";
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCompanies } from "@/components/providers/CompaniesProvider";
import Sidebar from "@/components/layout/Sidebar";
import { Bell, MessageSquare, User, Calendar, HelpCircle, ChevronDown, LogOut, Settings } from "lucide-react";
import Dropdown from "@/components/ui/Dropdown";
import Modal from "@/components/ui/Modal";
import { signOut } from "next-auth/react";
import Header from '@/components/ui/Header';
import { SidebarContext } from '@/components/layout/Sidebar';

export default function AddCompanyPage() {
  const { addCompany } = useCompanies();
  const router = useRouter();
  const { data: session, status } = useSession();
  const { collapsed } = useContext(SidebarContext);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

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
  const [notifications, setNotifications] = useState(false);
  const [messages, setMessages] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/login' });
  };

  const notificationsOptions = [
    {
      label: 'New company added: TechCorp Ltd.',
      value: 'company',
      icon: <User className="w-4 h-4" />,
      onClick: () => console.log('Company notification clicked')
    },
    {
      label: 'Form validation updated',
      value: 'validation',
      icon: <HelpCircle className="w-4 h-4" />,
      onClick: () => console.log('Validation notification clicked')
    },
    {
      label: 'System maintenance scheduled',
      value: 'maintenance',
      icon: <Calendar className="w-4 h-4" />,
      onClick: () => console.log('Maintenance notification clicked')
    }
  ];

  const messagesOptions = [
    {
      label: 'Admin: "Please review new company submissions"',
      value: 'admin',
      icon: <User className="w-4 h-4" />,
      onClick: () => console.log('Admin message clicked')
    },
    {
      label: 'Finance Team: "Need updated company data"',
      value: 'finance',
      icon: <User className="w-4 h-4" />,
      onClick: () => console.log('Finance message clicked')
    }
  ];

  const profileOptions = [
    {
      label: 'Profile Settings',
      value: 'profile',
      icon: <User className="w-4 h-4" />,
      onClick: () => console.log('Profile settings clicked')
    },
    {
      label: 'Account Settings',
      value: 'account',
      icon: <Settings className="w-4 h-4" />,
      onClick: () => console.log('Account settings clicked')
    },
    {
      label: 'Help & Support',
      value: 'help',
      icon: <HelpCircle className="w-4 h-4" />,
      onClick: () => console.log('Help clicked')
    },
    {
      label: 'Sign Out',
      value: 'signout',
      icon: <LogOut className="w-4 h-4" />,
      onClick: handleSignOut
    }
  ];

  const handleClearForm = () => {
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
    setError("");
    setSuccess(false);
  };

  const handleSaveDraft = () => {
    alert("Draft saved! (Demo functionality)");
  };

  const handleFiscalYear = () => {
    alert("Fiscal Year: 2024-2025\nCurrent Quarter: Q4 2024\nNext Review: March 2025");
  };

  const handlePageInfo = () => {
    alert("Add New Company Page\n\nThis page allows you to add new companies to the system.\nAll fields marked with * are required.\n\nLast updated: Today");
  };

  const handleFieldHelp = (fieldName: string) => {
    const helpTexts: { [key: string]: string } = {
      name: "Enter the official company name as registered",
      logo: "Use emoji to represent your company (e.g., 🟣, 🏢, 💼)",
      ceoName: "Full name of the Chief Executive Officer",
      ceoAvatar: "Use emoji to represent the CEO (e.g., 👨‍💼, 👩‍💼)",
      revenue: "Annual revenue in millions (e.g., €100M)",
      profit: "Annual profit in millions (e.g., €10M)",
      ebitda: "Earnings Before Interest, Taxes, Depreciation, and Amortization",
      grossMargin: "Gross profit margin as a percentage",
      keyInsights: "Comma-separated key business insights or characteristics"
    };
    alert(`Help: ${fieldName}\n\n${helpTexts[fieldName] || "No help available for this field"}`);
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

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50">
        <Sidebar />
        <div className="ml-64">
          <header className="bg-white border-b px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-semibold text-gray-900">Add New Company</h1>
              </div>
            </div>
          </header>
          <div className="p-6">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm border p-8">
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (!session) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      {/* Main Content */}
      <div className={`transition-all duration-300 ${collapsed ? 'ml-16' : 'ml-64'}`}>
        <Header
          title="Add New Company"
          profileOptions={profileOptions}
          notificationsOptions={notificationsOptions}
          messagesOptions={messagesOptions}
        />
        <div className="p-6">
          {/* Form Container */}
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm border p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <label className="block text-sm font-medium text-gray-700">Company Name *</label>
                    <button 
                      type="button"
                      onClick={() => handleFieldHelp("name")}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                      title="Get help for this field"
                    >
                      <HelpCircle className="w-4 h-4" />
                    </button>
                  </div>
                  <input 
                    name="name" 
                    value={form.name} 
                    onChange={handleChange} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors" 
                    placeholder="Enter company name"
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Logo (emoji)</label>
                  <input 
                    name="logo" 
                    value={form.logo} 
                    onChange={handleChange} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors" 
                    placeholder="e.g. 🟣" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">CEO Name *</label>
                  <input 
                    name="ceoName" 
                    value={form.ceoName} 
                    onChange={handleChange} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors" 
                    placeholder="Enter CEO name"
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">CEO Avatar (emoji)</label>
                  <input 
                    name="ceoAvatar" 
                    value={form.ceoAvatar} 
                    onChange={handleChange} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors" 
                    placeholder="e.g. 👨‍💼" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <label className="block text-sm font-medium text-gray-700">Revenue (€M) *</label>
                    <button 
                      type="button"
                      onClick={() => handleFieldHelp("revenue")}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                      title="Get help for this field"
                    >
                      <HelpCircle className="w-4 h-4" />
                    </button>
                  </div>
                  <input 
                    name="revenue" 
                    value={form.revenue} 
                    onChange={handleChange} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors" 
                    placeholder="e.g. €100M"
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Profit (€M) *</label>
                  <input 
                    name="profit" 
                    value={form.profit} 
                    onChange={handleChange} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors" 
                    placeholder="e.g. €10M"
                    required 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">EBITDA (€M)</label>
                  <input 
                    name="ebitda" 
                    value={form.ebitda} 
                    onChange={handleChange} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors" 
                    placeholder="e.g. €5M" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gross Margin (%)</label>
                  <input 
                    name="grossMargin" 
                    value={form.grossMargin} 
                    onChange={handleChange} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors" 
                    type="number" 
                    step="0.1" 
                    placeholder="e.g. 20.5" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Key Insights (comma separated)</label>
                <input 
                  name="keyInsights" 
                  value={form.keyInsights} 
                  onChange={handleChange} 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors" 
                  placeholder="e.g. Strong Growth, Tech Innovation" 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Revenue Change</label>
                  <select 
                    name="revenueChange" 
                    value={form.revenueChange} 
                    onChange={handleChange} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                  >
                    <option value="positive">Positive</option>
                    <option value="negative">Negative</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Profit Change</label>
                  <select 
                    name="profitChange" 
                    value={form.profitChange} 
                    onChange={handleChange} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                  >
                    <option value="positive">Positive</option>
                    <option value="negative">Negative</option>
                  </select>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}
              {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                  Company added successfully! (Demo only)
                </div>
              )}

              <div className="flex items-center justify-between pt-6 border-t">
                <div className="flex items-center space-x-3">
                  <button 
                    type="button" 
                    onClick={handleClearForm}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Clear Form
                  </button>
                  <button 
                    type="button" 
                    onClick={handleSaveDraft}
                    className="px-4 py-2 text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    Save Draft
                  </button>
                </div>
                <div className="flex items-center space-x-3">
                  <button 
                    type="button" 
                    onClick={() => router.push("/companies")}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Add Company
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

