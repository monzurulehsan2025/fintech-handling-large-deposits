export interface Activity {
    id: string;
    event: string;
    user: string;
    timestamp: string;
}

export const MOCK_KPIS = [
    { label: 'Total Deposits Managed', value: '$1.42B', trend: '+12.5%', trendType: 'up' },
    { label: '% Insured Coverage', value: '99.4%', trend: '+0.2%', trendType: 'up' },
    { label: 'Active Partner Banks', value: '42', trend: '+2', trendType: 'up' },
    { label: 'Open Alerts', value: '3', trend: '-1', trendType: 'down' },
];

export const MOCK_CHART_DATA = [
    { date: '2024-02-18', amount: 1250000000 },
    { date: '2024-02-19', amount: 1270000000 },
    { date: '2024-02-20', amount: 1265000000 },
    { date: '2024-02-21', amount: 1285000000 },
    { date: '2024-02-22', amount: 1310000000 },
    { date: '2024-02-23', amount: 1325000000 },
    { date: '2024-02-24', amount: 1320000000 },
    { date: '2024-02-25', amount: 1335000000 },
    { date: '2024-02-26', amount: 1350000000 },
    { date: '2024-02-27', amount: 1375000000 },
    { date: '2024-02-28', amount: 1390000000 },
    { date: '2024-03-01', amount: 1410000000 },
    { date: '2024-03-02', amount: 1420000000 },
];

export const MOCK_ACTIVITIES: Activity[] = [
    { id: 'ACT-001', event: 'Allocation simulated for DEP-002', user: 'Monzurul Ehsan', timestamp: '2024-03-02T14:15:00Z' },
    { id: 'ACT-002', event: 'Alert ALR-002 acknowledged', user: 'Sarah Jenkins', timestamp: '2024-03-02T13:45:00Z' },
    { id: 'ACT-003', event: 'New deposit received: DEP-005', user: 'System', timestamp: '2024-03-02T13:00:00Z' },
    { id: 'ACT-004', event: 'Partner bank "Capital One" added', user: 'David Chen', timestamp: '2024-03-01T15:30:00Z' },
    { id: 'ACT-005', event: 'Weekly sweep report generated', user: 'System', timestamp: '2024-03-01T09:00:00Z' },
];

export const MOCK_BANK_UTILIZATION = [
    { name: 'First National Bank', currentAmount: 425000000, capacity: 500000000, healthy: true },
    { name: 'Silicon Valley Trust', currentAmount: 280000000, capacity: 300000000, healthy: false },
    { name: 'Midwest Savings', currentAmount: 150000000, capacity: 250000000, healthy: true },
];
