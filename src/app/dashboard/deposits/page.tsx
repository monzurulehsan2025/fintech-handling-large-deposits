'use client';

import { useState, useEffect } from 'react';
import { fetchDeposits, allocateDeposit } from '@/lib/api';
import { formatCurrency, formatDate, cn } from '@/lib/utils';
import { ChevronRight, Filter, Download, Plus, ShieldCheck, X } from 'lucide-react';

export default function DepositsPage() {
    const [selectedDeposit, setSelectedDeposit] = useState<any>(null);
    const [deposits, setDeposits] = useState<any[]>([]);
    const [viewMode, setViewMode] = useState<'list' | 'insurability'>('list');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadDeposits = async () => {
            try {
                const data = await fetchDeposits();
                setDeposits(data);
            } catch (error) {
                console.error('Error fetching deposits:', error);
            } finally {
                setLoading(false);
            }
        };
        loadDeposits();
    }, []);

    const handleAllocate = async () => {
        if (!selectedDeposit) return;
        try {
            const updated = await allocateDeposit(selectedDeposit.id);
            setDeposits(prev => prev.map(d => d.id === selectedDeposit.id ? updated : d));
            setSelectedDeposit(updated);
        } catch (error) {
            console.error('Error allocating deposit:', error);
        }
    };

    const getInsuredTotal = (deposit: any) => {
        return deposit.allocations?.reduce((acc: number, alloc: any) => acc + (alloc.allocatedAmount * (alloc.insuredPercent / 100)), 0) || 0;
    };

    if (loading) {
        return (
            <div className="flex h-96 items-center justify-center">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="relative h-full">
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Large Deposit Allocation</h1>
                        <p className="text-gray-500">Manage and allocate high-value incoming deposits across partner banks.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 rounded-lg border bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                            <Download className="h-4 w-4" />
                            Export
                        </button>
                        <button className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors">
                            <Plus className="h-4 w-4" />
                            Manual Deposit
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-4 border-b pb-4">
                    <button
                        onClick={() => setViewMode('list')}
                        className={cn(
                            "px-4 py-2 text-sm font-semibold border-b-2 transition-all",
                            viewMode === 'list' ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-500 hover:text-gray-700"
                        )}
                    >
                        All Deposits
                    </button>
                    <button
                        onClick={() => setViewMode('insurability')}
                        className={cn(
                            "px-4 py-2 text-sm font-semibold border-b-2 transition-all flex items-center gap-2",
                            viewMode === 'insurability' ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-500 hover:text-gray-700"
                        )}
                    >
                        <ShieldCheck className="h-4 w-4" />
                        Insurability View
                    </button>
                </div>

                {viewMode === 'list' ? (
                    <div className="rounded-xl border bg-white shadow-sm overflow-hidden animate-in fade-in duration-300">
                        <div className="border-b bg-gray-50/50 px-6 py-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <select className="pl-10 pr-4 py-1.5 text-sm border-0 rounded-lg bg-white ring-1 ring-gray-200 focus:ring-2 focus:ring-indigo-600">
                                        <option>All Statuses</option>
                                        <option>Allocated</option>
                                        <option>Pending</option>
                                        <option>Processing</option>
                                    </select>
                                </div>
                            </div>
                            <span className="text-sm text-gray-500">{deposits.length} deposits found</span>
                        </div>

                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b bg-gray-50/30 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    <th className="px-6 py-4">ID</th>
                                    <th className="px-6 py-4">Customer</th>
                                    <th className="px-6 py-4 text-right">Amount</th>
                                    <th className="px-6 py-4">Received At</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {deposits.map((deposit) => (
                                    <tr
                                        key={deposit.id}
                                        className={cn(
                                            "group cursor-pointer hover:bg-indigo-50/30 transition-colors",
                                            selectedDeposit?.id === deposit.id ? "bg-indigo-50" : ""
                                        )}
                                        onClick={() => setSelectedDeposit(deposit)}
                                    >
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{deposit.id}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600 font-medium">{deposit.customer}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900 text-right font-semibold">{formatCurrency(deposit.amount)}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{formatDate(deposit.receivedAt)}</td>
                                        <td className="px-6 py-4">
                                            <span className={cn(
                                                "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset",
                                                deposit.status === 'Allocated' ? "bg-emerald-50 text-emerald-700 ring-emerald-600/20" :
                                                    deposit.status === 'Pending' ? "bg-amber-50 text-amber-700 ring-amber-600/20" :
                                                        "bg-blue-50 text-blue-700 ring-blue-600/20"
                                            )}>
                                                {deposit.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-indigo-600" />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-bottom-4 duration-500">
                        {deposits.map((deposit) => {
                            const insured = getInsuredTotal(deposit);
                            const percent = (insured / deposit.amount) * 100;
                            return (
                                <div key={deposit.id} className="rounded-xl border bg-white p-6 shadow-sm hover:border-indigo-300 transition-all group">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900">{deposit.customer}</h3>
                                            <p className="text-sm text-gray-500">{deposit.id} • {formatCurrency(deposit.amount)} total</p>
                                        </div>
                                        <div className={cn(
                                            "px-3 py-1 rounded-full text-xs font-bold ring-1 ring-inset",
                                            percent >= 100 ? "bg-emerald-50 text-emerald-700 ring-emerald-600/20" : "bg-amber-50 text-amber-700 ring-amber-600/20"
                                        )}>
                                            {percent.toFixed(1)}% Insured
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4">
                                            <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
                                                <div
                                                    className={cn("h-full transition-all", percent >= 100 ? "bg-emerald-500" : "bg-amber-500")}
                                                    style={{ width: `${percent}%` }}
                                                />
                                            </div>
                                            <span className="text-xs font-bold text-gray-600 whitespace-nowrap">
                                                {formatCurrency(insured)} Insured
                                            </span>
                                        </div>

                                        <div className="rounded-lg border bg-gray-50 overflow-hidden">
                                            <table className="w-full text-xs">
                                                <thead className="bg-gray-100 text-gray-500 uppercase font-bold">
                                                    <tr>
                                                        <th className="px-3 py-2 text-left">Bank</th>
                                                        <th className="px-3 py-2 text-right">Amount</th>
                                                        <th className="px-3 py-2 text-right">Limit</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-200">
                                                    {deposit.allocations && deposit.allocations.length > 0 ? (
                                                        deposit.allocations.map((alloc: any, i: number) => (
                                                            <tr key={i} className="hover:bg-white transition-colors">
                                                                <td className="px-3 py-2 font-medium text-gray-700">{alloc.partnerBankName}</td>
                                                                <td className="px-3 py-2 text-right font-bold text-gray-900">{formatCurrency(alloc.allocatedAmount)}</td>
                                                                <td className="px-3 py-2 text-right text-gray-400">{formatCurrency(alloc.fdicLimit)}</td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan={3} className="px-3 py-4 text-center text-gray-400 italic">No allocations yet</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <div className="mt-6 flex justify-end">
                                        <button
                                            onClick={() => setSelectedDeposit(deposit)}
                                            className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                                        >
                                            Manage Allocation <ChevronRight className="h-3 w-3" />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Details Side Panel */}
            {selectedDeposit && (
                <div className="fixed inset-y-0 right-0 w-[450px] bg-white shadow-2xl border-l z-50 flex flex-col transform transition-transform duration-300">
                    <div className="flex items-center justify-between border-b p-6">
                        <h2 className="text-xl font-bold text-gray-900">Deposit Details</h2>
                        <button onClick={() => setSelectedDeposit(null)} className="p-2 hover:bg-gray-100 rounded-full">
                            <X className="h-5 w-5 text-gray-500" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-8">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="rounded-lg bg-gray-50 p-4">
                                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Total Amount</p>
                                <p className="text-lg font-bold text-gray-900">{formatCurrency(selectedDeposit.amount)}</p>
                            </div>
                            <div className="rounded-lg bg-gray-50 p-4">
                                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Customer</p>
                                <p className="text-lg font-bold text-gray-900">{selectedDeposit.customer}</p>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                                    <ShieldCheck className="h-4 w-4 text-indigo-600" />
                                    Proposed Allocation
                                </h3>
                                <button
                                    onClick={handleAllocate}
                                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                                >
                                    Simulate Reallocation
                                </button>
                            </div>

                            <div className="space-y-3">
                                {selectedDeposit.allocations && selectedDeposit.allocations.length > 0 ? (
                                    selectedDeposit.allocations.map((alloc: any, i: number) => (
                                        <div key={i} className="flex flex-col rounded-lg border p-3 hover:border-indigo-200 transition-colors">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-sm font-semibold text-gray-800">{alloc.partnerBankName}</span>
                                                <span className="text-sm font-bold text-gray-900">{formatCurrency(alloc.allocatedAmount)}</span>
                                            </div>
                                            <div className="w-full bg-gray-100 rounded-full h-1.5 mb-2">
                                                <div
                                                    className={cn(
                                                        "h-1.5 rounded-full",
                                                        alloc.insuredPercent >= 100 ? "bg-emerald-500" : "bg-amber-500"
                                                    )}
                                                    style={{ width: `${Math.min(100, (alloc.allocatedAmount / alloc.fdicLimit) * 100)}%` }}
                                                ></div>
                                            </div>
                                            <div className="flex justify-between text-[10px] text-gray-500 font-medium">
                                                <span>FDIC Limit: {formatCurrency(alloc.fdicLimit)}</span>
                                                <span>{alloc.insuredPercent.toFixed(1)}% Insured</span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-10 rounded-lg border border-dashed text-gray-500">
                                        <p className="text-sm mb-4">No allocation proposed yet</p>
                                        <button
                                            onClick={handleAllocate}
                                            className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700"
                                        >
                                            Run Allocation Engine
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="border-t p-6 bg-gray-50">
                        <button
                            className="w-full rounded-lg bg-indigo-600 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-[0.98]"
                            onClick={() => setSelectedDeposit(null)}
                        >
                            Approve Allocation
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
