import { FinancialMath } from "../../shared-utils/math-finance";

export interface SubscriptionPlan {
  id: string;
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  features: string[];
}

export class SubscriptionEngine {
  private static plans: Map<string, SubscriptionPlan> = new Map([
    ["STARTER", { id: "STARTER", name: "Starter Tier", monthlyPrice: 49.00, annualPrice: 490.00, features: ["Up to 10 Users", "10GB Storage"] }],
    ["PRO", { id: "PRO", name: "Professional Tier", monthlyPrice: 199.00, annualPrice: 1990.00, features: ["Up to 100 Users", "100GB Storage", "Advanced Analytics"] }],
    ["ENTERPRISE", { id: "ENTERPRISE", name: "Enterprise Suite", monthlyPrice: 899.00, annualPrice: 8990.00, features: ["Unlimited Users", "1TB Storage", "Custom SLA", "Dedicated Account Manager"] }]
  ]);

  public static calculateUpgradeProration(
    currentPlanId: string,
    newPlanId: string,
    daysRemainingInMonth: number,
    totalDaysInMonth: number = 30
  ): { proratedCharge: number; creditUnused: number; netAmountDue: number } {
    const currentPlan = this.plans.get(currentPlanId);
    const newPlan = this.plans.get(newPlanId);

    if (!currentPlan || !newPlan) {
      throw new Error("Invalid plan specified");
    }

    const creditUnused = FinancialMath.calculateProratedAmount(currentPlan.monthlyPrice, daysRemainingInMonth, totalDaysInMonth);
    const proratedCharge = FinancialMath.calculateProratedAmount(newPlan.monthlyPrice, daysRemainingInMonth, totalDaysInMonth);
    const netAmountDue = FinancialMath.roundCurrency(proratedCharge - creditUnused);

    return { proratedCharge, creditUnused, netAmountDue };
  }
}
