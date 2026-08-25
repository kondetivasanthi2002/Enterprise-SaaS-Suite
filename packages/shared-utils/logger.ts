export enum LogLevel {
  DEBUG = "DEBUG",
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
  FATAL = "FATAL"
}

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  traceId: string;
  tenantId?: string;
  userId?: string;
  module: string;
  message: string;
  context?: Record<string, unknown>;
}

export class EnterpriseLogger {
  private static instance: EnterpriseLogger;
  private traceId: string = "sys-init";

  private constructor() {}

  public static getInstance(): EnterpriseLogger {
    if (!EnterpriseLogger.instance) {
      EnterpriseLogger.instance = new EnterpriseLogger();
    }
    return EnterpriseLogger.instance;
  }

  public setTraceId(id: string): void {
    this.traceId = id;
  }

  public log(level: LogLevel, moduleName: string, message: string, context?: Record<string, unknown>, tenantId?: string, userId?: string): LogEntry {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      traceId: this.traceId,
      tenantId,
      userId,
      module: moduleName,
      message,
      context
    };
    console.log(JSON.stringify(entry));
    return entry;
  }

  public info(moduleName: string, message: string, context?: Record<string, unknown>, tenantId?: string): LogEntry {
    return this.log(LogLevel.INFO, moduleName, message, context, tenantId);
  }

  public error(moduleName: string, message: string, context?: Record<string, unknown>, tenantId?: string): LogEntry {
    return this.log(LogLevel.ERROR, moduleName, message, context, tenantId);
  }

  public warn(moduleName: string, message: string, context?: Record<string, unknown>, tenantId?: string): LogEntry {
    return this.log(LogLevel.WARN, moduleName, message, context, tenantId);
  }

  public debug(moduleName: string, message: string, context?: Record<string, unknown>, tenantId?: string): LogEntry {
    return this.log(LogLevel.DEBUG, moduleName, message, context, tenantId);
  }
}
