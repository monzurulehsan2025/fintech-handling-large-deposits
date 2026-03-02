import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
    label: string;
    value: string;
    trend: string;
    trendType: 'up' | 'down';
}

export function StatCard({ label, value, trend, trendType }: StatCardProps) {
    return (
        <div className="rounded-xl border bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">{label}</p>
            <div className="mt-2 flex items-baseline justify-between">
                <p className="text-2xl font-bold text-gray-900">{value}</p>
                <div className={cn(
                    "flex items-center text-sm font-semibold",
                    trendType === 'up' ? "text-emerald-600" : "text-rose-600"
                )}>
                    {trendType === 'up' ? (
                        <ArrowUpRight className="mr-0.5 h-4 w-4" />
                    ) : (
                        <ArrowDownRight className="mr-0.5 h-4 w-4" />
                    )}
                    {trend}
                </div>
            </div>
        </div>
    );
}
