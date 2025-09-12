
"use client";
import React, { useState, createContext, useContext } from "react";
import { usePathname } from "next/navigation";
import { PieChart, Building2, DollarSign, ChevronLeft, ChevronRight } from "lucide-react";

const navItems = [
	{
		href: "/dashboard",
		label: "Dashboard",
		icon: PieChart,
	},
	{
		href: "/companies",
		label: "List of Companies",
		icon: Building2,
	},
	{
		href: "/add-company",
		label: "Add Company",
		icon: Building2,
	},
	{
		href: "/analytics",
		label: "Analytics",
		icon: DollarSign,
	},
];

export const SidebarContext = createContext<{
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}>({ collapsed: false, setCollapsed: () => {} });

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      {children}
    </SidebarContext.Provider>
  );
};

const Sidebar: React.FC = () => {
	const pathname = usePathname();
  const { collapsed, setCollapsed } = useContext(SidebarContext);

	return (
		<div className={`fixed left-0 top-0 h-full bg-slate-800 text-white z-40 transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
			<div className="p-4 flex items-center justify-between">
				<div className="flex items-center">
					<div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
						<div className="w-4 h-4 bg-white rounded-sm transform rotate-45"></div>
					</div>
					{!collapsed && <span className="text-xl font-semibold">FlowState</span>}
				</div>
				<button
					onClick={() => setCollapsed((prev) => !prev)}
					className="ml-2 p-2 rounded hover:bg-slate-700 transition-colors"
					title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
				>
					{collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
				</button>
			</div>
			<nav className="space-y-2 mt-4">
				{navItems.map((item) => {
					const isActive = pathname.startsWith(item.href);
					return (
						<a
							key={item.href}
							href={item.href}
							className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
								isActive
									? "text-blue-400 bg-slate-700"
									: "text-gray-300 hover:bg-slate-700"
							}`}
						>
							<item.icon className="w-5 h-5 mr-0.5" />
							{!collapsed && <span className="ml-3">{item.label}</span>}
						</a>
					);
				})}
			</nav>
		</div>
	);
};

export default Sidebar;
