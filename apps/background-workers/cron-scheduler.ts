import { EnterpriseLogger } from "../../packages/shared-utils/logger";

export class CronScheduler {
  private logger = EnterpriseLogger.getInstance();

  public startRecurringJobs(): void {
    this.logger.info("CronScheduler", "Starting Enterprise Background Cron Workers...");
    setInterval(() => {
      this.logger.info("CronScheduler", "Running daily billing renewal worker cycle...");
    }, 60000);
  }
}
