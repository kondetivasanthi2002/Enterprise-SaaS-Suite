import { Permission, Role } from "./rbac-matrix";

export interface EvaluationContext {
  userId: string;
  tenantId: string;
  roles: Role[];
  requestIp: string;
  requestTime: Date;
  resourceOwnerId?: string;
  departmentId?: string;
  isMfaVerified: boolean;
}

export class AbacEngine {
  public static evaluate(
    permission: Permission,
    context: EvaluationContext
  ): { allowed: boolean; reason: string } {
    const sensitivePermissions = [
      Permission.FINANCE_CLOSE_PERIOD,
      Permission.FINANCE_POST_JOURNAL,
      Permission.HRMS_MANAGE_PAYROLL,
      Permission.TENANT_DELETE,
      Permission.AUDIT_EXPORT
    ];

    if (sensitivePermissions.includes(permission) && !context.isMfaVerified) {
      return { allowed: false, reason: "Multi-Factor Authentication (MFA) is required for sensitive operation" };
    }

    const isSuperOrAdmin = context.roles.includes(Role.SUPER_ADMIN) || context.roles.includes(Role.TENANT_ADMIN);
    if (!isSuperOrAdmin && context.resourceOwnerId && context.resourceOwnerId !== context.userId) {
      return { allowed: false, reason: "Access denied: Resource belongs to another user" };
    }

    if (context.roles.includes(Role.STAFF_USER) && !isSuperOrAdmin) {
      const hour = context.requestTime.getHours();
      if (hour < 6 || hour > 22) {
        return { allowed: false, reason: "Access denied outside of enterprise operational window (06:00 - 22:00)" };
      }
    }

    return { allowed: true, reason: "Access granted by ABAC engine policy" };
  }
}

export class AbacSecurityPolicyEnhancement {
  public static checkIpWhitelist(requestIp: string, allowedIps: string[]): boolean {
    if (allowedIps.length === 0) return true;
    return allowedIps.includes(requestIp);
  }

  public static checkSessionTimeout(lastActiveTime: Date, timeoutMinutes: number = 30): boolean {
    const diffMs = new Date().getTime() - lastActiveTime.getTime();
    return diffMs <= timeoutMinutes * 60 * 1000;
  }
}
