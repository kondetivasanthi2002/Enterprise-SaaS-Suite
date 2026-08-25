import { AuditTrailEngine } from "../packages/core-domain/audit-log/audit-trail";

describe("Audit Trail Cryptographic Hash Chain Tests", () => {
  it("should chain log hashes sequentially", () => {
    const log1 = AuditTrailEngine.logAction("tnt-1", "user-1", "LOGIN", "AUTH");
    const log2 = AuditTrailEngine.logAction("tnt-1", "user-1", "VIEW", "FINANCE");
    expect(log2.previousHash).toBe(log1.currentHash);
  });
});
