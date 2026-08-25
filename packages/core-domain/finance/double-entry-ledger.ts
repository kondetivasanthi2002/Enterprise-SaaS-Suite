import { ChartOfAccounts, AccountType } from "./chart-of-accounts";

export interface JournalLine {
  accountCode: string;
  debit: number;
  credit: number;
}

export interface JournalEntry {
  id: string;
  tenantId: string;
  postingDate: string;
  description: string;
  lines: JournalLine[];
}

export class DoubleEntryLedger {
  public static postJournalEntry(entry: JournalEntry): { success: boolean; message: string } {
    let totalDebit = 0;
    let totalCredit = 0;

    for (const line of entry.lines) {
      if (line.debit < 0 || line.credit < 0) {
        return { success: false, message: "Debit and credit amounts must be non-negative" };
      }
      totalDebit += line.debit;
      totalCredit += line.credit;
    }

    if (Math.abs(totalDebit - totalCredit) > 0.001) {
      return {
        success: false,
        message: `Unbalanced journal entry: Total Debit ($${totalDebit}) must equal Total Credit ($${totalCredit})`
      };
    }

    for (const line of entry.lines) {
      const acc = ChartOfAccounts.getAccount(line.accountCode);
      if (!acc) {
        return { success: false, message: `Account code ${line.accountCode} not found` };
      }

      if (acc.type === AccountType.ASSET || acc.type === AccountType.EXPENSE) {
        ChartOfAccounts.updateBalance(line.accountCode, line.debit - line.credit);
      } else {
        ChartOfAccounts.updateBalance(line.accountCode, line.credit - line.debit);
      }
    }

    return { success: true, message: `Journal entry ${entry.id} posted successfully` };
  }
}
