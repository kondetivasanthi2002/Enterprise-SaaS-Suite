export enum Permission {
  TENANT_CREATE = "tenant:create",
  TENANT_READ = "tenant:read",
  TENANT_UPDATE = "tenant:update",
  TENANT_DELETE = "tenant:delete",
  FINANCE_READ = "finance:read",
  FINANCE_POST_JOURNAL = "finance:post_journal",
  FINANCE_CLOSE_PERIOD = "finance:close_period",
  FINANCE_EXPORT_REPORT = "finance:export_report",
  BILLING_READ = "billing:read",
  BILLING_MANAGE_PLAN = "billing:manage_plan",
  BILLING_DOWNLOAD_INVOICE = "billing:download_invoice",
  HRMS_READ_EMPLOYEES = "hrms:read_employees",
  HRMS_MANAGE_PAYROLL = "hrms:manage_payroll",
  HRMS_APPROVE_LEAVE = "hrms:approve_leave",
  CRM_READ_LEADS = "crm:read_leads",
  CRM_MANAGE_DEALS = "crm:manage_deals",
  CRM_EXPORT_CONTACTS = "crm:export_contacts",
  INVENTORY_READ = "inventory:read",
  INVENTORY_ADJUST_STOCK = "inventory:adjust_stock",
  INVENTORY_PURCHASE_ORDER = "inventory:purchase_order",
  AUDIT_READ = "audit:read",
  AUDIT_EXPORT = "audit:export"
}

export enum Role {
  SUPER_ADMIN = "SUPER_ADMIN",
  TENANT_ADMIN = "TENANT_ADMIN",
  FINANCE_MANAGER = "FINANCE_MANAGER",
  HR_DIRECTOR = "HR_DIRECTOR",
  SALES_MANAGER = "SALES_MANAGER",
  INVENTORY_CONTROLLER = "INVENTORY_CONTROLLER",
  AUDITOR = "AUDITOR",
  STAFF_USER = "STAFF_USER"
}

export class RbacMatrix {
  private static readonly ROLE_PERMISSIONS: Record<Role, Permission[]> = {
    [Role.SUPER_ADMIN]: Object.values(Permission),
    [Role.TENANT_ADMIN]: [
      Permission.TENANT_READ, Permission.TENANT_UPDATE,
      Permission.FINANCE_READ, Permission.FINANCE_POST_JOURNAL, Permission.FINANCE_EXPORT_REPORT,
      Permission.BILLING_READ, Permission.BILLING_MANAGE_PLAN, Permission.BILLING_DOWNLOAD_INVOICE,
      Permission.HRMS_READ_EMPLOYEES, Permission.HRMS_MANAGE_PAYROLL, Permission.HRMS_APPROVE_LEAVE,
      Permission.CRM_READ_LEADS, Permission.CRM_MANAGE_DEALS, Permission.CRM_EXPORT_CONTACTS,
      Permission.INVENTORY_READ, Permission.INVENTORY_ADJUST_STOCK, Permission.INVENTORY_PURCHASE_ORDER,
      Permission.AUDIT_READ
    ],
    [Role.FINANCE_MANAGER]: [
      Permission.FINANCE_READ, Permission.FINANCE_POST_JOURNAL, Permission.FINANCE_CLOSE_PERIOD, Permission.FINANCE_EXPORT_REPORT,
      Permission.BILLING_READ, Permission.BILLING_DOWNLOAD_INVOICE
    ],
    [Role.HR_DIRECTOR]: [
      Permission.HRMS_READ_EMPLOYEES, Permission.HRMS_MANAGE_PAYROLL, Permission.HRMS_APPROVE_LEAVE
    ],
    [Role.SALES_MANAGER]: [
      Permission.CRM_READ_LEADS, Permission.CRM_MANAGE_DEALS, Permission.CRM_EXPORT_CONTACTS
    ],
    [Role.INVENTORY_CONTROLLER]: [
      Permission.INVENTORY_READ, Permission.INVENTORY_ADJUST_STOCK, Permission.INVENTORY_PURCHASE_ORDER
    ],
    [Role.AUDITOR]: [
      Permission.AUDIT_READ, Permission.AUDIT_EXPORT, Permission.FINANCE_READ, Permission.BILLING_READ
    ],
    [Role.STAFF_USER]: [
      Permission.HRMS_READ_EMPLOYEES, Permission.CRM_READ_LEADS, Permission.INVENTORY_READ
    ]
  };

  public static hasPermission(role: Role, permission: Permission): boolean {
    const permissions = this.ROLE_PERMISSIONS[role] || [];
    return permissions.includes(permission);
  }

  public static getPermissionsForRoles(roles: Role[]): Permission[] {
    const permSet = new Set<Permission>();
    for (const role of roles) {
      const perms = this.ROLE_PERMISSIONS[role] || [];
      perms.forEach(p => permSet.add(p));
    }
    return Array.from(permSet);
  }
}
