# Enterprise & SaaS Operations Management Platform

A high-performance, production-grade enterprise software suite exceeding 50,000+ lines of code, engineered for enterprise resource planning (ERP), financial accounting, customer relationship management (CRM), human resource management (HRMS), and SaaS subscription billing.

## Dependencies

The project relies on the following core manifests and system requirements:

- **Node.js**: v18.0.0 or higher
- **TypeScript**: v5.3.3 or higher
- **Python**: v3.8+ (for background test runner & lightweight web server)
- **Express / Node API Gateway**: `express`, `jsonwebtoken`, `bcrypt`, `cors`, `dotenv`
- **Database & ORM**: `prisma`, `@prisma/client`, PostgreSQL / SQLite
- **Manifests & Lockfiles**: `package.json`, `package-lock.json`, `tsconfig.json`

## Installation

Follow these steps to set up the local development environment and install all required dependencies:

```bash
# 1. Clone the repository
git clone https://github.com/kondetivasanthi2002/Enterprise-SaaS-Suite.git
cd Enterprise-SaaS-Suite

# 2. Install Node.js package dependencies using package-lock.json
npm install

# 3. (Optional) Set up Python virtual environment
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate
```

## Build

To compile the TypeScript domain packages and API Gateway modules into executable JavaScript binaries:

```bash
# Compile TypeScript files
npm run build

# Generate Prisma ORM database client artifacts
npx prisma generate
```

## Run

To execute and launch the Enterprise SaaS application locally:

```bash
# Launch the application server & web dashboard portal
npm start

# Alternatively, run via Python entry point:
python start_server.py

# Or launch main application entry point:
node index.js
```

The live web dashboard will be available at: **`http://127.0.0.1:8000`** or **`http://localhost:8080`**.

## Usage

### 1. Executive Operations Command Dashboard
Navigate to `http://127.0.0.1:8000` in your web browser to access real-time metrics for Annual Recurring Revenue (ARR), Active Tenant Health, General Ledger Cash Balance, and Uptime SLA.

### 2. Multi-Tenant Provisioning
Use the **Multi-Tenancy** tab to provision new enterprise tenant accounts, assign plan tiers (`STARTER`, `PRO`, `ENTERPRISE`), and set user/storage quota limits.

### 3. Double-Entry General Ledger
Use the **Financial Ledger** tab to review the Chart of Accounts. Click **Post Journal Entry** to execute balanced debit/credit transactions ASC 606 revenue recognition schedules.

### 4. SaaS Subscription Engine
Use the **SaaS Subscriptions** tab to compute mid-billing cycle plan upgrade proration charges, unused credits, and net amounts due.

### 5. HRMS & Payroll System
Use the **HRMS & Payroll** tab to manage employee profiles, compute 20% statutory income tax deductions, health insurance, and net salary calculations.

### 6. Executing Test Suites
Run the automated test runner to verify all 13 unit & integration test cases and view code coverage reports:

```bash
npm test
# Or using Python runner:
python tests/test-runner.py
```

## License

Proprietary / Commercial Enterprise License. All rights reserved.
