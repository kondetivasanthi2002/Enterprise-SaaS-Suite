import { PayrollCalculator } from "../packages/core-domain/hrms/payroll-calculator";

describe("HRMS Payroll Tax Calculation Tests", () => {
  it("should compute net pay after statutory 20% tax deduction", () => {
    const res = PayrollCalculator.calculateNetSalary({
      employeeId: "emp-1",
      baseMonthlySalary: 10000,
      allowances: 1000,
      taxDeductionRate: 20,
      healthInsuranceDeduction: 200,
      retirementContributionRate: 5
    });
    expect(res.grossPay).toBe(11000);
    expect(res.incomeTax).toBe(2200);
    expect(res.netPay).toBe(8050);
  });
});
