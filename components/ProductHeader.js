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
        <div className="bg-white shadow-sm border-b border-gray-200">
            <div className="container mx-auto px-6">
                <nav className="flex items-center space-x-4 h-14">
                    {subMenus.map(menu => (
                        <Link
                            key={menu.name}
                            href={menu.path}
                            className={`
                                font-medium text-sm transition-colors relative
                                ${pathname === menu.path ? 'text-indigo-600 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-indigo-600' : 'text-gray-500 hover:text-gray-900'}
                            `}
                        >
                            {menu.name}
                        </Link>
                    ))}
                </nav>
            </div>
        </div>
    );
}