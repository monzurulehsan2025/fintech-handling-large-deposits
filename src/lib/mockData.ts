export interface PartnerBankAllocation {
    partnerBankName: string;
    allocatedAmount: number;
    fdicLimit: number;
    insuredPercent: number;
}

export interface Deposit {
    id: string;
    customer: string;
    amount: number;
    receivedAt: string;
    status: 'Pending' | 'Allocated' | 'Processing';
    allocations?: PartnerBankAllocation[];
}

export interface Alert {
    id: string;
    severity: 'High' | 'Medium' | 'Low';
    title: string;
    bank: string;
    createdAt: string;
    status: 'Open' | 'Ack' | 'Resolved';
    description: string;
    impactedAccounts: number;
    recommendedAction: string[];
}

export interface Activity {
    id: string;
    event: string;
    user: string;
    timestamp: string;
}

export const MOCK_DEPOSITS: Deposit[] = [
    {
        id: 'DEP-001',
        customer: 'Acme Corp',
        amount: 1250000,
        receivedAt: '2024-03-01T10:00:00Z',
        status: 'Allocated',
        allocations: [
            { partnerBankName: 'First National Bank', allocatedAmount: 250000, fdicLimit: 250000, insuredPercent: 100 },
            { partnerBankName: 'Silicon Valley Trust', allocatedAmount: 250000, fdicLimit: 250000, insuredPercent: 100 },
            { partnerBankName: 'Midwest Savings', allocatedAmount: 250000, fdicLimit: 250000, insuredPercent: 100 },
            { partnerBankName: 'Pacific Commerce', allocatedAmount: 250000, fdicLimit: 250000, insuredPercent: 100 },
            { partnerBankName: 'Capital One', allocatedAmount: 250000, fdicLimit: 250000, insuredPercent: 100 },
        ]
    },
    {
        id: 'DEP-002',
        customer: 'Global Tech Inc',
        amount: 750000,
        receivedAt: '2024-03-01T14:30:00Z',
        status: 'Pending',
        allocations: []
    },
    {
        id: 'DEP-003',
        customer: 'Future Ventures',
        amount: 2100000,
        receivedAt: '2024-03-02T09:15:00Z',
        status: 'Processing',
        allocations: [
            { partnerBankName: 'Chase Bank', allocatedAmount: 250000, fdicLimit: 250000, insuredPercent: 100 },
            { partnerBankName: 'Wells Fargo', allocatedAmount: 250000, fdicLimit: 250000, insuredPercent: 100 },
            { partnerBankName: 'Bank of America', allocatedAmount: 250000, fdicLimit: 250000, insuredPercent: 100 },
            { partnerBankName: 'Citi', allocatedAmount: 250000, fdicLimit: 250000, insuredPercent: 100 },
        ]
    },
    {
        id: 'DEP-004',
        customer: 'Starlight Retail',
        amount: 450000,
        receivedAt: '2024-03-02T11:00:00Z',
        status: 'Allocated',
        allocations: [
            { partnerBankName: 'Community Bank', allocatedAmount: 250000, fdicLimit: 250000, insuredPercent: 100 },
            { partnerBankName: 'Local Federal', allocatedAmount: 200000, fdicLimit: 250000, insuredPercent: 100 },
        ]
    },
    {
        id: 'DEP-006',
        customer: 'Vesta Homes',
        amount: 1000000,
        receivedAt: '2024-03-02T15:20:00Z',
        status: 'Allocated',
        allocations: [
            { partnerBankName: 'Chase Bank', allocatedAmount: 250000, fdicLimit: 250000, insuredPercent: 100 },
            { partnerBankName: 'Wells Fargo', allocatedAmount: 500000, fdicLimit: 250000, insuredPercent: 50 },
            { partnerBankName: 'Citi', allocatedAmount: 250000, fdicLimit: 250000, insuredPercent: 100 },
        ]
    }
];

export const MOCK_ALERTS: Alert[] = [
    {
        id: 'ALR-001',
        severity: 'High',
        title: 'FDIC Limit Near Breach',
        bank: 'First National Bank',
        createdAt: '2024-03-02T08:00:00Z',
        status: 'Open',
        description: 'Total deposits at First National Bank are approaching the $250k FDIC limit for several customers.',
        impactedAccounts: 12,
        recommendedAction: [
            'Rebalance deposits to Silicon Valley Trust',
            'Notify customers of potential limit breach',
            'Increase allocation to Midwest Savings'
        ]
    },
    {
        id: 'ALR-002',
        severity: 'Medium',
        title: 'Stale Allocation Data',
        bank: 'Pacific Commerce',
        createdAt: '2024-03-01T16:20:00Z',
        status: 'Ack',
        description: 'The nightly batch job for Pacific Commerce failed to report updated balances.',
        impactedAccounts: 45,
        recommendedAction: [
            'Manually trigger balance sync',
            'Check API connectivity logs',
            'Verify SFTP status'
        ]
    },
    {
        id: 'ALR-003',
        severity: 'Low',
        title: 'New Partner Onboarding Success',
        bank: 'Capital One',
        createdAt: '2024-02-28T11:00:00Z',
        status: 'Resolved',
        description: 'Capital One has been successfully integrated as a partner bank.',
        impactedAccounts: 0,
        recommendedAction: [
            'Enable Capital One for new allocations',
            'Verify test transaction'
        ]
    },
    {
        id: 'ALR-004',
        severity: 'High',
        title: 'Swift Transfer Delay',
        bank: 'Chase Bank',
        createdAt: '2024-03-02T10:30:00Z',
        status: 'Open',
        description: 'Incoming sweep from Chase Bank is delayed by more than 4 hours.',
        impactedAccounts: 8,
        recommendedAction: [
            'Contact Chase Treasury Support',
            'Review sweep instruction logs',
            'Monitor incoming ACH queue'
        ]
    }
];

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
    { name: 'Pacific Commerce', currentAmount: 310000000, capacity: 400000000, healthy: true },
    { name: 'Chase Bank', currentAmount: 220000000, capacity: 500000000, healthy: true },
];
