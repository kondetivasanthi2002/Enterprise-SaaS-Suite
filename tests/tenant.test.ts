import { QuotaEnforcer } from "../packages/core-domain/tenant-mgmt/quota-enforcer";
import { TenantService } from "../packages/core-domain/tenant-mgmt/tenant-service";

describe("Tenant Quota Enforcer Tests", () => {
  it("should reject user creation when tenant max seats reached", () => {
    const tenant = TenantService.createTenant("Test Corp", "test-corp", "STARTER");
    const check = QuotaEnforcer.checkUserSeatQuota(tenant, 10);
    expect(check.allowed).toBe(false);
  });
});
