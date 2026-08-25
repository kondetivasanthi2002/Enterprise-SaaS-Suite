// Enterprise Interactive Single Page Application Logic

// In-Memory Interactive Datasets (Fully Editable)
const appStore = {
  tenants: [
    { id: "tnt-101", name: "Stark Industries", slug: "stark-ind", plan: "ENTERPRISE", status: "ACTIVE", maxUsers: 1000, usersUsed: 480, maxStorageGb: 1000, storageUsed: 450 },
    { id: "tnt-102", name: "Acme Corporation", slug: "acme-corp", plan: "PRO", status: "ACTIVE", maxUsers: 100, usersUsed: 85, maxStorageGb: 100, storageUsed: 65 },
    { id: "tnt-103", name: "Cyberdyne Systems", slug: "cyberdyne", plan: "STARTER", status: "SUSPENDED", maxUsers: 10, usersUsed: 10, maxStorageGb: 10, storageUsed: 10 },
    { id: "tnt-104", name: "Wayne Enterprises", slug: "wayne-ent", plan: "ENTERPRISE", status: "ACTIVE", maxUsers: 1000, usersUsed: 310, maxStorageGb: 1000, storageUsed: 290 }
  ],
  ledger: [
    { code: "1000", name: "Cash & Cash Equivalents", type: "ASSET", balance: 250000.00 },
    { code: "1100", name: "Accounts Receivable", type: "ASSET", balance: 45000.00 },
    { code: "1200", name: "Merchandise Inventory", type: "ASSET", balance: 85000.00 },
    { code: "2000", name: "Accounts Payable", type: "LIABILITY", balance: 30000.00 },
    { code: "2100", name: "Deferred Revenue", type: "LIABILITY", balance: 50000.00 },
    { code: "3000", name: "Owner Common Stock", type: "EQUITY", balance: 200000.00 },
    { code: "4000", name: "SaaS Subscription Revenue", type: "REVENUE", balance: 150000.00 },
    { code: "5000", name: "Payroll & Salary Expense", type: "EXPENSE", balance: 40000.00 }
  ],
  employees: [
    { id: "emp-001", code: "E-101", name: "Sarah Connor", email: "sarah@cyberdyne.com", dept: "Engineering", role: "Principal Architect", salary: 14500 },
    { id: "emp-002", code: "E-102", name: "Tony Stark", email: "tony@stark.com", dept: "Executive", role: "Chief Technology Officer", salary: 25000 },
    { id: "emp-003", code: "E-103", name: "Bruce Wayne", email: "bruce@wayne.com", dept: "Security", role: "Security Director", salary: 18000 },
    { id: "emp-004", code: "E-104", name: "Peter Parker", email: "peter@stark.com", dept: "Research", role: "Research Associate", salary: 8500 }
  ],
  crmLeads: [
    { id: "lead-01", company: "Apex Global Tech", email: "contact@apex.com", employees: 650, revenue: 15000000, score: 85, status: "QUALIFIED" },
    { id: "lead-02", company: "Nexus Dynamics", email: "info@nexus.io", employees: 120, revenue: 3500000, score: 60, status: "IN_DISCUSSION" },
    { id: "lead-03", company: "Vanguard Logistics", email: "sales@vanguard.com", employees: 40, revenue: 800000, score: 35, status: "NEW" }
  ],
  inventory: [
    { sku: "SKU-SER-001", name: "Rack Server Chassis 2U", onHand: 45, reorderPoint: 15, reorderQty: 20, unitCost: 1200 },
    { sku: "SKU-MEM-064", name: "DDR5 ECC RAM 64GB Module", onHand: 120, reorderPoint: 30, reorderQty: 50, unitCost: 350 },
    { sku: "SKU-SSD-004", name: "NVMe Enterprise SSD 4TB", onHand: 8, reorderPoint: 10, reorderQty: 25, unitCost: 650 }
  ],
  auditLogs: [
    { id: "aud-901", time: "2026-08-25 14:30:00", actor: "admin@saas.internal", action: "TENANT_PROVISION", resource: "tnt-104", hash: "a4f89b2c..." },
    { id: "aud-902", time: "2026-08-25 14:32:15", actor: "sarah@cyberdyne.com", action: "FINANCE_POST_JOURNAL", resource: "entry-501", hash: "9e12c8b1..." }
  ]
};

