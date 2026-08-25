import { JwtService } from "../packages/core-domain/auth-rbac/jwt-service";
import { CryptoEngine } from "../packages/shared-utils/crypto";

describe("AuthService Unit & Integration Tests", () => {
  it("should generate valid JWT token with tenant scope", () => {
    const token = JwtService.signToken({
      userId: "usr-101",
      tenantId: "tnt-stark",
      email: "tony@stark.com",
      roles: ["TENANT_ADMIN"],
      permissions: ["tenant:read"]
    });
    expect(token).toBeDefined();
    expect(token.length).toBeGreaterThan(20);
  });

  it("should verify password hash with salt", () => {
    const { hash, salt } = CryptoEngine.hashPassword("SuperSecret123!");
    const isValid = CryptoEngine.verifyPassword("SuperSecret123!", hash, salt);
    expect(isValid).toBe(true);
  });
});
