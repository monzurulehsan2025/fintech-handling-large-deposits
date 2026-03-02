'use client';

import { useState } from 'react';
import { MOCK_ALERTS, Alert } from '@/lib/mockData';
import { formatDate, cn } from '@/lib/utils';
import {
    AlertCircle,
    CheckCircle2,
    Clock,
    Filter,
    ChevronRight,
    X,
    AlertTriangle,
    Info
} from 'lucide-react';

export default function AlertsPage() {
    const [alerts, setAlerts] = useState(MOCK_ALERTS);
    const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
    const [severityFilter, setSeverityFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');

    const filteredAlerts = alerts.filter(alert => {
        return (severityFilter === 'All' || alert.severity === severityFilter) &&
            (statusFilter === 'All' || alert.status === statusFilter);
    });

    const updateAlertStatus = (id: string, newStatus: 'Ack' | 'Resolved') => {
        setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
        if (selectedAlert?.id === id) {
            setSelectedAlert({ ...selectedAlert, status: newStatus });
        }
    };

    return (
        <div className="relative h-full">
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Operational Alerts</h1>
                        <p className="text-gray-500">Monitor system performance and compliance risks across partners.</p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 border-b pb-6">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-700">Severity</span>
                        <div className="flex gap-1">
                            {['All', 'High', 'Medium', 'Low'].map(s => (
                                <button
                                    key={s}
                                    onClick={() => setSeverityFilter(s)}
                                    className={cn(
                                        "px-3 py-1 text-xs font-semibold rounded-full border transition-all",
                                        severityFilter === s
                                            ? "bg-gray-900 text-white border-gray-900"
                                            : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                                    )}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center gap-2 border-l pl-4">
                        <span className="text-sm font-medium text-gray-700">Status</span>
                        <div className="flex gap-1">
                            {['All', 'Open', 'Ack', 'Resolved'].map(s => (
                                <button
                                    key={s}
                                    onClick={() => setStatusFilter(s)}
                                    className={cn(
                                        "px-3 py-1 text-xs font-semibold rounded-full border transition-all",
                                        statusFilter === s
                                            ? "bg-indigo-600 text-white border-indigo-600"
                                            : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                                    )}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAlerts.map((alert) => (
                        <div
                            key={alert.id}
                            onClick={() => setSelectedAlert(alert)}
                            className={cn(
                                "group relative rounded-xl border bg-white p-6 shadow-sm hover:shadow-md transition-all cursor-pointer border-l-4",
                                alert.severity === 'High' ? "border-l-rose-500" :
                                    alert.severity === 'Medium' ? "border-l-amber-500" : "border-l-blue-500"
                            )}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className={cn(
                                    "p-2 rounded-lg",
                                    alert.severity === 'High' ? "bg-rose-50 text-rose-600" :
                                        alert.severity === 'Medium' ? "bg-amber-50 text-amber-600" : "bg-blue-50 text-blue-600"
                                )}>
                                    {alert.severity === 'High' ? <AlertCircle className="h-5 w-5" /> :
                                        alert.severity === 'Medium' ? <AlertTriangle className="h-5 w-5" /> : <Info className="h-5 w-5" />}
                                </div>
                                <span className={cn(
                                    "text-[10px] font-bold uppercase py-0.5 px-2 rounded-full ring-1 ring-inset",
                                    alert.status === 'Open' ? "bg-red-50 text-red-700 ring-red-600/20" :
                                        alert.status === 'Ack' ? "bg-amber-50 text-amber-700 ring-amber-600/20" :
                                            "bg-emerald-50 text-emerald-700 ring-emerald-600/20"
                                )}>
                                    {alert.status}
                                </span>
                            </div>
                            <h3 className="text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{alert.title}</h3>
                            <p className="mt-1 text-xs text-gray-500 font-medium">{alert.bank}</p>
                            <div className="mt-4 flex items-center justify-between text-[11px] text-gray-400">
                                <span className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {formatDate(alert.createdAt)}
                                </span>
                                <ChevronRight className="h-4 w-4 text-gray-300 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Alert Details Overlay */}
            {selectedAlert && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
                    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="flex items-center justify-between border-b p-6 bg-gray-50/50">
                            <div className="flex items-center gap-3">
                                <div className={cn(
                                    "p-2 rounded-lg",
                                    selectedAlert.severity === 'High' ? "bg-rose-100 text-rose-600" :
                                        selectedAlert.severity === 'Medium' ? "bg-amber-100 text-amber-600" : "bg-blue-100 text-blue-600"
                                )}>
                                    {selectedAlert.severity === 'High' ? <AlertCircle className="h-6 w-6" /> :
                                        selectedAlert.severity === 'Medium' ? <AlertTriangle className="h-6 w-6" /> : <Info className="h-6 w-6" />}
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">{selectedAlert.title}</h2>
                                    <p className="text-sm text-gray-500 font-medium">{selectedAlert.id} • {selectedAlert.bank}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedAlert(null)}
                                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                            >
                                <X className="h-5 w-5 text-gray-500" />
                            </button>
                        </div>

                        <div className="p-8 space-y-8">
                            <section>
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Description</h4>
                                <p className="text-gray-700 leading-relaxed">{selectedAlert.description}</p>
                            </section>

                            <div className="grid grid-cols-2 gap-8 py-6 border-y border-gray-100">
                                <div>
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Impacted Accounts</h4>
                                    <p className="text-2xl font-bold text-gray-900">{selectedAlert.impactedAccounts}</p>
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Severity Level</h4>
                                    <p className={cn(
                                        "text-lg font-bold",
                                        selectedAlert.severity === 'High' ? "text-rose-600" :
                                            selectedAlert.severity === 'Medium' ? "text-amber-600" : "text-blue-600"
                                    )}>{selectedAlert.severity}</p>
                                </div>
                            </div>

                            <section>
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                    Recommended Action Checklist
                                </h4>
                                <ul className="space-y-3">
                                    {selectedAlert.recommendedAction.map((action, i) => (
                                        <li key={i} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border border-gray-200/50">
                                            <div className="h-5 w-5 rounded border bg-white mt-0.5" />
                                            <span className="text-sm text-gray-600 font-medium">{action}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        </div>

                        <div className="p-6 bg-gray-50 flex justify-end gap-3">
                            {selectedAlert.status !== 'Resolved' && (
                                <>
                                    <button
                                        onClick={() => updateAlertStatus(selectedAlert.id, 'Ack')}
                                        className="px-6 py-2.5 text-sm font-bold text-gray-700 bg-white border rounded-lg hover:bg-gray-100 transition-colors"
                                    >
                                        Acknowledge
                                    </button>
                                    <button
                                        onClick={() => updateAlertStatus(selectedAlert.id, 'Resolved')}
                                        className="px-6 py-2.5 text-sm font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-colors"
                                    >
                                        Resolve Alert
                                    </button>
                                </>
                            )}
                            {selectedAlert.status === 'Resolved' && (
                                <div className="flex items-center gap-2 text-emerald-600 font-bold px-4">
                                    <CheckCircle2 className="h-5 w-5" />
                                    Alert Resolved
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
