# Enterprise Architecture Specification

## Monorepo & Modular Monolith Design
The system is constructed with strict separation between Domain Logic, Database Models, API Gateway, and Web UI.

- Multi-tenancy is enforced via header isolation `x-tenant-id`.
- General Ledger enforces Debit = Credit balance equality.
- Subscriptions compute daily proration math for plan tier changes.
- Payroll applies statutory tax deductions.
- Audit trail chains events using SHA-256 HMACs.
