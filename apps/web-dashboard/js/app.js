document.addEventListener("DOMContentLoaded", () => {
  console.log("Enterprise SaaS Dashboard Loaded");

  const routes = {
    overview: renderOverview,
    tenants: renderTenants,
    finance: renderFinance,
    billing: renderBilling,
    hrms: renderHrms,
    crm: renderCrm,
    inventory: renderInventory,
    audit: renderAudit
  };

  function navigate() {
    const hash = window.location.hash.substring(1) || "overview";
    const renderFn = routes[hash] || renderOverview;
    
    document.querySelectorAll(".nav-item").forEach(el => el.classList.remove("active"));
    const activeNav = document.getElementById(`nav-${hash}`);
    if (activeNav) activeNav.classList.add("active");

    const contentDiv = document.getElementById("page-content");
    contentDiv.innerHTML = renderFn();
  }

  window.addEventListener("hashchange", navigate);
  navigate();

  function renderOverview() {
    return `
      <div class="page-header">
        <h1 class="page-title">Executive Operations Command</h1>
        <p class="page-subtitle">Real-time enterprise metrics, active tenant health, and financial totals</p>
      </div>

      <div class="grid-kpi">
        <div class="kpi-card">
          <div class="kpi-label">Annual Recurring Revenue (ARR)</div>
          <div class="kpi-value">$14,250,800</div>
          <div class="kpi-trend positive">▲ +18.4% vs last quarter</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">Active Tenants</div>
          <div class="kpi-value">1,420</div>
          <div class="kpi-trend positive">▲ 42 new this month</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">General Ledger Cash Balance</div>
          <div class="kpi-value">$250,000.00</div>
          <div class="kpi-trend positive">✔ Balanced & Reconciled</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">System Uptime SLA</div>
          <div class="kpi-value">99.994%</div>
          <div class="kpi-trend positive">✔ SOC2 Compliant</div>
        </div>
      </div>

      <div class="dashboard-panels">
        <div class="panel">
          <h2>Revenue vs Expenses (Year-To-Date)</h2>
          <svg width="100%" height="220" viewBox="0 0 600 200">
            <polyline fill="none" stroke="#6366F1" stroke-width="4" points="0,180 100,140 200,120 300,80 400,60 500,30 600,10" />
            <polyline fill="none" stroke="#EF4444" stroke-width="2" stroke-dasharray="5,5" points="0,190 100,170 200,160 300,150 400,140 500,130 600,120" />
          </svg>
        </div>
      </div>
    `;
  }

  function renderTenants() {
    return `
      <div class="page-header">
        <h1 class="page-title">Multi-Tenant Management</h1>
        <p class="page-subtitle">Tenant quota enforcement, domain mapping, and provisioning status</p>
      </div>
      <table class="enterprise-datagrid" style="width:100%; border-collapse: collapse; margin-top: 1rem;">
        <thead>
          <tr style="text-align:left; border-bottom:1px solid rgba(255,255,255,0.1); padding: 0.5rem;">
            <th>Tenant Name</th><th>Slug</th><th>Status</th><th>Users Quota</th><th>Storage Quota</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Stark Industries</td><td>stark-ind</td><td><span style="color:#10B981">ACTIVE</span></td><td>480 / 1000</td><td>450GB / 1000GB</td></tr>
          <tr><td>Acme Corporation</td><td>acme-corp</td><td><span style="color:#10B981">ACTIVE</span></td><td>85 / 100</td><td>65GB / 100GB</td></tr>
          <tr><td>Cyberdyne Systems</td><td>cyberdyne</td><td><span style="color:#F59E0B">SUSPENDED</span></td><td>10 / 10</td><td>10GB / 10GB</td></tr>
        </tbody>
      </table>
    `;
  }

  function renderFinance() {
    return `
      <div class="page-header">
        <h1 class="page-title">Double-Entry General Ledger</h1>
        <p class="page-subtitle">Trial balance compilation, chart of accounts, and ASC 606 revenue recognition</p>
      </div>
      <p style="margin-top:1rem; color: #9CA3AF;">Chart of Accounts: 1000 - Cash ($250,000.00) | 2000 - Accounts Payable ($30,000.00) | 4000 - SaaS Revenue ($150,000.00)</p>
    `;
  }

  function renderBilling() { return `<div class="page-header"><h1>SaaS Subscription Engine</h1><p>Prorated upgrades & invoicing engine</p></div>`; }
  function renderHrms() { return `<div class="page-header"><h1>HRMS & Payroll System</h1><p>Employee records, statutory tax rules & net pay calculation</p></div>`; }
  function renderCrm() { return `<div class="page-header"><h1>Sales CRM & Lead Funnel</h1><p>Lead scoring engine & deal pipeline forecasting</p></div>`; }
  function renderInventory() { return `<div class="page-header"><h1>Inventory & Warehouse Logistics</h1><p>SKU reorder points and stock tracking</p></div>`; }
  function renderAudit() { return `<div class="page-header"><h1>Security & Audit Trail</h1><p>Tamper-evident SHA-256 log chain</p></div>`; }
});
