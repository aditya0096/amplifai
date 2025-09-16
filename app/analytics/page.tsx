"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Dropdown from "@/components/ui/Dropdown";
import Modal from "@/components/ui/Modal";
import Header from '@/components/ui/Header';
import { 
  Bell, 
  MessageSquare, 
  User, 
  Calendar, 
  ChevronDown, 
  LogOut, 
  Settings, 
  HelpCircle,
  BarChart3,
  TrendingUp,
  TrendingDown,
  PieChart,
  DollarSign,
  Building2,
  Download,
  Filter
} from "lucide-react";
import { signOut } from "next-auth/react";
import { SidebarContext } from '@/components/layout/Sidebar';
import { useContext } from 'react';

export default function AnalyticsPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState('');
  const { collapsed } = useContext(SidebarContext);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/login' });
  };

  const handleReportClick = (reportType: string) => {
    setSelectedReport(reportType);
    setShowReportModal(true);
  };

  const notificationsOptions = [
    {
      label: 'Analytics report generated',
      value: 'report',
      icon: <BarChart3 className="w-4 h-4" />,
      onClick: () => console.log('Report notification clicked')
    },
    {
      label: 'Data sync completed',
      value: 'sync',
      icon: <TrendingUp className="w-4 h-4" />,
      onClick: () => console.log('Sync notification clicked')
    },
    {
      label: 'Performance alert',
      value: 'performance',
      icon: <TrendingDown className="w-4 h-4" />,
      onClick: () => console.log('Performance notification clicked')
    }
  ];

  const messagesOptions = [
    {
      label: 'Analytics Team: "Monthly report ready"',
      value: 'analytics',
      icon: <User className="w-4 h-4" />,
      onClick: () => console.log('Analytics message clicked')
    },
    {
      label: 'CEO: "Review Q4 performance"',
      value: 'ceo',
      icon: <User className="w-4 h-4" />,
      onClick: () => console.log('CEO message clicked')
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

  const reportOptions = [
    {
      label: 'Revenue Analysis',
      value: 'revenue',
      icon: <DollarSign className="w-4 h-4" />,
      onClick: () => handleReportClick('Revenue Analysis')
    },
    {
      label: 'Company Performance',
      value: 'performance',
      icon: <Building2 className="w-4 h-4" />,
      onClick: () => handleReportClick('Company Performance')
    },
    {
      label: 'Market Trends',
      value: 'trends',
      icon: <TrendingUp className="w-4 h-4" />,
      onClick: () => handleReportClick('Market Trends')
    },
    {
      label: 'Financial Overview',
      value: 'financial',
      icon: <PieChart className="w-4 h-4" />,
      onClick: () => handleReportClick('Financial Overview')
    }
  ];

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50">
        <Sidebar />
        <div className="md:ml-64 lg:ml-64">
          <header className="bg-white border-b px-4 lg:px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h1 className="text-xl lg:text-2xl font-semibold text-gray-900">Analytics</h1>
              </div>
            </div>
          </header>
          <div className="p-4 lg:p-6">
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Loading...</span>
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
      <div className={`transition-all duration-200 ease-out ${collapsed ? 'lg:ml-16' : 'md:ml-64 lg:ml-64'}`}>
        <Header
          title="Analytics"
          profileOptions={profileOptions}
          notificationsOptions={notificationsOptions}
          messagesOptions={messagesOptions}
        />
        <div className="p-4 lg:p-6">
          {/* Analytics Overview */}
          <div className="mb-6 lg:mb-8">
            <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3 lg:mb-4">Analytics Overview</h2>
            <p className="text-gray-600 mb-4 lg:mb-6">
              Comprehensive analytics and reporting tools to help you understand your business performance.
            </p>
          </div>

          {/* Report Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
            <div 
              onClick={() => handleReportClick('Revenue Analysis')}
              className="bg-white rounded-lg p-4 lg:p-6 shadow-sm border hover:shadow-md transition-all duration-150 ease-out cursor-pointer hover:scale-105"
            >
              <div className="flex items-center justify-between mb-3 lg:mb-4">
                <div className="p-2 lg:p-3 bg-blue-100 rounded-lg">
                  <DollarSign className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
                </div>
                <TrendingUp className="w-4 h-4 lg:w-5 lg:h-5 text-green-500" />
              </div>
              <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-2">Revenue Analysis</h3>
              <p className="text-gray-600 text-xs lg:text-sm">Detailed revenue breakdown and trends</p>
            </div>

            <div 
              onClick={() => handleReportClick('Company Performance')}
              className="bg-white rounded-lg p-4 lg:p-6 shadow-sm border hover:shadow-md transition-all duration-150 ease-out cursor-pointer hover:scale-105"
            >
              <div className="flex items-center justify-between mb-3 lg:mb-4">
                <div className="p-2 lg:p-3 bg-green-100 rounded-lg">
                  <Building2 className="w-5 h-5 lg:w-6 lg:h-6 text-green-600" />
                </div>
                <TrendingUp className="w-4 h-4 lg:w-5 lg:h-5 text-green-500" />
              </div>
              <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-2">Company Performance</h3>
              <p className="text-gray-600 text-xs lg:text-sm">Individual company metrics and KPIs</p>
            </div>

            <div 
              onClick={() => handleReportClick('Market Trends')}
              className="bg-white rounded-lg p-4 lg:p-6 shadow-sm border hover:shadow-md transition-all duration-150 ease-out cursor-pointer hover:scale-105"
            >
              <div className="flex items-center justify-between mb-3 lg:mb-4">
                <div className="p-2 lg:p-3 bg-purple-100 rounded-lg">
                  <TrendingUp className="w-5 h-5 lg:w-6 lg:h-6 text-purple-600" />
                </div>
                <TrendingUp className="w-4 h-4 lg:w-5 lg:h-5 text-green-500" />
              </div>
              <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-2">Market Trends</h3>
              <p className="text-gray-600 text-xs lg:text-sm">Industry trends and market analysis</p>
            </div>

            <div 
              onClick={() => handleReportClick('Financial Overview')}
              className="bg-white rounded-lg p-4 lg:p-6 shadow-sm border hover:shadow-md transition-all duration-150 ease-out cursor-pointer hover:scale-105"
            >
              <div className="flex items-center justify-between mb-3 lg:mb-4">
                <div className="p-2 lg:p-3 bg-orange-100 rounded-lg">
                  <PieChart className="w-5 h-5 lg:w-6 lg:h-6 text-orange-600" />
                </div>
                <TrendingUp className="w-4 h-4 lg:w-5 lg:h-5 text-green-500" />
              </div>
              <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-2">Financial Overview</h3>
              <p className="text-gray-600 text-xs lg:text-sm">Comprehensive financial metrics</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm border">
            <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-3 lg:mb-4">Quick Actions</h3>
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
              <Dropdown
                trigger={
                  <div className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-150 ease-out cursor-pointer">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    <span>Generate Report</span>
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </div>
                }
                options={reportOptions}
                align="left"
              />
              
              <button className="flex items-center justify-center px-4 py-2 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors duration-150 ease-out">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </button>
              
              <button className="flex items-center justify-center px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-150 ease-out">
                <Filter className="w-4 h-4 mr-2" />
                Advanced Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Report Modal */}
      <Modal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        title={`${selectedReport} Report`}
        size="lg"
      >
        <div className="space-y-4 lg:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-3 lg:p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Report Type</h4>
              <p className="text-base lg:text-lg font-semibold text-blue-600">{selectedReport}</p>
            </div>
            <div className="bg-gray-50 p-3 lg:p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Generated</h4>
              <p className="text-base lg:text-lg font-semibold text-gray-600">Just now</p>
            </div>
          </div>
          
          <div className="bg-gray-50 p-3 lg:p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Report Preview</h4>
            <div className="h-48 lg:h-64 bg-white rounded border flex items-center justify-center text-gray-500">
              <div className="text-center">
                <BarChart3 className="w-8 h-8 lg:w-12 lg:h-12 mx-auto mb-3 lg:mb-4 text-gray-400" />
                <p className="text-sm lg:text-base">Report visualization would be displayed here</p>
                <p className="text-xs lg:text-sm mt-2">Charts, graphs, and detailed analytics</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
            <button
              onClick={() => setShowReportModal(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-150 ease-out"
            >
              Close
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-150 ease-out">
              Download Report
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
