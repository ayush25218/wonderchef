// components/ProductHeader.js
"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const subMenus = [
    { name: 'Dashboard', path: '/products' },
    { name: 'Add New', path: '/products/add-new' },
    { name: 'Product List', path: '/products/list' },
    { name: 'Categories', path:'/products/categories' },
    { name: 'Brands', path: '/products/brand' },
    { name: 'Stock Mgt', path: '/products/stock' },
    { name: 'Reports', path: '/products/report' },
];

export default function ProductHeader() {
    const pathname = usePathname();

    return (
        <div className="w-full bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 shadow-md border-b border-gray-200">
            <div className="container mx-auto px-6">
                <nav className="flex items-center space-x-6 h-16 overflow-x-auto scrollbar-hide">
                    {subMenus.map(menu => {
                        const isActive = pathname === menu.path;
                        return (
                            <Link
                                key={menu.name}
                                href={menu.path}
                                className={`
                                    relative font-semibold text-sm transition-all
                                    ${isActive ? 'text-indigo-600' : 'text-gray-500 hover:text-indigo-500'}
                                `}
                            >
                                <span className="px-3 py-2 rounded-lg hover:bg-indigo-50 hover:scale-105 transition-transform duration-200">
                                    {menu.name}
                                </span>
                                {isActive && (
                                    <span className="absolute -bottom-1 left-0 w-full h-1 bg-indigo-600 rounded-t-full animate-slide-in"></span>
                                )}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
}
