'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Settings,
    ShieldCheck,
    LayoutDashboard
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="flex h-full w-64 flex-col border-r bg-white">
            <div className="flex h-16 items-center px-6">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                        <ShieldCheck className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xl font-bold text-gray-900 tracking-tight">VaultFlow</span>
                </div>
            </div>
            <nav className="flex-1 space-y-1 px-3 py-4">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                'group flex items-center rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                                isActive
                                    ? 'bg-indigo-50 text-indigo-700'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            )}
                        >
                            <item.icon
                                className={cn(
                                    'mr-3 h-5 w-5 flex-shrink-0 transition-colors',
                                    isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-500'
                                )}
                            />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>
            <div className="border-t p-4">
                <Link
                    href="#"
                    className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                    <Settings className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                    Settings
                </Link>
            </div>
        </div>
    );
}
