const fs = require('fs');
const path = require('path');

console.log("\n=======================================================");
console.log("   ENTERPRISE & SAAS PLATFORM TEST SUITE RUNNER       ");
console.log("=======================================================\n");

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  [PASS] ✔ ${message}`);
    passed++;
  } else {
    console.log(`  [FAIL] ✖ ${message}`);
    failed++;
  }
}

console.log("RUNNING TEST SUITE 1: AuthService & JWT Engine");
const { JwtService } = require('../packages/core-domain/auth-rbac/jwt-service');
const token = JwtService.signToken({
  userId: "user-101",
  tenantId: "tnt-acme",
  email: "admin@acme.com",
  roles: ["TENANT_ADMIN"],
  permissions: ["tenant:read"]
}, 3600);
assert(typeof token === "string" && token.length > 20, "JWT Token successfully generated");
const decoded = JwtService.verifyToken(token);
assert(decoded.userId === "user-101" && decoded.tenantId === "tnt-acme", "JWT Token payload verified cleanly");

console.log("\nRUNNING TEST SUITE 2: RbacMatrix & Permission Hierarchy");
const { RbacMatrix, Role, Permission } = require('../packages/core-domain/auth-rbac/rbac-matrix');
assert(RbacMatrix.hasPermission(Role.SUPER_ADMIN, Permission.TENANT_DELETE) === true, "Super Admin has full delete permission");
assert(RbacMatrix.hasPermission(Role.STAFF_USER, Permission.TENANT_DELETE) === false, "Staff user denied delete permission");

console.log("\nRUNNING TEST SUITE 3: DoubleEntryLedger Balance Integrity");
const { DoubleEntryLedger } = require('../packages/core-domain/finance/double-entry-ledger');
const balancedResult = DoubleEntryLedger.postJournalEntry({
  id: "entry-001",
  tenantId: "tnt-acme",
  postingDate: new Date().toISOString(),
  description: "Test Cash Deposit",
  lines: [
    { accountCode: "1000", debit: 500, credit: 0 },
    { accountCode: "3000", debit: 0, credit: 500 }
  ]
});
assert(balancedResult.success === true, "Balanced journal entry (Debit = Credit) posted successfully");

const unbalancedResult = DoubleEntryLedger.postJournalEntry({
  id: "entry-002",
  tenantId: "tnt-acme",
  postingDate: new Date().toISOString(),
  description: "Unbalanced Entry",
  lines: [
    { accountCode: "1000", debit: 500, credit: 0 },
    { accountCode: "3000", debit: 0, credit: 100 }
  ]
});
assert(unbalancedResult.success === false, "Unbalanced journal entry correctly rejected");

console.log("\nRUNNING TEST SUITE 4: SubscriptionEngine Upgrade Calculation");
const { SubscriptionEngine } = require('../packages/core-domain/billing/subscription-engine');
const proration = SubscriptionEngine.calculateUpgradeProration("STARTER", "PRO", 15, 30);
assert(proration.proratedCharge > 0 && proration.creditUnused > 0, "Prorated charge and unused credit computed accurately");

console.log("\nRUNNING TEST SUITE 5: PayrollCalculator Net Pay Engine");
const { PayrollCalculator } = require('../packages/core-domain/hrms/payroll-calculator');
const payroll = PayrollCalculator.calculateNetSalary({
  employeeId: "emp-501",
  baseMonthlySalary: 10000,
  allowances: 1000,
  taxDeductionRate: 20,
  healthInsuranceDeduction: 200,
  retirementContributionRate: 5
});
assert(payroll.grossPay === 11000, "Gross salary computed as base + allowances");
assert(payroll.incomeTax === 2200, "20% tax deduction computed correctly");
assert(payroll.netPay === 8050, "Net salary computed accurately after all statutory deductions");

console.log("\nRUNNING TEST SUITE 6: Tamper-Evident Audit Logging");
const { AuditTrailEngine } = require('../packages/core-domain/audit-log/audit-trail');
const log1 = AuditTrailEngine.logAction("tnt-acme", "user-101", "LOGIN", "AUTH");
const log2 = AuditTrailEngine.logAction("tnt-acme", "user-101", "EXPORT_REPORT", "FINANCE");
assert(log2.previousHash === log1.currentHash, "Audit log hash chain verified (previousHash matches prior currentHash)");

console.log("\n=======================================================");
console.log(`   TEST RESULT: ${passed} PASSED, ${failed} FAILED               `);
console.log("=======================================================\n");

if (failed > 0) {
  process.exit(1);
}
