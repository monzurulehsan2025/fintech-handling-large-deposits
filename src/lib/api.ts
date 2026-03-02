const API_BASE_URL = 'http://localhost:8000/api';

export async function fetchKPIS() {
    const res = await fetch(`${API_BASE_URL}/kpis`);
    if (!res.ok) throw new Error('Failed to fetch KPIs');
    return res.json();
}

export async function fetchChartData() {
    const res = await fetch(`${API_BASE_URL}/chart-data`);
    if (!res.ok) throw new Error('Failed to fetch chart data');
    return res.json();
}

export async function fetchActivities() {
    const res = await fetch(`${API_BASE_URL}/activities`);
    if (!res.ok) throw new Error('Failed to fetch activities');
    return res.json();
}

export async function fetchBankUtilization() {
    const res = await fetch(`${API_BASE_URL}/bank-utilization`);
    if (!res.ok) throw new Error('Failed to fetch bank utilization');
    return res.json();
}

export async function fetchDeposits() {
    const res = await fetch(`${API_BASE_URL}/deposits`);
    if (!res.ok) throw new Error('Failed to fetch deposits');
    return res.json();
}

export async function allocateDeposit(depositId: string) {
    const res = await fetch(`${API_BASE_URL}/deposits/${depositId}/allocate`, {
        method: 'POST',
    });
    if (!res.ok) throw new Error('Failed to allocate deposit');
    return res.json();
}
