import * as jwt from "jsonwebtoken";

export interface JwtPayload {
  userId: string;
  tenantId: string;
  email: string;
  roles: string[];
  permissions: string[];
  iss: string;
  aud: string;
  iat?: number;
  exp?: number;
}

export class JwtService {
  private static readonly SECRET_KEY = process.env.JWT_SECRET || "enterprise-super-secret-key-2026";
  private static readonly ISSUER = "enterprise-saas-api";
  private static readonly AUDIENCE = "enterprise-saas-clients";

  public static signToken(payload: Omit<JwtPayload, "iss" | "aud">, expiresInSeconds: number = 3600): string {
    const fullPayload: JwtPayload = {
      ...payload,
      iss: this.ISSUER,
      aud: this.AUDIENCE
    };
    return jwt.sign(fullPayload, this.SECRET_KEY, { expiresIn: expiresInSeconds });
  }

  public static verifyToken(token: string): JwtPayload {
    try {
      const decoded = jwt.verify(token, this.SECRET_KEY, {
        issuer: this.ISSUER,
        audience: this.AUDIENCE
      }) as JwtPayload;
      return decoded;
    } catch (error) {
      throw new Error("Invalid or expired JWT token");
    }
  }

  public static decodeUnverified(token: string): JwtPayload | null {
    return jwt.decode(token) as JwtPayload | null;
  }
}
