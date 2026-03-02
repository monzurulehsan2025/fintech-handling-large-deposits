from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel

app = FastAPI()

# Enable CORS for the local Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class PartnerBankAllocation(BaseModel):
    partnerBankName: str
    allocatedAmount: int
    fdicLimit: int
    insuredPercent: float

class Deposit(BaseModel):
    id: str
    customer: str
    amount: int
    receivedAt: str
    status: str
    allocations: Optional[List[PartnerBankAllocation]] = []

class Activity(BaseModel):
    id: str
    event: str
    user: str
    timestamp: str

class KPI(BaseModel):
    label: str
    value: str
    trend: str
    trendType: str

class ChartData(BaseModel):
    date: str
    amount: int

class BankUtilization(BaseModel):
    name: str
    currentAmount: int
    capacity: int
    healthy: bool

# Mock Data
MOCK_KPIS = [
    {"label": "Total Deposits Managed", "value": "$1.42B", "trend": "+12.5%", "trendType": "up"},
    {"label": "% Insured Coverage", "value": "99.4%", "trend": "+0.2%", "trendType": "up"},
    {"label": "Active Partner Banks", "value": "42", "trend": "+2", "trendType": "up"},
    {"label": "Open Alerts", "value": "3", "trend": "-1", "trendType": "down"},
]

MOCK_CHART_DATA = [
    {"date": "2024-02-18", "amount": 1250000000},
    {"date": "2024-02-19", "amount": 1270000000},
    {"date": "2024-02-20", "amount": 1265000000},
    {"date": "2024-02-21", "amount": 1285000000},
    {"date": "2024-02-22", "amount": 1310000000},
    {"date": "2024-02-23", "amount": 1325000000},
    {"date": "2024-02-24", "amount": 1320000000},
    {"date": "2024-02-25", "amount": 1335000000},
    {"date": "2024-02-26", "amount": 1350000000},
    {"date": "2024-02-27", "amount": 1375000000},
    {"date": "2024-02-28", "amount": 1390000000},
    {"date": "2024-03-01", "amount": 1410000000},
    {"date": "2024-03-02", "amount": 1420000000},
]

MOCK_ACTIVITIES = [
    {"id": "ACT-001", "event": "Allocation simulated for DEP-002", "user": "Monzurul Ehsan", "timestamp": "2024-03-02T14:15:00Z"},
    {"id": "ACT-002", "event": "Alert ALR-002 acknowledged", "user": "Sarah Jenkins", "timestamp": "2024-03-02T13:45:00Z"},
    {"id": "ACT-003", "event": "New deposit received: DEP-005", "user": "System", "timestamp": "2024-03-02T13:00:00Z"},
    {"id": "ACT-004", "event": "Partner bank \"Capital One\" added", "user": "David Chen", "timestamp": "2024-03-01T15:30:00Z"},
    {"id": "ACT-005", "event": "Weekly sweep report generated", "user": "System", "timestamp": "2024-03-01T09:00:00Z"},
]

MOCK_BANK_UTILIZATION = [
    {"name": "First National Bank", "currentAmount": 425000000, "capacity": 500000000, "healthy": True},
    {"name": "Silicon Valley Trust", "currentAmount": 280000000, "capacity": 300000000, "healthy": False},
    {"name": "Midwest Savings", "currentAmount": 150000000, "capacity": 250000000, "healthy": True},
]

MOCK_DEPOSITS = [
    {
        "id": "DEP-001",
        "customer": "Acme Corp",
        "amount": 1250000,
        "receivedAt": "2024-03-01T10:00:00Z",
        "status": "Allocated",
        "allocations": [
            {"partnerBankName": "First National Bank", "allocatedAmount": 250000, "fdicLimit": 250000, "insuredPercent": 100},
            {"partnerBankName": "Silicon Valley Trust", "allocatedAmount": 250000, "fdicLimit": 250000, "insuredPercent": 100},
            {"partnerBankName": "Midwest Savings", "allocatedAmount": 250000, "fdicLimit": 250000, "insuredPercent": 100},
            {"partnerBankName": "Pacific Commerce", "allocatedAmount": 250000, "fdicLimit": 250000, "insuredPercent": 100},
            {"partnerBankName": "Capital One", "allocatedAmount": 250000, "fdicLimit": 250000, "insuredPercent": 100},
        ]
    },
    {
        "id": "DEP-002",
        "customer": "Global Tech Inc",
        "amount": 750000,
        "receivedAt": "2024-03-01T14:30:00Z",
        "status": "Pending",
        "allocations": []
    },
    {
        "id": "DEP-003",
        "customer": "Future Ventures",
        "amount": 2100000,
        "receivedAt": "2024-03-02T09:15:00Z",
        "status": "Processing",
        "allocations": [
            {"partnerBankName": "Chase Bank", "allocatedAmount": 250000, "fdicLimit": 250000, "insuredPercent": 100},
            {"partnerBankName": "Wells Fargo", "allocatedAmount": 250000, "fdicLimit": 250000, "insuredPercent": 100},
            {"partnerBankName": "Bank of America", "allocatedAmount": 250000, "fdicLimit": 250000, "insuredPercent": 100},
            {"partnerBankName": "Citi", "allocatedAmount": 250000, "fdicLimit": 250000, "insuredPercent": 100},
        ]
    }
]

# Endpoints
@app.get("/api/kpis", response_model=List[KPI])
async def get_kpis():
    return MOCK_KPIS

@app.get("/api/chart-data", response_model=List[ChartData])
async def get_chart_data():
    return MOCK_CHART_DATA

@app.get("/api/activities", response_model=List[Activity])
async def get_activities():
    return MOCK_ACTIVITIES

@app.get("/api/bank-utilization", response_model=List[BankUtilization])
async def get_bank_utilization():
    return MOCK_BANK_UTILIZATION

@app.get("/api/deposits", response_model=List[Deposit])
async def get_deposits():
    return MOCK_DEPOSITS

@app.post("/api/deposits/{deposit_id}/allocate")
async def allocate_deposit(deposit_id: str):
    # Simulate allocation logic on the backend
    for deposit in MOCK_DEPOSITS:
        if deposit["id"] == deposit_id:
            deposit["status"] = "Allocated"
            deposit["allocations"] = [
                {"partnerBankName": "JPMorgan Chase", "allocatedAmount": 250000, "fdicLimit": 250000, "insuredPercent": 100},
                {"partnerBankName": "Wells Fargo", "allocatedAmount": 250000, "fdicLimit": 250000, "insuredPercent": 100},
                {"partnerBankName": "Local Federal", "allocatedAmount": deposit["amount"] - 500000, "fdicLimit": 250000, "insuredPercent": 65.0},
            ]
            return deposit
    return {"error": "Deposit not found"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
