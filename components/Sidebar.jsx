'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingCart, Package, Users, Building2, Receipt, FileBarChart2, Settings, Wallet, Menu, X, Loader2 } from "lucide-react";

// A list of light colors
const lightColors = [
    'bg-blue-100', 'bg-green-100', 'bg-yellow-100', 'bg-purple-100', 'bg-red-100', 'bg-indigo-100', 'bg-pink-100', 'bg-teal-100'
];

// NavItem Component
const NavItem = ({ href, icon: Icon, label, onMobileClick }) => {
    const pathname = usePathname();
    const active = pathname === href;
    return (
        <Link href={href} className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-colors
      ${active ? "bg-indigo-600 text-white" : "hover:bg-slate-100 text-slate-700"}`} onClick={onMobileClick}>
            <Icon size={18} />
            <span className="font-medium">{label}</span>
        </Link>
    );
};

// NavDropdownItem Component
const NavDropdownItem = ({ icon: Icon, label, items, onMobileClick }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSubmenuHref, setActiveSubmenuHref] = useState("");
    const [currentColorIndex, setCurrentColorIndex] = useState(0);

    const handleSubmenuClick = (href) => {
        setActiveSubmenuHref(href);
        setCurrentColorIndex((prevIndex) => (prevIndex + 1) % lightColors.length);
        if (onMobileClick) {
            onMobileClick();
        }
    };

    return (
        <div
            className="relative group"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            {/* Main Menu Item */}
            <div className="flex items-center gap-3 px-3 py-2 rounded-xl transition-colors hover:bg-slate-100 text-slate-700 cursor-pointer">
                <Icon size={18} />
                <span className="font-medium">{label}</span>
            </div>

            {/* Sub-menu that opens to the right */}
            <div className={`absolute top-0 left-full ml-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-10 
        transition-all duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>

                {/* Sub-menu Items */}
                <div className="flex flex-col">
                    {items && items.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => handleSubmenuClick(item.href)}
                            className={`block px-4 py-2 text-sm text-gray-700 transition-colors
                ${activeSubmenuHref === item.href ? lightColors[currentColorIndex] : "hover:bg-rose-50"}`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default function Sidebar() {
    const [isLoading, setIsLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        // Simulating a data fetch
        setTimeout(() => {
            setIsLoading(false);
        }, 1500); // 1.5 seconds loading time
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleLinkClick = () => {
        // Close the sidebar on mobile after a link is clicked
        if (isSidebarOpen) {
            setIsSidebarOpen(false);
        }
    };

    const salesItems = [
        { href: "/sales/add-new", label: "Add New" },
        { href: "/sales/list", label: "View List / History" },
        { href: "/sales/report", label: "Generate Report" },
    ];
    const purchasesItems = [
        { href: "/purchases/add-new", label: "Add New" },
        { href: "/purchases/list", label: "View List / History" },
        { href: "/purchases/orders", label: "View Orders" },
        { href: "/purchases/report", label: "Generate Report" },
    ];
    const vendorsItems = [
        { href: "/vendors/add-new", label: "Add New" },
        { href: "/vendors/list", label: "View List / History" },
        { href: "/vendors/payments", label: "vendor payments" },
        { href: "/vendors/report", label: "Generate Report" },
    ];
    const customersItems = [
        { href: "/customers/add-new", label: "Add New" },
        { href: "/customers/list", label: "View List / History" },
        { href: "/customers/report", label: "Generate Report" },
    ];
    const accountsItems = [
        { href: "/accounts/add-new", label: "Add New" },
        { href: "/accounts/list", label: "View List / History" },
        { href: "/accounts/report", label: "Generate Report" },
    ];
    const reportsItems = [
        { href: "/reports/add-new", label: "Add New" },
        { href: "/reports/list", label: "View List / History" },
        { href: "/reports/report", label: "Generate Report" },
    ];

    if (isLoading) {
        return (
            <aside className="fixed left-0 top-0 h-screen w-[var(--sidebar-width)] border-r border-slate-200 bg-white p-4 flex items-center justify-center">
                <Loader2 size={32} className="animate-spin text-indigo-600" />
            </aside>
        );
    }

    return (
        <>
            {/* Hamburger Button for Mobile */}
            <div className="fixed top-4 left-4 z-50 md:hidden">
                <button
                    onClick={toggleSidebar}
                    className="p-2 rounded-full bg-white border border-gray-200 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Overlay for Mobile View */}
            {isSidebarOpen && (
                <div
                    onClick={toggleSidebar}
                    className="fixed inset-0 z-40 bg-black/50 md:hidden"
                ></div>
            )}

            {/* Main Sidebar */}
            <aside className={`fixed top-0 left-0 h-screen w-64 md:w-[var(--sidebar-width)] border-r border-slate-200 bg-white p-4 z-50 transition-transform duration-300 md:translate-x-0
                ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="flex items-center gap-2 px-2 py-3">
                    <div className="h-8 w-8 rounded-full bg-indigo-600" />
                    <div className="text-xl font-bold">WonderChef</div>
                </div>
                <nav className="mt-4 flex flex-col gap-1">
                    <NavItem href="/" icon={LayoutDashboard} label="Dashboard" onMobileClick={handleLinkClick} />
                    <NavDropdownItem icon={ShoppingCart} label="Sales" items={salesItems} onMobileClick={handleLinkClick} />
                    <NavDropdownItem icon={Receipt} label="Purchases" items={purchasesItems} onMobileClick={handleLinkClick} />
                    <NavItem href="/products" icon={Package} label="Products" onMobileClick={handleLinkClick} />
                    <NavDropdownItem icon={Building2} label="Vendors" items={vendorsItems} onMobileClick={handleLinkClick} />
                    <NavDropdownItem icon={Users} label="Customers" items={customersItems} onMobileClick={handleLinkClick} />
                    <NavDropdownItem icon={Wallet} label="Accounts" items={accountsItems} onMobileClick={handleLinkClick} />
                    <NavDropdownItem icon={FileBarChart2} label="Reports" items={reportsItems} onMobileClick={handleLinkClick} />
                    <NavItem href="/settings" icon={Settings} label="Settings" onMobileClick={handleLinkClick} />
                </nav>
                <div className="absolute bottom-4 left-0 right-0 px-4">
                    <div className="card">
                        <div className="text-sm text-slate-600">Memory Space</div>
                        <div className="mt-2 h-2 w-full rounded-full bg-slate-100">
                            <div className="h-2 w-2/3 rounded-full bg-indigo-600"></div>
                        </div>
                        <div className="mt-2 text-xs text-slate-500">168.3 GB used</div>
                    </div>
                </div>
            </aside>
        </>
    );
}