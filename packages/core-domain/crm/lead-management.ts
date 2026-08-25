export interface Lead {
  id: string;
  companyName: string;
  contactEmail: string;
  employeeCount: number;
  annualRevenue: number;
  interactionsCount: number;
  score: number;
}

export class LeadManagementEngine {
  public static calculateLeadScore(lead: Lead): number {
    let score = 0;

    if (lead.employeeCount > 500) score += 40;
    else if (lead.employeeCount > 100) score += 25;
    else if (lead.employeeCount > 20) score += 10;

    if (lead.annualRevenue > 10000000) score += 35;
    else if (lead.annualRevenue > 1000000) score += 20;

    score += Math.min(lead.interactionsCount * 5, 25);

    return score;
  }
}
