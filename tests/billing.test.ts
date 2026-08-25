import { SubscriptionEngine } from "../packages/core-domain/billing/subscription-engine";

describe("Subscription Engine & Proration Tests", () => {
  it("should calculate correct prorated credit for plan upgrade", () => {
    const proration = SubscriptionEngine.calculateUpgradeProration("STARTER", "PRO", 15, 30);
    expect(proration.proratedCharge).toBeGreaterThan(0);
    expect(proration.creditUnused).toBeGreaterThan(0);
    expect(proration.netAmountDue).toBe(proration.proratedCharge - proration.creditUnused);
  });
});
