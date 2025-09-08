
"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { PieChart, Building2, DollarSign } from "lucide-react";

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
		href: "#",
		label: "Analytics",
		icon: DollarSign,
	},
];

const Sidebar: React.FC = () => {
	const pathname = usePathname();
	return (
		<div className="fixed left-0 top-0 w-64 h-full bg-slate-800 text-white">
			<div className="p-6">
				<div className="flex items-center mb-8">
					<div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
						<div className="w-4 h-4 bg-white rounded-sm transform rotate-45"></div>
					</div>
					<span className="text-xl font-semibold">FlowState</span>
				</div>
				<nav className="space-y-2">
					{navItems.map((item) => {
						const isActive =
							item.href !== "#" && pathname.startsWith(item.href);
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
								<item.icon className="w-5 h-5 mr-3" />
								{item.label}
							</a>
						);
					})}
				</nav>
			</div>
		</div>
	);
};

export default Sidebar;
