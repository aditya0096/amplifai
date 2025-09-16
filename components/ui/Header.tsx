import React, { useContext } from 'react';
import { Calendar, User, ChevronDown, Bell, MessageSquare, Menu } from 'lucide-react';
import Dropdown from './Dropdown';
import { SidebarContext } from '@/components/layout/Sidebar';

interface HeaderProps {
  title: string;
  onPageInfo?: () => void;
  onFiscalYear?: () => void;
  profileOptions: any[];
  notificationsOptions: any[];
  messagesOptions: any[];
  fiscalYear?: string;
  userName?: string;
}

const Header: React.FC<HeaderProps> = ({
  title,
  onPageInfo,
  onFiscalYear,
  profileOptions,
  notificationsOptions,
  messagesOptions,
  fiscalYear = 'FY (2024-2025)',
  userName = 'Queen Infra',
}) => {
  const { setMobileOpen } = useContext(SidebarContext);

  return (
    <header className="bg-white border-b px-4 lg:px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Mobile hamburger menu */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-150 ease-out"
            title="Open menu"
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4">
            <h1
              className="text-xl lg:text-2xl font-semibold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors duration-150 ease-out"
              onClick={onPageInfo}
              title={onPageInfo ? `Click for ${title} information` : undefined}
            >
              {title}
            </h1>
            <div
              className="hidden lg:flex items-center space-x-2 text-sm text-gray-500 cursor-pointer hover:text-gray-700 transition-colors duration-150 ease-out"
              onClick={onFiscalYear}
              title={onFiscalYear ? 'Click for fiscal year details' : undefined}
            >
              <Calendar className="w-4 h-4" />
              <span>{fiscalYear}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 lg:space-x-4">
          {/* Mobile fiscal year */}
          <div
            className="lg:hidden flex items-center space-x-2 text-sm text-gray-500 cursor-pointer hover:text-gray-700 transition-colors duration-150 ease-out"
            onClick={onFiscalYear}
            title={onFiscalYear ? 'Click for fiscal year details' : undefined}
          >
            <Calendar className="w-4 h-4" />
            <span className="hidden sm:inline">{fiscalYear}</span>
          </div>
          
          {/* Profile dropdown - responsive */}
          <Dropdown
            trigger={
              <div className="flex items-center space-x-1 lg:space-x-2 hover:bg-gray-50 rounded-lg p-2 transition-colors duration-150 ease-out cursor-pointer">
                <User className="w-6 h-6 lg:w-8 lg:h-8 text-gray-600 bg-orange-100 rounded-full p-1 lg:p-2" />
                <span className="hidden sm:inline text-sm font-medium text-gray-700">{userName}</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            }
            options={profileOptions}
            align="right"
          />
          
          {/* Notifications */}
          <Dropdown
            trigger={
              <div className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors duration-150 ease-out cursor-pointer">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">3</span>
              </div>
            }
            options={notificationsOptions}
            align="right"
          />
          
          {/* Messages */}
          <Dropdown
            trigger={
              <div className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors duration-150 ease-out cursor-pointer">
                <MessageSquare className="w-5 h-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full text-xs text-white flex items-center justify-center">2</span>
              </div>
            }
            options={messagesOptions}
            align="right"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;

