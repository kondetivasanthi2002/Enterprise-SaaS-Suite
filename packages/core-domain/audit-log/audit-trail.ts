import { CryptoEngine } from "../../shared-utils/crypto";

export interface AuditRecord {
  id: string;
  timestamp: string;
  tenantId: string;
  actorUserId: string;
  action: string;
  resource: string;
  previousHash: string;
  currentHash: string;
}

export class AuditTrailEngine {
  private static lastHash: string = "GENESIS_HASH_00000000000000000000000000000000";

  public static logAction(tenantId: string, actorUserId: string, action: string, resource: string): AuditRecord {
    const timestamp = new Date().toISOString();
    const payload = `${timestamp}:${tenantId}:${actorUserId}:${action}:${resource}:${this.lastHash}`;
    const currentHash = CryptoEngine.generateHmac(payload, "audit-secret-key");

    const record: AuditRecord = {
      id: CryptoEngine.generateUuid(),
      timestamp,
      tenantId,
      actorUserId,
      action,
      resource,
      previousHash: this.lastHash,
      currentHash
    };

    this.lastHash = currentHash;
    return record;
  }
}
