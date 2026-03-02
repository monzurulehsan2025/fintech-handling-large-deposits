'use client';

import { StatCard } from '@/components/StatCard';
import { MOCK_KPIS, MOCK_CHART_DATA, MOCK_ACTIVITIES, MOCK_BANK_UTILIZATION } from '@/lib/mockData';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import { formatCurrency, formatDate, cn } from '@/lib/utils';
import { Activity as ActivityIcon, ShieldCheck, AlertTriangle } from 'lucide-react';

const INSURABILITY_DATA = [
    { name: 'Insured', value: 99.4, color: '#10b981' },
    { name: 'Uninsured', value: 0.6, color: '#f59e0b' },
];

export default function DashboardPage() {
    return (
        <div className="space-y-8 pb-12">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Program Overview</h1>
                <p className="text-gray-500">Welcome back. Here is what is happening with your deposits today.</p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {MOCK_KPIS.map((kpi) => (
                    <StatCard
                        key={kpi.label}
                        label={kpi.label}
                        value={kpi.value}
                        trend={kpi.trend}
                        trendType={kpi.trendType as 'up' | 'down'}
                    />
                ))}
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2 rounded-xl border bg-white p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Deposits Over Time</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={MOCK_CHART_DATA}>
                                <defs>
                                    <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                <XAxis
                                    dataKey="date"
                                    tickFormatter={(val) => new Date(val).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: '#9ca3af' }}
                                />
                                <YAxis
                                    tickFormatter={(val) => `$${(val / 1000000000).toFixed(1)}B`}
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: '#9ca3af' }}
                                />
                                <Tooltip
                                    formatter={(value: any) => [formatCurrency(Number(value)), 'Deposits']}
                                    labelFormatter={(label) => formatDate(label)}
                                    contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="amount"
                                    stroke="#4f46e5"
                                    strokeWidth={2}
                                    fillOpacity={1}
                                    fill="url(#colorAmount)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="rounded-xl border bg-white p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                        <ActivityIcon className="h-5 w-5 text-gray-400" />
                        Recent Activity
                    </h3>
                    <div className="flow-root">
                        <ul role="list" className="-mb-8">
                            {MOCK_ACTIVITIES.map((activity, idx) => (
                                <li key={activity.id}>
                                    <div className="relative pb-8">
                                        {idx !== MOCK_ACTIVITIES.length - 1 ? (
                                            <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                                        ) : null}
                                        <div className="relative flex space-x-3">
                                            <div>
                                                <span className="h-8 w-8 rounded-full bg-indigo-50 flex items-center justify-center ring-8 ring-white">
                                                    <ActivityIcon className="h-4 w-4 text-indigo-600" aria-hidden="true" />
                                                </span>
                                            </div>
                                            <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                                <div>
                                                    <p className="text-sm text-gray-500">
                                                        {activity.event}{' '}
                                                        <span className="font-medium text-gray-900">by {activity.user}</span>
                                                    </p>
                                                </div>
                                                <div className="whitespace-nowrap text-right text-xs text-gray-400">
                                                    {new Date(activity.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                <div className="rounded-xl border bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                            <ShieldCheck className="h-5 w-5 text-emerald-600" />
                            Program Insurability
                        </h3>
                        <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">99.4% Targeted</span>
                    </div>

                    <div className="flex items-center gap-8">
                        <div className="h-48 w-48 shrink-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={INSURABILITY_DATA}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {INSURABILITY_DATA.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="space-y-4 flex-1">
                            <div className="p-4 rounded-lg bg-gray-50 border">
                                <p className="text-xs font-bold text-gray-400 uppercase mb-1">Total Insured</p>
                                <p className="text-xl font-bold text-gray-900">$1,411,480,000</p>
                            </div>
                            <div className="p-4 rounded-lg bg-amber-50 border border-amber-100">
                                <p className="text-xs font-bold text-amber-600 uppercase mb-1 flex items-center gap-1">
                                    <AlertTriangle className="h-3 w-3" />
                                    Uninsured Exposure
                                </p>
                                <p className="text-xl font-bold text-amber-700">$8,520,000</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border bg-white p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Partner Bank Capacity</h3>
                    <div className="space-y-4">
                        {MOCK_BANK_UTILIZATION.map((bank) => {
                            const utilization = (bank.currentAmount / bank.capacity) * 100;
                            return (
                                <div key={bank.name} className="space-y-2">
                                    <div className="flex justify-between items-center text-sm font-medium">
                                        <span className="text-gray-700">{bank.name}</span>
                                        <span className={cn(
                                            "text-xs font-bold px-2 py-0.5 rounded",
                                            utilization > 90 ? "bg-red-50 text-red-600" : "bg-gray-100 text-gray-600"
                                        )}>
                                            {formatCurrency(bank.capacity - bank.currentAmount)} remaining
                                        </span>
                                    </div>
                                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className={cn(
                                                "h-full transition-all duration-1000",
                                                utilization > 90 ? "bg-red-500" : "bg-indigo-500"
                                            )}
                                            style={{ width: `${utilization}%` }}
                                        />
                                    </div>
                                    <div className="flex justify-between text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                                        <span>Utilized: {formatCurrency(bank.currentAmount)}</span>
                                        <span>Capacity: {formatCurrency(bank.capacity)}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
