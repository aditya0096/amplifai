import React from 'react';
import { Calendar, User, ChevronDown, Bell, MessageSquare } from 'lucide-react';
import Dropdown from './Dropdown';

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
}) => (
  <header className="bg-white border-b px-6 py-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <h1
          className="text-2xl font-semibold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors"
          onClick={onPageInfo}
          title={onPageInfo ? `Click for ${title} information` : undefined}
        >
          {title}
        </h1>
        <div
          className="flex items-center space-x-2 text-sm text-gray-500 cursor-pointer hover:text-gray-700 transition-colors"
          onClick={onFiscalYear}
          title={onFiscalYear ? 'Click for fiscal year details' : undefined}
        >
          <Calendar className="w-4 h-4" />
          <span>{fiscalYear}</span>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Dropdown
          trigger={
            <div className="flex items-center space-x-2 hover:bg-gray-50 rounded-lg p-2 transition-colors cursor-pointer">
              <User className="w-8 h-8 text-gray-600 bg-orange-100 rounded-full p-2" />
              <span className="text-sm font-medium text-gray-700">{userName}</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          }
          options={profileOptions}
          align="right"
        />
        <Dropdown
          trigger={
            <div className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">3</span>
            </div>
          }
          options={notificationsOptions}
          align="right"
        />
        <Dropdown
          trigger={
            <div className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
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

export default Header;
