-- Initial Migration: Schema Creation for Enterprise & SaaS Platform

CREATE TABLE "Tenant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL UNIQUE,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "maxUsers" INTEGER NOT NULL DEFAULT 10,
    "maxStorageGb" INTEGER NOT NULL DEFAULT 10,
    "apiRateLimitPerMin" INTEGER NOT NULL DEFAULT 1000,
    "customDomainEnabled" BOOLEAN NOT NULL DEFAULT FALSE,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tenantId" TEXT NOT NULL REFERENCES "Tenant"("id") ON DELETE CASCADE,
    "email" TEXT NOT NULL UNIQUE,
    "passwordHash" TEXT NOT NULL,
    "passwordSalt" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "roles" TEXT[] NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT TRUE,
    "isMfaEnabled" BOOLEAN NOT NULL DEFAULT FALSE,
    "mfaSecret" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

CREATE INDEX "idx_user_tenant" ON "User"("tenantId");
CREATE INDEX "idx_user_email" ON "User"("email");
