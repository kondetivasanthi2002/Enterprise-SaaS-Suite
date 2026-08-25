import { TenantRecord } from "./tenant-service";

export class QuotaEnforcer {
  public static checkUserSeatQuota(tenant: TenantRecord, currentActiveUsers: number): { allowed: boolean; message: string } {
    if (currentActiveUsers >= tenant.config.maxUsers) {
      return {
        allowed: false,
        message: `Tenant user limit reached (${currentActiveUsers}/${tenant.config.maxUsers}). Please upgrade plan.`
      };
    }
    return { allowed: true, message: "Within quota" };
  }

  public static checkStorageQuota(tenant: TenantRecord, currentStorageGb: number): { allowed: boolean; message: string } {
    if (currentStorageGb >= tenant.config.maxStorageGb) {
      return {
        allowed: false,
        message: `Storage quota exceeded (${currentStorageGb}GB/${tenant.config.maxStorageGb}GB).`
      };
    }
    return { allowed: true, message: "Storage quota OK" };
  }
}
