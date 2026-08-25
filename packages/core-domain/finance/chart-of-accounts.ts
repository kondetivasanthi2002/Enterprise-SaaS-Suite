export enum AccountType {
  ASSET = "ASSET",
  LIABILITY = "LIABILITY",
  EQUITY = "EQUITY",
  REVENUE = "REVENUE",
  EXPENSE = "EXPENSE"
}

export interface AccountNode {
  code: string;
  name: string;
  type: AccountType;
  parentCode?: string;
  balance: number;
}

export class ChartOfAccounts {
  private static accounts: Map<string, AccountNode> = new Map([
    ["1000", { code: "1000", name: "Cash & Cash Equivalents", type: AccountType.ASSET, balance: 250000.00 }],
    ["1100", { code: "1100", name: "Accounts Receivable", type: AccountType.ASSET, balance: 45000.00 }],
    ["1200", { code: "1200", name: "Merchandise Inventory", type: AccountType.ASSET, balance: 85000.00 }],
    ["2000", { code: "2000", name: "Accounts Payable", type: AccountType.LIABILITY, balance: 30000.00 }],
    ["2100", { code: "2100", name: "Unearned / Deferred Revenue", type: AccountType.LIABILITY, balance: 50000.00 }],
    ["3000", { code: "3000", name: "Owner Common Stock", type: AccountType.EQUITY, balance: 200000.00 }],
    ["3100", { code: "3100", name: "Retained Earnings", type: AccountType.EQUITY, balance: 100000.00 }],
    ["4000", { code: "4000", name: "SaaS Subscription Revenue", type: AccountType.REVENUE, balance: 150000.00 }],
    ["5000", { code: "5000", name: "Payroll & Salary Expense", type: AccountType.EXPENSE, balance: 40000.00 }],
    ["5100", { code: "5100", name: "Cloud Infrastructure Expense", type: AccountType.EXPENSE, balance: 10000.00 }]
  ]);

  public static getAccount(code: string): AccountNode | undefined {
    return this.accounts.get(code);
  }

  public static updateBalance(code: string, delta: number): void {
    const acc = this.accounts.get(code);
    if (acc) {
      acc.balance += delta;
    }
  }

  public static getAllAccounts(): AccountNode[] {
    return Array.from(this.accounts.values());
  }
}
