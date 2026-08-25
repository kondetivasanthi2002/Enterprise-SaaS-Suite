export class FinancialMath {
  public static roundCurrency(amount: number, decimals: number = 2): number {
    const factor = Math.pow(10, decimals);
    return Math.round((amount + Number.EPSILON) * factor) / factor;
  }

  public static calculateProratedAmount(monthlyPrice: number, daysUsed: number, totalDaysInMonth: number): number {
    if (totalDaysInMonth <= 0) return 0;
    const dailyRate = monthlyPrice / totalDaysInMonth;
    return this.roundCurrency(dailyRate * daysUsed);
  }

  public static calculateCompoundInterest(principal: number, annualRate: number, compoundingFrequency: number, years: number): number {
    const r = annualRate / 100;
    const n = compoundingFrequency;
    const amount = principal * Math.pow(1 + r / n, n * years);
    return this.roundCurrency(amount);
  }

  public static calculateNetPresentValue(rate: number, cashFlows: number[]): number {
    let npv = 0;
    for (let t = 0; t < cashFlows.length; t++) {
      npv += cashFlows[t] / Math.pow(1 + rate, t);
    }
    return this.roundCurrency(npv);
  }

  public static calculateTaxAmount(grossAmount: number, taxRatePercentage: number): number {
    return this.roundCurrency(grossAmount * (taxRatePercentage / 100));
  }
}
