import { FinancialMath } from "../../shared-utils/math-finance";

export interface EmployeeSalaryProfile {
  employeeId: string;
  baseMonthlySalary: number;
  allowances: number;
  taxDeductionRate: number;
  healthInsuranceDeduction: number;
  retirementContributionRate: number;
}

export interface PayrollCalculationResult {
  employeeId: string;
  grossPay: number;
  incomeTax: number;
  retirementContribution: number;
  healthInsurance: number;
  totalDeductions: number;
  netPay: number;
}

export class PayrollCalculator {
  public static calculateNetSalary(profile: EmployeeSalaryProfile): PayrollCalculationResult {
    const grossPay = profile.baseMonthlySalary + profile.allowances;
    const incomeTax = FinancialMath.calculateTaxAmount(grossPay, profile.taxDeductionRate);
    const retirementContribution = FinancialMath.calculateTaxAmount(grossPay, profile.retirementContributionRate);
    const healthInsurance = profile.healthInsuranceDeduction;

    const totalDeductions = FinancialMath.roundCurrency(incomeTax + retirementContribution + healthInsurance);
    const netPay = FinancialMath.roundCurrency(grossPay - totalDeductions);

    return {
      employeeId: profile.employeeId,
      grossPay,
      incomeTax,
      retirementContribution,
      healthInsurance,
      totalDeductions,
      netPay
    };
  }
}

export class PayrollBonusEngine {
  public static calculatePerformanceBonus(baseSalary: number, rating: "EXCEEDS" | "MEETS" | "NEEDS_IMPROVEMENT"): number {
    if (rating === "EXCEEDS") return baseSalary * 0.20;
    if (rating === "MEETS") return baseSalary * 0.08;
    return 0;
  }
}
