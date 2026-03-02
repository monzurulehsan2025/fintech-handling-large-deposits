'use client';

import { Search, UserCircle, ChevronDown, Bell } from 'lucide-react';

export function Header() {
    return (
        <header className="flex h-16 items-center justify-between border-b bg-white px-8">
            <div className="flex flex-1 items-center">
                <div className="relative w-96">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Search deposits, alerts, or banks..."
                    />
                </div>
            </div>
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 rounded-lg border bg-gray-50 px-3 py-1.5 cursor-pointer hover:bg-gray-100 transition-colors">
                    <span className="text-sm font-medium text-gray-700">First Alliance Bank</span>
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                </div>
                <button className="relative text-gray-400 hover:text-gray-500">
                    <Bell className="h-6 w-6" />
                    <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500 border-2 border-white"></span>
                </button>
                <div className="flex items-center gap-3 border-l pl-6">
                    <div className="text-right">
                        <p className="text-sm font-semibold text-gray-900">Monzurul Ehsan</p>
                        <p className="text-xs text-gray-500">System Admin</p>
                    </div>
                    <UserCircle className="h-9 w-9 text-gray-300" />
                </div>
            </div>
        </header>
    );
}