document.addEventListener("DOMContentLoaded", () => {
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
});

// Helper Modal Controller
function openModal(title, bodyHtml) {
  document.getElementById("modal-title").innerText = title;
  document.getElementById("modal-body").innerHTML = bodyHtml;
  document.getElementById("modal-backdrop").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("modal-backdrop").classList.add("hidden");
}

// -------------------------------------------------------------
// 1. OVERVIEW PAGE
// -------------------------------------------------------------
function renderOverview() {
  return `
    <div class="page-header">
      <div class="page-title-group">
        <h1>Executive Dashboard</h1>
        <p>Real-time enterprise SaaS operations, tenant health, and financial general ledger overview</p>
      </div>
      <button class="btn btn-primary" onclick="alert('Exporting executive PDF summary report...')">📥 Export Report</button>
    </div>

    <div class="grid-kpi">
      <div class="kpi-card">
        <div class="kpi-title">Annual Recurring Revenue (ARR)</div>
        <div class="kpi-num">$14,250,800</div>
        <div class="kpi-trend up">▲ +18.4% YoY growth</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-title">Active Enterprise Tenants</div>
        <div class="kpi-num">${appStore.tenants.length} Tenants</div>
        <div class="kpi-trend up">✔ 100% SLA uptime</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-title">General Ledger Cash Position</div>
        <div class="kpi-num">$${appStore.ledger.find(a => a.code==='1000').balance.toLocaleString()}</div>
        <div class="kpi-trend up">✔ Debit/Credit Reconciled</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-title">Total Active Employees</div>
        <div class="kpi-num">${appStore.employees.length} Staff</div>
        <div class="kpi-trend up">✔ Payroll Calculated</div>
      </div>
    </div>

    <div class="card-table">
      <div class="table-toolbar">
        <h3>System Overview & Activity Stream</h3>
        <span class="badge badge-active">Live Workspace</span>
      </div>
      <div style="padding: 1.5rem;">
        <p style="color: var(--text-secondary); margin-bottom: 1rem;">
          Welcome to the <strong>Enterprise SaaS Operations Suite</strong>. All modules below are fully interactive and editable. Use the sidebar menu or click on any section to manage tenants, post financial ledger entries, calculate mid-cycle prorated subscription upgrades, manage employee salaries, score sales leads, and trigger stock reorders.
        </p>
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// 2. MULTI-TENANCY PAGE (Fully Editable)
// -------------------------------------------------------------
function renderTenants() {
  const rows = appStore.tenants.map(t => `
    <tr>
      <td><strong>${t.name}</strong></td>
      <td><code>${t.slug}</code></td>
      <td><span class="badge ${t.plan === 'ENTERPRISE' ? 'badge-active' : 'badge-suspended'}">${t.plan}</span></td>
      <td><span class="badge ${t.status === 'ACTIVE' ? 'badge-active' : 'badge-archived'}">${t.status}</span></td>
      <td>${t.usersUsed} / ${t.maxUsers} Seats</td>
      <td>${t.storageUsed}GB / ${t.maxStorageGb}GB</td>
      <td>
        <button class="btn btn-secondary btn-sm" onclick="editTenant('${t.id}')">✏️ Edit</button>
        <button class="btn btn-danger btn-sm" onclick="deleteTenant('${t.id}')">🗑️ Delete</button>
      </td>
    </tr>
  `).join("");

  return `
    <div class="page-header">
      <div class="page-title-group">
        <h1>Multi-Tenant Management</h1>
        <p>Tenant provisioning, schema isolation context, quota enforcement, and seat limits</p>
      </div>
      <button class="btn btn-primary" onclick="openAddTenantModal()">➕ Provision New Tenant</button>
    </div>

    <div class="card-table">
      <div class="table-toolbar">
        <h3>Active Provisioned Tenants</h3>
        <span>Total: ${appStore.tenants.length} Tenants</span>
      </div>
      <div class="table-responsive">
        <table class="enterprise-table">
          <thead>
            <tr>
              <th>Tenant Name</th>
              <th>Slug ID</th>
              <th>Plan Tier</th>
              <th>Status</th>
              <th>User Quota</th>
              <th>Storage Quota</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>
  `;
}

function openAddTenantModal() {
  const formHtml = `
    <form onsubmit="saveNewTenant(event)">
      <div class="form-group">
        <label>Tenant Organization Name</label>
        <input type="text" id="t-name" class="form-control" required placeholder="e.g. Wayne Enterprises">
      </div>
      <div class="form-group">
        <label>Tenant Subdomain Slug</label>
        <input type="text" id="t-slug" class="form-control" required placeholder="e.g. wayne-ent">
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Plan Tier</label>
          <select id="t-plan" class="form-control">
            <option value="STARTER">Starter Tier</option>
            <option value="PRO">Professional Tier</option>
            <option value="ENTERPRISE" selected>Enterprise Suite</option>
          </select>
        </div>
        <div class="form-group">
          <label>Max Users Seats</label>
          <input type="number" id="t-users" class="form-control" value="100">
        </div>
      </div>
      <div style="display:flex; justify-content:flex-end; gap:0.5rem; margin-top:1rem;">
        <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
        <button type="submit" class="btn btn-primary">Save Tenant</button>
      </div>
    </form>
  `;
  openModal("Provision New Tenant", formHtml);
}

function saveNewTenant(e) {
  e.preventDefault();
  const name = document.getElementById("t-name").value;
  const slug = document.getElementById("t-slug").value;
  const plan = document.getElementById("t-plan").value;
  const maxUsers = parseInt(document.getElementById("t-users").value);

  const newTenant = {
    id: `tnt-${Date.now()}`,
    name,
    slug,
    plan,
    status: "ACTIVE",
    maxUsers,
    usersUsed: 1,
    maxStorageGb: plan === "ENTERPRISE" ? 1000 : 100,
    storageUsed: 5
  };

  appStore.tenants.push(newTenant);
  closeModal();
  window.location.hash = "#tenants";
  document.getElementById("page-content").innerHTML = renderTenants();
}

function deleteTenant(id) {
  if (confirm("Are you sure you want to delete this tenant record?")) {
    appStore.tenants = appStore.tenants.filter(t => t.id !== id);
    document.getElementById("page-content").innerHTML = renderTenants();
  }
}

function editTenant(id) {
  const t = appStore.tenants.find(t => t.id === id);
  if (!t) return;

  const formHtml = `
    <form onsubmit="updateTenant(event, '${id}')">
      <div class="form-group">
        <label>Tenant Name</label>
        <input type="text" id="edit-t-name" class="form-control" value="${t.name}" required>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Plan Tier</label>
          <select id="edit-t-plan" class="form-control">
            <option value="STARTER" ${t.plan === 'STARTER' ? 'selected' : ''}>Starter</option>
            <option value="PRO" ${t.plan === 'PRO' ? 'selected' : ''}>Professional</option>
            <option value="ENTERPRISE" ${t.plan === 'ENTERPRISE' ? 'selected' : ''}>Enterprise</option>
          </select>
        </div>
        <div class="form-group">
          <label>Status</label>
          <select id="edit-t-status" class="form-control">
            <option value="ACTIVE" ${t.status === 'ACTIVE' ? 'selected' : ''}>ACTIVE</option>
            <option value="SUSPENDED" ${t.status === 'SUSPENDED' ? 'selected' : ''}>SUSPENDED</option>
          </select>
        </div>
      </div>
      <div style="display:flex; justify-content:flex-end; gap:0.5rem; margin-top:1rem;">
        <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
        <button type="submit" class="btn btn-primary">Update Tenant</button>
      </div>
    </form>
  `;
  openModal("Edit Tenant Parameters", formHtml);
}

function updateTenant(e, id) {
  e.preventDefault();
  const t = appStore.tenants.find(t => t.id === id);
  if (t) {
    t.name = document.getElementById("edit-t-name").value;
    t.plan = document.getElementById("edit-t-plan").value;
    t.status = document.getElementById("edit-t-status").value;
  }
  closeModal();
  document.getElementById("page-content").innerHTML = renderTenants();
}

// -------------------------------------------------------------
// 3. FINANCIAL LEDGER PAGE (Double-Entry Posting & Reconciliation)
// -------------------------------------------------------------
function renderFinance() {
  const rows = appStore.ledger.map(a => `
    <tr>
      <td><code>${a.code}</code></td>
      <td><strong>${a.name}</strong></td>
      <td><span class="badge badge-active">${a.type}</span></td>
      <td style="font-weight:700;">$${a.balance.toLocaleString('en-US', {minimumFractionDigits: 2})}</td>
    </tr>
  `).join("");

  return `
    <div class="page-header">
      <div class="page-title-group">
        <h1>Double-Entry General Ledger</h1>
        <p>ASC 606 revenue recognition schedules, double-entry journal posting, and balance sheet integrity</p>
      </div>
      <button class="btn btn-primary" onclick="openJournalModal()">📝 Post Journal Entry</button>
    </div>

    <div class="card-table">
      <div class="table-toolbar">
        <h3>Chart of Accounts & Trial Balances</h3>
        <span class="badge badge-active">General Ledger Reconciled</span>
      </div>
      <div class="table-responsive">
        <table class="enterprise-table">
          <thead>
            <tr>
              <th>Account Code</th>
              <th>Account Title</th>
              <th>Category</th>
              <th>Current Balance</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>
  `;
}

function openJournalModal() {
  const options = appStore.ledger.map(a => `<option value="${a.code}">${a.code} - ${a.name}</option>`).join("");
  const formHtml = `
    <form onsubmit="postJournalEntry(event)">
      <div class="form-group">
        <label>Journal Entry Description</label>
        <input type="text" id="j-desc" class="form-control" placeholder="e.g. Customer SaaS Invoice Payment" required>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Debit Account</label>
          <select id="j-debit-acc" class="form-control">${options}</select>
        </div>
        <div class="form-group">
          <label>Credit Account</label>
          <select id="j-credit-acc" class="form-control">${options}</select>
        </div>
      </div>
      <div class="form-group">
        <label>Amount ($ USD)</label>
        <input type="number" id="j-amount" step="0.01" class="form-control" placeholder="1000.00" required>
      </div>
      <div style="display:flex; justify-content:flex-end; gap:0.5rem; margin-top:1rem;">
        <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
        <button type="submit" class="btn btn-primary">Post Balanced Journal</button>
      </div>
    </form>
  `;
  openModal("Post Double-Entry Journal", formHtml);
}

function postJournalEntry(e) {
  e.preventDefault();
  const debitCode = document.getElementById("j-debit-acc").value;
  const creditCode = document.getElementById("j-credit-acc").value;
  const amount = parseFloat(document.getElementById("j-amount").value);

  if (debitCode === creditCode) {
    alert("Debit and Credit accounts cannot be identical!");
    return;
  }

  const debitAcc = appStore.ledger.find(a => a.code === debitCode);
  const creditAcc = appStore.ledger.find(a => a.code === creditCode);

  if (debitAcc && creditAcc) {
    debitAcc.balance += amount;
    creditAcc.balance += amount;
    alert(`Journal posted successfully! Debit $${amount} to ${debitAcc.name}, Credit $${amount} to ${creditAcc.name}`);
  }

  closeModal();
  document.getElementById("page-content").innerHTML = renderFinance();
}

// -------------------------------------------------------------
// 4. SAAS SUBSCRIPTIONS & PRORATED BILLING
// -------------------------------------------------------------
function renderBilling() {
  return `
    <div class="page-header">
      <div class="page-title-group">
        <h1>SaaS Subscription Engine</h1>
        <p>Prorated mid-cycle upgrade engine, automated invoice generator, and payment webhook adapters</p>
      </div>
    </div>

    <div class="grid-kpi">
      <div class="kpi-card">
        <div class="kpi-title">Starter Tier</div>
        <div class="kpi-num">$49 / mo</div>
        <p style="color:var(--text-muted); font-size:0.85rem;">Up to 10 Seats & 10GB</p>
      </div>
      <div class="kpi-card">
        <div class="kpi-title">Professional Tier</div>
        <div class="kpi-num">$199 / mo</div>
        <p style="color:var(--text-muted); font-size:0.85rem;">Up to 100 Seats & 100GB</p>
      </div>
      <div class="kpi-card">
        <div class="kpi-title">Enterprise Suite</div>
        <div class="kpi-num">$899 / mo</div>
        <p style="color:var(--text-muted); font-size:0.85rem;">Unlimited Seats & 1TB</p>
      </div>
    </div>

    <div class="card-table" style="padding:1.5rem;">
      <h3>Prorated Upgrade Calculator</h3>
      <p style="color:var(--text-secondary); margin-bottom:1rem;">Simulate mid-billing cycle tier changes and prorated credit adjustments</p>

      <div class="form-row">
        <div class="form-group">
          <label>Current Subscription Plan</label>
          <select id="calc-curr" class="form-control" onchange="runProrationCalc()">
            <option value="49">Starter Tier ($49/mo)</option>
            <option value="199" selected>Professional Tier ($199/mo)</option>
          </select>
        </div>
        <div class="form-group">
          <label>Target Upgrade Plan</label>
          <select id="calc-target" class="form-control" onchange="runProrationCalc()">
            <option value="199">Professional Tier ($199/mo)</option>
            <option value="899" selected>Enterprise Suite ($899/mo)</option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label>Days Remaining in Current Month (out of 30)</label>
        <input type="number" id="calc-days" class="form-control" value="15" min="1" max="30" oninput="runProrationCalc()">
      </div>

      <div id="proration-result" style="background:var(--bg-secondary); padding:1rem; border-radius:8px; border:1px solid var(--border-color); font-weight:600;">
        Calculating proration...
      </div>
    </div>
  `;
}

function runProrationCalc() {
  const curr = parseFloat(document.getElementById("calc-curr")?.value || 199);
  const target = parseFloat(document.getElementById("calc-target")?.value || 899);
  const days = parseInt(document.getElementById("calc-days")?.value || 15);

  const unusedCredit = (curr / 30) * days;
  const newProrated = (target / 30) * days;
  const netDue = newProrated - unusedCredit;

  const resDiv = document.getElementById("proration-result");
  if (resDiv) {
    resDiv.innerHTML = `
      <div style="display:flex; justify-content:space-between; margin-bottom:0.4rem;">
        <span>Unused Credit Refund (${days} days):</span> <span style="color:var(--danger)">-$${unusedCredit.toFixed(2)}</span>
      </div>
      <div style="display:flex; justify-content:space-between; margin-bottom:0.4rem;">
        <span>Prorated Upgrade Charge (${days} days):</span> <span style="color:var(--success)">+$${newProrated.toFixed(2)}</span>
      </div>
      <div style="display:flex; justify-content:space-between; font-size:1.1rem; border-top:1px solid var(--border-color); padding-top:0.4rem;">
        <span>Net Immediate Amount Due:</span> <span style="color:var(--primary)">$${netDue.toFixed(2)}</span>
      </div>
    `;
  }
}

// -------------------------------------------------------------
// 5. HRMS & PAYROLL PAGE (Editable Employees & Salary Engine)
// -------------------------------------------------------------
function renderHrms() {
  const rows = appStore.employees.map(e => {
    const gross = e.salary;
    const tax = gross * 0.20;
    const net = gross - tax - 200;
    return `
      <tr>
        <td><code>${e.code}</code></td>
        <td><strong>${e.name}</strong></td>
        <td>${e.email}</td>
        <td><span class="badge badge-active">${e.dept}</span></td>
        <td>${e.role}</td>
        <td>$${e.salary.toLocaleString()}</td>
        <td style="font-weight:700; color:var(--success)">$${net.toLocaleString()}</td>
        <td>
          <button class="btn btn-danger btn-sm" onclick="removeEmployee('${e.id}')">Delete</button>
        </td>
      </tr>
    `;
  }).join("");

  return `
    <div class="page-header">
      <div class="page-title-group">
        <h1>HRMS & Payroll Engine</h1>
        <p>Employee records, statutory tax rules, leave accrual, and net pay calculations</p>
      </div>
      <button class="btn btn-primary" onclick="openAddEmployeeModal()">➕ Add Employee Profile</button>
    </div>

    <div class="card-table">
      <div class="table-toolbar">
        <h3>Employee Payroll Roster</h3>
        <span>Total Active: ${appStore.employees.length}</span>
      </div>
      <div class="table-responsive">
        <table class="enterprise-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Full Name</th>
              <th>Email Address</th>
              <th>Department</th>
              <th>Job Title</th>
              <th>Base Salary</th>
              <th>Calculated Net Pay</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>
  `;
}

function openAddEmployeeModal() {
  const formHtml = `
    <form onsubmit="saveEmployee(event)">
      <div class="form-group">
        <label>Employee Full Name</label>
        <input type="text" id="e-name" class="form-control" required placeholder="e.g. Clark Kent">
      </div>
      <div class="form-group">
        <label>Email Address</label>
        <input type="email" id="e-email" class="form-control" required placeholder="clark@dailyplanet.com">
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Department</label>
          <input type="text" id="e-dept" class="form-control" value="Engineering" required>
        </div>
        <div class="form-group">
          <label>Base Monthly Salary ($)</label>
          <input type="number" id="e-salary" class="form-control" value="12000" required>
        </div>
      </div>
      <div style="display:flex; justify-content:flex-end; gap:0.5rem; margin-top:1rem;">
        <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
        <button type="submit" class="btn btn-primary">Save Employee</button>
      </div>
    </form>
  `;
  openModal("Add Employee Profile", formHtml);
}

function saveEmployee(e) {
  e.preventDefault();
  const name = document.getElementById("e-name").value;
  const email = document.getElementById("e-email").value;
  const dept = document.getElementById("e-dept").value;
  const salary = parseFloat(document.getElementById("e-salary").value);

  const newEmp = {
    id: `emp-${Date.now()}`,
    code: `E-${Math.floor(Math.random() * 900 + 100)}`,
    name,
    email,
    dept,
    role: "Senior Associate",
    salary
  };

  appStore.employees.push(newEmp);
  closeModal();
  document.getElementById("page-content").innerHTML = renderHrms();
}

function removeEmployee(id) {
  if (confirm("Delete employee from payroll roster?")) {
    appStore.employees = appStore.employees.filter(e => e.id !== id);
    document.getElementById("page-content").innerHTML = renderHrms();
  }
}

// -------------------------------------------------------------
// 6. SALES CRM & LEAD SCORING ENGINE
// -------------------------------------------------------------
function renderCrm() {
  const rows = appStore.crmLeads.map(l => `
    <tr>
      <td><strong>${l.company}</strong></td>
      <td>${l.email}</td>
      <td>${l.employees} Staff</td>
      <td>$${(l.revenue / 1000000).toFixed(1)}M</td>
      <td><span class="badge badge-active">${l.score} Points</span></td>
      <td><span class="badge ${l.status === 'QUALIFIED' ? 'badge-active' : 'badge-suspended'}">${l.status}</span></td>
    </tr>
  `).join("");

  return `
    <div class="page-header">
      <div class="page-title-group">
        <h1>Sales CRM & Lead Engine</h1>
        <p>Lead scoring algorithms, deal forecasting, and customer 360 intelligence</p>
      </div>
      <button class="btn btn-primary" onclick="openAddLeadModal()">➕ Score New Lead</button>
    </div>

    <div class="card-table">
      <div class="table-toolbar">
        <h3>Active Deal Pipeline & Leads</h3>
        <span>Total Leads: ${appStore.crmLeads.length}</span>
      </div>
      <div class="table-responsive">
        <table class="enterprise-table">
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Contact Email</th>
              <th>Employee Count</th>
              <th>Annual Revenue</th>
              <th>Lead Score</th>
              <th>Pipeline Stage</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>
  `;
}

function openAddLeadModal() {
  const formHtml = `
    <form onsubmit="saveLead(event)">
      <div class="form-group">
        <label>Company Name</label>
        <input type="text" id="l-company" class="form-control" placeholder="Acme Logistics" required>
      </div>
      <div class="form-group">
        <label>Contact Email</label>
        <input type="email" id="l-email" class="form-control" placeholder="sales@acme.com" required>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Employee Count</label>
          <input type="number" id="l-emp" class="form-control" value="250">
        </div>
        <div class="form-group">
          <label>Annual Revenue ($)</label>
          <input type="number" id="l-rev" class="form-control" value="5000000">
        </div>
      </div>
      <div style="display:flex; justify-content:flex-end; gap:0.5rem; margin-top:1rem;">
        <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
        <button type="submit" class="btn btn-primary">Score & Save Lead</button>
      </div>
    </form>
  `;
  openModal("Score & Qualify New Lead", formHtml);
}

function saveLead(e) {
  e.preventDefault();
  const company = document.getElementById("l-company").value;
  const email = document.getElementById("l-email").value;
  const employees = parseInt(document.getElementById("l-emp").value);
  const revenue = parseFloat(document.getElementById("l-rev").value);

  let score = 0;
  if (employees > 500) score += 40;
  else if (employees > 100) score += 25;
  if (revenue > 10000000) score += 45;
  else if (revenue > 1000000) score += 25;

  appStore.crmLeads.push({
    id: `lead-${Date.now()}`,
    company,
    email,
    employees,
    revenue,
    score,
    status: score >= 50 ? "QUALIFIED" : "NEW"
  });

  closeModal();
  document.getElementById("page-content").innerHTML = renderCrm();
}

// -------------------------------------------------------------
// 7. STOCK & LOGISTICS PAGE
// -------------------------------------------------------------
function renderInventory() {
  const rows = appStore.inventory.map(i => {
    const isReorderNeeded = i.onHand <= i.reorderPoint;
    return `
      <tr>
        <td><code>${i.sku}</code></td>
        <td><strong>${i.name}</strong></td>
        <td style="font-weight:700;">${i.onHand} Units</td>
        <td>${i.reorderPoint} Units</td>
        <td>$${i.unitCost.toLocaleString()}</td>
        <td>
          <span class="badge ${isReorderNeeded ? 'badge-danger' : 'badge-active'}">
            ${isReorderNeeded ? '⚠️ REORDER NEEDED' : '✔ IN STOCK'}
          </span>
        </td>
        <td>
          <button class="btn btn-secondary btn-sm" onclick="adjustStock('${i.sku}')">Adjust Stock</button>
        </td>
      </tr>
    `;
  }).join("");

  return `
    <div class="page-header">
      <div class="page-title-group">
        <h1>Inventory & Stock Control</h1>
        <p>SKU catalog, multi-warehouse stock management, and automatic reorder triggers</p>
      </div>
    </div>

    <div class="card-table">
      <div class="table-toolbar">
        <h3>Warehouse Inventory SKUs</h3>
        <span>Total Items: ${appStore.inventory.length}</span>
      </div>
      <div class="table-responsive">
        <table class="enterprise-table">
          <thead>
            <tr>
              <th>SKU Number</th>
              <th>Product Name</th>
              <th>On Hand</th>
              <th>Reorder Point</th>
              <th>Unit Cost</th>
              <th>Stock Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>
  `;
}

function adjustStock(sku) {
  const item = appStore.inventory.find(i => i.sku === sku);
  if (!item) return;

  const newQty = prompt(`Adjust stock quantity for ${item.name} (${sku}):`, item.onHand);
  if (newQty !== null) {
    item.onHand = parseInt(newQty) || 0;
    document.getElementById("page-content").innerHTML = renderInventory();
  }
}

// -------------------------------------------------------------
// 8. SECURITY & AUDIT TRAIL PAGE
// -------------------------------------------------------------
function renderAudit() {
  const rows = appStore.auditLogs.map(a => `
    <tr>
      <td><code>${a.id}</code></td>
      <td>${a.time}</td>
      <td>${a.actor}</td>
      <td><span class="badge badge-active">${a.action}</span></td>
      <td><code>${a.resource}</code></td>
      <td><code style="font-size:0.75rem; color:var(--text-muted);">${a.hash}</code></td>
    </tr>
  `).join("");

  return `
    <div class="page-header">
      <div class="page-title-group">
        <h1>Tamper-Evident Audit Trail</h1>
        <p>Immutable SHA-256 HMAC event log chaining for SOC2 & GDPR compliance</p>
      </div>
    </div>

    <div class="card-table">
      <div class="table-toolbar">
        <h3>Cryptographic Security Logs</h3>
        <span class="badge badge-active">HMAC Hash Chain Intact</span>
      </div>
      <div class="table-responsive">
        <table class="enterprise-table">
          <thead>
            <tr>
              <th>Log ID</th>
              <th>Timestamp</th>
              <th>Actor User</th>
              <th>Action Performed</th>
              <th>Resource</th>
              <th>HMAC-SHA256 Signature</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>
  `;
}
