export enum TenantStatus {
  PROVISIONING = "PROVISIONING",
  ACTIVE = "ACTIVE",
  SUSPENDED = "SUSPENDED",
  ARCHIVED = "ARCHIVED"
}

export interface TenantConfig {
  maxUsers: number;
  maxStorageGb: number;
  apiRateLimitPerMin: number;
  customDomainEnabled: boolean;
}

export interface TenantRecord {
  id: string;
  name: string;
  slug: string;
  status: TenantStatus;
  config: TenantConfig;
  createdAt: string;
  updatedAt: string;
}

export class TenantService {
  private static tenants: Map<string, TenantRecord> = new Map();

  public static createTenant(name: string, slug: string, planTier: "STARTER" | "PRO" | "ENTERPRISE"): TenantRecord {
    const config: TenantConfig = {
      maxUsers: planTier === "ENTERPRISE" ? 1000 : planTier === "PRO" ? 100 : 10,
      maxStorageGb: planTier === "ENTERPRISE" ? 1000 : planTier === "PRO" ? 100 : 10,
      apiRateLimitPerMin: planTier === "ENTERPRISE" ? 10000 : planTier === "PRO" ? 2000 : 500,
      customDomainEnabled: planTier === "ENTERPRISE"
    };

    const tenant: TenantRecord = {
      id: `tnt-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      name,
      slug,
      status: TenantStatus.ACTIVE,
      config,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.tenants.set(tenant.id, tenant);
    return tenant;
  }

  public static getTenantById(id: string): TenantRecord | undefined {
    return this.tenants.get(id);
  }

  public static getTenantBySlug(slug: string): TenantRecord | undefined {
    for (const t of this.tenants.values()) {
      if (t.slug === slug) return t;
    }
    return undefined;
  }
}
