import { RbacMatrix, Role, Permission } from "../packages/core-domain/auth-rbac/rbac-matrix";
import { AbacEngine } from "../packages/core-domain/auth-rbac/abac-engine";

describe("RBAC & ABAC Access Control Tests", () => {
  it("should grant full access to SUPER_ADMIN", () => {
    const allowed = RbacMatrix.hasPermission(Role.SUPER_ADMIN, Permission.TENANT_DELETE);
    expect(allowed).toBe(true);
  });

  it("should deny staff user sensitive tenant delete permission", () => {
    const allowed = RbacMatrix.hasPermission(Role.STAFF_USER, Permission.TENANT_DELETE);
    expect(allowed).toBe(false);
  });

  it("should enforce MFA requirement for sensitive finance actions", () => {
    const evalRes = AbacEngine.evaluate(Permission.FINANCE_CLOSE_PERIOD, {
      userId: "usr-1",
      tenantId: "tnt-1",
      roles: [Role.FINANCE_MANAGER],
      requestIp: "127.0.0.1",
      requestTime: new Date(),
      isMfaVerified: false
    });
    expect(evalRes.allowed).toBe(false);
  });
});
