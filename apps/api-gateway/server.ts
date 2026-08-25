import express, { Request, Response, NextFunction } from "express";
import { EnterpriseLogger } from "../../packages/shared-utils/logger";
import { RbacMatrix, Permission, Role } from "../../packages/core-domain/auth-rbac/rbac-matrix";
import { DoubleEntryLedger } from "../../packages/core-domain/finance/double-entry-ledger";
import { SubscriptionEngine } from "../../packages/core-domain/billing/subscription-engine";

const app = express();
const PORT = process.env.PORT || 4000;
const logger = EnterpriseLogger.getInstance();

app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  const tenantId = (req.headers["x-tenant-id"] as string) || "tnt-default-001";
  (req as any).tenantId = tenantId;
  logger.info("APIGateway", `${req.method} ${req.path}`, { tenantId });
  next();
});

app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "UP", timestamp: new Date().toISOString(), service: "Enterprise API Gateway" });
});

app.post("/api/v1/billing/prorate", (req: Request, res: Response) => {
  try {
    const { currentPlanId, newPlanId, daysRemaining } = req.body;
    const result = SubscriptionEngine.calculateUpgradeProration(currentPlanId, newPlanId, daysRemaining);
    res.json({ success: true, data: result });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
});

app.post("/api/v1/finance/journal", (req: Request, res: Response) => {
  const entry = req.body;
  const result = DoubleEntryLedger.postJournalEntry(entry);
  if (!result.success) {
    return res.status(400).json(result);
  }
  res.json(result);
});

if (require.main === module) {
  app.listen(PORT, () => {
    logger.info("APIGateway", `Enterprise API Gateway listening on port ${PORT}`);
  });
}

export default app;
