'use client'
import React, { useState, useMemo, useContext } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  ChevronLeft, 
  ChevronRight,
  TrendingUp, 
  TrendingDown,
  Bell,
  MessageSquare,
  User,
  MoreHorizontal,
  ChevronDown,
  LogOut,
  Settings,
  HelpCircle,
  Eye
} from 'lucide-react';
import Sidebar from "@/components/layout/Sidebar";
import Dropdown from "@/components/ui/Dropdown";
import Modal from "@/components/ui/Modal";
import { signOut } from 'next-auth/react';



import { useCompanies } from "@/components/providers/CompaniesProvider";
import type { Company } from "@/components/providers/CompaniesProvider";
import Header from './Header';
import { SidebarContext } from '@/components/layout/Sidebar';


const ITEMS_PER_PAGE = 10;

const Companies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [filters, setFilters] = useState({
    revenueRange: '',
    profitMargin: '',
    industry: '',
    performance: ''
  });

  const { companies } = useCompanies();
  const { collapsed } = useContext(SidebarContext);

  // Filter and sort companies
  const filteredAndSortedCompanies = useMemo(() => {
    let filtered = companies.filter(company =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.ceo.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Apply additional filters
    if (filters.revenueRange) {
      filtered = filtered.filter(company => {
        const revenueValue = parseFloat(company.revenue.replace('€', '').replace('M', ''));
        switch (filters.revenueRange) {
          case 'low':
            return revenueValue < 50;
          case 'medium':
            return revenueValue >= 50 && revenueValue < 200;
          case 'high':
            return revenueValue >= 200;
          default:
            return true;
        }
      });
    }

    if (filters.profitMargin) {
      switch (filters.profitMargin) {
        case 'low':
          filtered = filtered.filter(company => company.grossMargin < 10);
          break;
        case 'medium':
          filtered = filtered.filter(company => company.grossMargin >= 10 && company.grossMargin < 25);
          break;
        case 'high':
          filtered = filtered.filter(company => company.grossMargin >= 25);
          break;
      }
    }

    if (filters.performance) {
      switch (filters.performance) {
        case 'positive':
          filtered = filtered.filter(company => 
            company.revenueChange === 'positive' && company.profitChange === 'positive'
          );
          break;
        case 'negative':
          filtered = filtered.filter(company => 
            company.revenueChange === 'negative' || company.profitChange === 'negative'
          );
          break;
      }
    }

    // Helper to get property value safely
    const getValue = (company: Company, field: string) => {
      if (field === 'ceo') return company.ceo.name;
      if (field === 'revenue' || field === 'profit') {
        // company.revenue and company.profit are strings like '€245M'
        return parseFloat(company[field as 'revenue' | 'profit'].replace('€', '').replace('M', ''));
      }
      if (field === 'grossMargin') return company.grossMargin;
      // fallback for other fields, type-safe
      if (field in company) {
        return company[field as keyof Company];
      }
      return undefined;
    };

    filtered.sort((a, b) => {
      let aValue = getValue(a, sortField);
      let bValue = getValue(b, sortField);

      if (typeof aValue === 'string') aValue = aValue.toLowerCase();
      if (typeof bValue === 'string') bValue = bValue.toLowerCase();

      // Handle undefined values for type safety
      if (aValue === undefined && bValue === undefined) return 0;
      if (aValue === undefined) return 1;
      if (bValue === undefined) return -1;

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      }
    });

    return filtered;
  }, [companies, searchTerm, sortField, sortDirection, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedCompanies.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentCompanies = filteredAndSortedCompanies.slice(startIndex, endIndex);

  const handleSort = (field: React.SetStateAction<string>) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handlePageChange = (page: React.SetStateAction<number>) => {
    setCurrentPage(page);
  };


  const [showExportModal, setShowExportModal] = useState(false);

  const handleExport = () => {
    setShowExportModal(true);
  };

  const exportOptions = [
    {
      label: 'Export as CSV',
      value: 'csv',
      icon: <Download className="w-4 h-4" />,
      onClick: () => {
        console.log('Exporting as CSV...');
        setShowExportModal(false);
      }
    },
    {
      label: 'Export as Excel',
      value: 'excel',
      icon: <Download className="w-4 h-4" />,
      onClick: () => {
        console.log('Exporting as Excel...');
        setShowExportModal(false);
      }
    },
    {
      label: 'Export as PDF',
      value: 'pdf',
      icon: <Download className="w-4 h-4" />,
      onClick: () => {
        console.log('Exporting as PDF...');
        setShowExportModal(false);
      }
    }
  ];


  const handleCompanyClick = (company: Company) => {
    setSelectedCompany(company);
    setShowCompanyModal(true);
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/login' });
  };

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const clearFilters = () => {
    setFilters({
      revenueRange: '',
      profitMargin: '',
      industry: '',
      performance: ''
    });
  };

  const notificationsOptions = [
    {
      label: '2 new companies added this week',
      value: 'new',
      icon: <Plus className="w-4 h-4" />,
      onClick: () => console.log('New companies notification clicked')
    },
    {
      label: 'Revenue report ready for review',
      value: 'report',
      icon: <Download className="w-4 h-4" />,
      onClick: () => console.log('Report notification clicked')
    },
    {
      label: 'Company data sync completed',
      value: 'sync',
      icon: <TrendingUp className="w-4 h-4" />,
      onClick: () => console.log('Sync notification clicked')
    }
  ];

  const messagesOptions = [
    {
      label: 'Finance Team: "Need updated company data"',
      value: 'finance',
      icon: <User className="w-4 h-4" />,
      onClick: () => console.log('Finance message clicked')
    },
    {
      label: 'CEO: "Review top performers"',
      value: 'ceo',
      icon: <TrendingUp className="w-4 h-4" />,
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

  const filterOptions = [
    {
      label: 'Revenue: Low (< €50M)',
      value: 'revenue-low',
      onClick: () => handleFilterChange('revenueRange', 'low')
    },
    {
      label: 'Revenue: Medium (€50M - €200M)',
      value: 'revenue-medium',
      onClick: () => handleFilterChange('revenueRange', 'medium')
    },
    {
      label: 'Revenue: High (> €200M)',
      value: 'revenue-high',
      onClick: () => handleFilterChange('revenueRange', 'high')
    },
    {
      label: 'Margin: Low (< 10%)',
      value: 'margin-low',
      onClick: () => handleFilterChange('profitMargin', 'low')
    },
    {
      label: 'Margin: Medium (10% - 25%)',
      value: 'margin-medium',
      onClick: () => handleFilterChange('profitMargin', 'medium')
    },
    {
      label: 'Margin: High (> 25%)',
      value: 'margin-high',
      onClick: () => handleFilterChange('profitMargin', 'high')
    },
    {
      label: 'Performance: Positive',
      value: 'performance-positive',
      onClick: () => handleFilterChange('performance', 'positive')
    },
    {
      label: 'Performance: Negative',
      value: 'performance-negative',
      onClick: () => handleFilterChange('performance', 'negative')
    },
    {
      label: 'Clear All Filters',
      value: 'clear',
      icon: <Filter className="w-4 h-4" />,
      onClick: clearFilters
    }
  ];

  // Helper to get filter label
  const getFilterLabel = (type: string, value: string) => {
    if (type === 'revenueRange') {
      if (value === 'low') return 'Revenue: Low (< €50M)';
      if (value === 'medium') return 'Revenue: Medium (€50M-€200M)';
      if (value === 'high') return 'Revenue: High (> €200M)';
    }
    if (type === 'profitMargin') {
      if (value === 'low') return 'Margin: Low (< 10%)';
      if (value === 'medium') return 'Margin: Medium (10%-25%)';
      if (value === 'high') return 'Margin: High (> 25%)';
    }
    if (type === 'performance') {
      if (value === 'positive') return 'Performance: Positive';
      if (value === 'negative') return 'Performance: Negative';
    }
    return null;
  };

  // Make handleFilterChange available globally for the modal
  React.useEffect(() => {
    (window as any).handleFilterChange = handleFilterChange;
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      {/* Main Content */}
      <div className={`transition-all duration-200 ease-out ${collapsed ? 'lg:ml-16' : 'md:ml-64 lg:ml-64'}`}>
        <Header
          title="List of Companies"
          profileOptions={profileOptions}
          notificationsOptions={notificationsOptions}
          messagesOptions={messagesOptions}
        />
        <div className="p-4 lg:p-6">
          {/* Controls Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 lg:mb-2 space-y-4 lg:space-y-0">
            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search Companies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none w-full sm:w-64"
                />
              </div>
              <Dropdown
                trigger={
                  <div className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-150 ease-out cursor-pointer">
                    <Filter className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-gray-700">Filter</span>
                    <ChevronDown className="w-4 h-4 ml-2 text-gray-400" />
                  </div>
                }
                options={filterOptions}
                align="left"
              />
            </div>
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
              <Dropdown
                trigger={
                  <div className="flex items-center justify-center px-4 py-2 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors duration-150 ease-out cursor-pointer">
                    <Download className="w-4 h-4 mr-2" />
                    <span>Export</span>
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </div>
                }
                options={exportOptions}
                align="right"
              />
              <button 
                onClick={() => window.location.href = '/add-company'}
                className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-150 ease-out"
              >
                <Plus className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Add Company</span>
                <span className="sm:hidden">Add</span>
              </button>
            </div>
          </div>

          {/* Active Filters Chips */}
          {Object.entries(filters).some(([_, v]) => v) && (
            <div className="flex flex-wrap items-center gap-2 mb-6 mt-2">
              {Object.entries(filters).map(([type, value]) => (
                value ? (
                  <span key={type} className="inline-flex items-center bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm font-medium transition-colors duration-150 ease-out">
                    {getFilterLabel(type, value)}
                    <button
                      onClick={() => handleFilterChange(type, '')}
                      className="ml-2 text-blue-500 hover:text-blue-700 focus:outline-none transition-colors duration-150 ease-out"
                      title="Remove filter"
                    >
                      &times;
                    </button>
                  </span>
                ) : null
              ))}
              <button
                onClick={clearFilters}
                className="ml-2 px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-300 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Results Info */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-2 sm:space-y-0">
            <p className="text-sm text-gray-600">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredAndSortedCompanies.length)} of {filteredAndSortedCompanies.length} companies
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>Page {currentPage} of {totalPages}</span>
            </div>
          </div>

          {/* Companies Table */}
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead className="bg-gray-50">
                  <tr>
                    <th 
                      className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('name')}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Company Name</span>
                        {sortField === 'name' && (
                          sortDirection === 'asc' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />
                        )}
                      </div>
                    </th>
                    <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      CEO/Key Person
                    </th>
                    <th 
                      className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('revenue')}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Revenue</span>
                        {sortField === 'revenue' && (
                          sortDirection === 'asc' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('profit')}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Profit</span>
                        {sortField === 'profit' && (
                          sortDirection === 'asc' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />
                        )}
                      </div>
                    </th>
                    <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      EBITDA
                    </th>
                    <th 
                      className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('grossMargin')}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Gross Margin</span>
                        {sortField === 'grossMargin' && (
                          sortDirection === 'asc' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />
                        )}
                      </div>
                    </th>
                    <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Key Insights
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentCompanies.map((company) => (
                    <tr key={company.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleCompanyClick(company)}>
                      <td className="px-3 lg:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-xl lg:text-2xl mr-2 lg:mr-3">{company.logo}</span>
                          <span className="text-xs lg:text-sm font-medium text-gray-900">{company.name}</span>
                        </div>
                      </td>
                      <td className="px-3 lg:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-base lg:text-lg mr-2 lg:mr-3">{company.ceo.avatar}</span>
                          <span className="text-xs lg:text-sm text-gray-900">{company.ceo.name}</span>
                        </div>
                      </td>
                      <td className="px-3 lg:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-xs lg:text-sm font-medium text-gray-900 mr-1 lg:mr-2">{company.revenue}</span>
                          {company.revenueChange === 'positive' ? (
                            <TrendingUp className="w-3 h-3 lg:w-4 lg:h-4 text-green-500" />
                          ) : (
                            <TrendingDown className="w-3 h-3 lg:w-4 lg:h-4 text-red-500" />
                          )}
                        </div>
                      </td>
                      <td className="px-3 lg:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-xs lg:text-sm text-gray-900 mr-1 lg:mr-2">{company.profit}</span>
                          {company.profitChange === 'positive' ? (
                            <TrendingUp className="w-3 h-3 lg:w-4 lg:h-4 text-green-500" />
                          ) : (
                            <TrendingDown className="w-3 h-3 lg:w-4 lg:h-4 text-red-500" />
                          )}
                        </div>
                      </td>
                      <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-xs lg:text-sm text-gray-900">
                        {company.ebitda}
                      </td>
                      <td className="px-3 lg:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className={`text-xs lg:text-sm font-medium mr-1 ${
                            company.grossMargin > 20 ? 'text-green-600' : 
                            company.grossMargin > 10 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {company.grossMargin}%
                          </span>
                        </div>
                      </td>
                      <td className="px-3 lg:px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {company.keyInsights.slice(0, 2).map((insight, index) => (
                            <span
                              key={index}
                              className="inline-block px-1 lg:px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
                            >
                              {insight}
                            </span>
                          ))}
                          {company.keyInsights.length > 2 && (
                            <span className="inline-block px-1 lg:px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                              +{company.keyInsights.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between mt-6 space-y-4 sm:space-y-0">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="flex items-center px-4 py-2 text-sm text-gray-500 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </button>

            <div className="flex items-center space-x-2">
              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-2 text-sm rounded-lg ${
                        page === currentPage
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {page}
                    </button>
                  );
                } else if (page === currentPage - 2 || page === currentPage + 2) {
                  return <span key={page} className="px-2 text-gray-500">...</span>;
                }
                return null;
              })}
            </div>

            <button
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center px-4 py-2 text-sm text-gray-500 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </div>

      {/* Company Details Modal */}
      <Modal
        isOpen={showCompanyModal}
        onClose={() => setShowCompanyModal(false)}
        title={selectedCompany?.name || 'Company Details'}
        size="lg"
      >
        {selectedCompany && (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <span className="text-4xl">{selectedCompany.logo}</span>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{selectedCompany.name}</h3>
                <p className="text-gray-600">Company ID: #{selectedCompany.id}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">CEO Information</h4>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{selectedCompany.ceo.avatar}</span>
                    <span className="text-lg font-medium">{selectedCompany.ceo.name}</span>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Financial Metrics</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Revenue:</span>
                      <span className="font-medium">{selectedCompany.revenue}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Profit:</span>
                      <span className="font-medium">{selectedCompany.profit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">EBITDA:</span>
                      <span className="font-medium">{selectedCompany.ebitda}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Gross Margin:</span>
                      <span className="font-medium">{selectedCompany.grossMargin}%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Performance Trends</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Revenue Change:</span>
                      <div className="flex items-center space-x-1">
                        {selectedCompany.revenueChange === 'positive' ? (
                          <TrendingUp className="w-4 h-4 text-green-500" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-500" />
                        )}
                        <span className={`font-medium ${
                          selectedCompany.revenueChange === 'positive' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {selectedCompany.revenueChange === 'positive' ? 'Positive' : 'Negative'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Profit Change:</span>
                      <div className="flex items-center space-x-1">
                        {selectedCompany.profitChange === 'positive' ? (
                          <TrendingUp className="w-4 h-4 text-green-500" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-500" />
                        )}
                        <span className={`font-medium ${
                          selectedCompany.profitChange === 'positive' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {selectedCompany.profitChange === 'positive' ? 'Positive' : 'Negative'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Key Insights</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCompany.keyInsights.map((insight, index) => (
                      <span
                        key={index}
                        className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full"
                      >
                        {insight}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button
                onClick={() => setShowCompanyModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Edit Company
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Companies;