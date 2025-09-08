import React from 'react';
import {
  TrendingUp,
  TrendingDown,
  Bell,
  MessageSquare,
  User,
  Calendar,
  DollarSign,
  PieChart,
  Building2,
  MoreHorizontal
} from 'lucide-react';
import Sidebar from "@/components/layout/Sidebar";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from 'recharts';

// Mock data
const revenueData = [
  { month: 'Jul 24', revenue: 40, profit: 20 },
  { month: 'Aug 24', revenue: 45, profit: 18 },
  { month: 'Sep 24', revenue: 50, profit: 22 },
  { month: 'Oct 24', revenue: 48, profit: 19 },
  { month: 'Nov 24', revenue: 55, profit: 25 },
  { month: 'Dec 24', revenue: 52, profit: 21 },
  { month: 'Jan 25', revenue: 60, profit: 28 },
  { month: 'Feb 25', revenue: 58, profit: 26 },
  { month: 'Mar 25', revenue: 65, profit: 30 },
  { month: 'Apr 25', revenue: 62, profit: 28 },
  { month: 'May 25', revenue: 70, profit: 35 },
  { month: 'Jun 25', revenue: 68, profit: 32 }
];

const marginData = [
  { month: 'Jan', revenue: 85, operating: 75, cogs: 45 },
  { month: 'Feb', revenue: 78, operating: 68, cogs: 42 },
  { month: 'Mar', revenue: 82, operating: 72, cogs: 48 },
  { month: 'Apr', revenue: 88, operating: 78, cogs: 50 }
];

const performanceData = [
  {
    id: 1,
    company: 'NextGen Software Ltd.',
    logo: '🟠',
    revenue: '€68.9M',
    netProfit: '€8.1M',
    ebitda: '+26.5%',
    cashFlow: '€6.8M',
    wcCycle: '52'
  },
  {
    id: 2,
    company: 'Global Tech Solutions',
    logo: '🔴',
    revenue: '€62.6M',
    netProfit: '€6.3M',
    ebitda: '+19.3%',
    cashFlow: '€4.5M',
    wcCycle: '76'
  },
  {
    id: 3,
    company: 'Innovative Tech Solutions',
    logo: '🔵',
    revenue: '€54.6M',
    netProfit: '€5.3M',
    ebitda: '+18.5%',
    cashFlow: '€3.8M',
    wcCycle: '45'
  },
  {
    id: 4,
    company: 'Creative Design Group',
    logo: '🟢',
    revenue: '€36.5M',
    netProfit: '€4.1M',
    ebitda: '+0.9%',
    cashFlow: '€2.3M',
    wcCycle: '88'
  },
  {
    id: 5,
    company: 'Digital Dynamics Inc.',
    logo: '🟡',
    revenue: '€30.2M',
    netProfit: '€3.9M',
    ebitda: '-3.9%',
    cashFlow: '€1.9M',
    wcCycle: '25'
  },
  {
    id: 6,
    company: 'Helix Digital Innovations',
    logo: '🟣',
    revenue: '€22.3M',
    netProfit: '€0.3M',
    ebitda: '-1.5%',
    cashFlow: '€0.8M',
    wcCycle: '36'
  }
];

// Components
type MetricCardProps = {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, isPositive, icon: Icon }) => (
  <div className="bg-white rounded-lg p-6 shadow-sm border">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
      </div>
      <div className="p-3 bg-gray-50 rounded-lg">
        <Icon className="w-6 h-6 text-gray-600" />
      </div>
    </div>
    <div className="flex items-center mt-4">
      {isPositive ? (
        <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
      ) : (
        <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
      )}
      <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {change}
      </span>
      <span className="text-sm text-gray-500 ml-1">vs last month</span>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />

      {/* Main Content */}
      <div className="ml-64">
        {/* Header */}
        <header className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>FY (2024-2025)</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="w-8 h-8 text-gray-600 bg-orange-100 rounded-full p-2" />
                <span className="text-sm font-medium text-gray-700">Queen Infra</span>
              </div>
              <Bell className="w-5 h-5 text-gray-600" />
              <MessageSquare className="w-5 h-5 text-gray-600" />
            </div>
          </div>
        </header>

        <div className="p-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <MetricCard
              title="Consolidated Revenue"
              value="€24.5B"
              change="+12.5%"
              isPositive={true}
              icon={DollarSign}
            />
            <MetricCard
              title="Net Profit"
              value="€40.5M"
              change="+8.3% YoY"
              isPositive={true}
              icon={TrendingUp}
            />
            <MetricCard
              title="EBITDA Margin"
              value="14.6%"
              change="-3.6% YoY"
              isPositive={false}
              icon={PieChart}
            />
            <MetricCard
              title="Working Capital"
              value="€25.7M"
              change="-3.5% YoY"
              isPositive={false}
              icon={Building2}
            />
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8">
            {/* Revenue & Profit Trend */}
            <div className="col-span-2 bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Revenue & Profit Trend</h3>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-gray-600">Revenue (Jan 25) €1.6M</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    <span className="text-gray-600">Profit Trend</span>
                  </div>
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#666' }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#666' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="profit"
                      stroke="#ef4444"
                      strokeWidth={2}
                      dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Margin Trends */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Margin Trends</h3>
                <span className="text-sm text-gray-500">(Last 4 Months)</span>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={marginData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#666' }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#666' }}
                    />
                    <Bar dataKey="revenue" fill="#3b82f6" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="operating" fill="#8b5cf6" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="cogs" fill="#10b981" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-between mt-4 text-xs">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-gray-600">Revenue</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                  <span className="text-gray-600">Operating Expenses</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-gray-600">COGS</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 mt-8">
            {/* Entity-wise Performance Table */}
            <div className="col-span-2 bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Entity-wise Performance</h3>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Company Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Revenue
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Net Profit
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        EBITDA
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cash Flow(€M)
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        WC Cycle (Days)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {performanceData.map((company) => (
                      <tr key={company.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="text-2xl mr-3">{company.logo}</span>
                            <span className="text-sm font-medium text-gray-900">{company.company}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                          {company.revenue}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {company.netProfit}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {company.ebitda.startsWith('+') ? (
                              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                            ) : (
                              <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                            )}
                            <span className={`text-sm font-medium ${company.ebitda.startsWith('+') ? 'text-green-600' : 'text-red-600'
                              }`}>
                              {company.ebitda}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {company.cashFlow}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {company.wcCycle}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {/* Insights Panel (Right Side) */}
            <div className="bg-white rounded-lg shadow-lg border p-6 max-h-96 overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">📊 Insights</h3>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                  <h4 className="font-medium text-gray-900 mb-2">Monthly Variance Summaries</h4>
                  <p className="text-sm text-gray-600">
                    96% Digital innovations reported an 8% decline in profit this month,
                    primarily driven by increased logistics expenses.
                  </p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                  <h4 className="font-medium text-gray-900 mb-2">Recommended Actions</h4>
                  <p className="text-sm text-gray-600">
                    Reduce spend focus to Predictive Technologies by 12% to improve
                    next quarter, as new partnerships are expected to enhance market reach.
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
                  <h4 className="font-medium text-gray-900 mb-2">Market Trends</h4>
                  <p className="text-sm text-gray-600">
                    Quantum Computing LLC has seen a 15% increase in customer demand,
                    attributed to the launch of their new product line.
                  </p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-400">
                  <h4 className="font-medium text-gray-900 mb-2">Future Projections</h4>
                  <p className="text-sm text-gray-600">
                    Analysts predict a 10% growth in revenue for Apex Digital Innovations
                    next quarter, as new partnerships are expected to enhance market reach.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;