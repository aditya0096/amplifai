
"use client";
import React, { useState, createContext, useContext } from "react";
import { usePathname } from "next/navigation";
import { PieChart, Building2, DollarSign, ChevronLeft, ChevronRight, Menu, X } from "lucide-react";

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
  mobileOpen: boolean;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>({ collapsed: false, setCollapsed: () => {}, mobileOpen: false, setMobileOpen: () => {} });

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed, mobileOpen, setMobileOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};

const Sidebar: React.FC = () => {
	const pathname = usePathname();
  const { collapsed, setCollapsed, mobileOpen, setMobileOpen } = useContext(SidebarContext);

	return (
		<>
			{/* Mobile Overlay - Only for small screens */}
			{mobileOpen && (
				<div 
					className="fixed inset-0 bg-gray-900 bg-opacity-10 z-40 sm:hidden transition-opacity duration-200 ease-out"
					onClick={() => setMobileOpen(false)}
				/>
			)}
			
			{/* Sidebar */}
			<div className={`
				fixed left-0 top-0 h-full bg-slate-800 text-white z-50 transition-all duration-200 ease-out
				${mobileOpen ? 'w-full sm:w-64 md:w-72' : 'w-0 sm:w-0 md:w-64 lg:w-16'}
				${collapsed && !mobileOpen ? 'lg:w-16' : 'lg:w-64'}
				overflow-hidden lg:overflow-visible
			`}>
				<div className="p-4 flex items-center justify-between">
					<div className="flex items-center">
						<div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
							<div className="w-4 h-4 bg-white rounded-sm transform rotate-45"></div>
						</div>
						{(mobileOpen || (!collapsed && !mobileOpen)) && <span className="text-xl font-semibold">FlowState</span>}
					</div>
					<div className="flex items-center space-x-2">
						{/* Mobile close button */}
						<button
							onClick={() => setMobileOpen(false)}
							className="lg:hidden p-2 rounded hover:bg-slate-700 transition-colors duration-150 ease-out"
							title="Close sidebar"
						>
							<X className="w-5 h-5" />
						</button>
						{/* Desktop collapse button */}
						<button
							onClick={() => setCollapsed((prev) => !prev)}
							className="hidden lg:block ml-2 p-2 rounded hover:bg-slate-700 transition-colors duration-150 ease-out"
							title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
						>
							{collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
						</button>
					</div>
				</div>
				<nav className="space-y-2 mt-4">
					{navItems.map((item) => {
						const isActive = pathname.startsWith(item.href);
						return (
							<a
								key={item.href}
								href={item.href}
								onClick={() => setMobileOpen(false)}
								className={`flex items-center px-4 py-3 rounded-lg transition-all duration-150 ease-out ${
									isActive
										? "text-blue-400 bg-slate-700"
										: "text-gray-300 hover:bg-slate-700"
								}`}
							>
								<item.icon className="w-5 h-5 mr-0.5" />
								{(mobileOpen || (!collapsed && !mobileOpen)) && <span className="ml-3">{item.label}</span>}
							</a>
						);
					})}
				</nav>
			</div>
		</>
	);
};

export default Sidebar;
