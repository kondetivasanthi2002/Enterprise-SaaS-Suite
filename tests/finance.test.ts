import { DoubleEntryLedger } from "../packages/core-domain/finance/double-entry-ledger";

describe("DoubleEntryLedger Accounting Tests", () => {
  it("should accept balanced journal entry where Debit equals Credit", () => {
    const res = DoubleEntryLedger.postJournalEntry({
      id: "entry-101",
      tenantId: "tnt-stark",
      postingDate: new Date().toISOString(),
      description: "Cash Investment",
      lines: [
        { accountCode: "1000", debit: 5000, credit: 0 },
        { accountCode: "3000", debit: 0, credit: 5000 }
      ]
    });
    expect(res.success).toBe(true);
  });

  it("should reject unbalanced journal entry", () => {
    const res = DoubleEntryLedger.postJournalEntry({
      id: "entry-102",
      tenantId: "tnt-stark",
      postingDate: new Date().toISOString(),
      description: "Unbalanced Entry",
      lines: [
        { accountCode: "1000", debit: 5000, credit: 0 },
        { accountCode: "3000", debit: 0, credit: 2000 }
      ]
    });
    expect(res.success).toBe(false);
  });
});
