import * as crypto from "crypto";

export class CryptoEngine {
  private static readonly ALGORITHM = "aes-256-gcm";
  private static readonly SECRET_KEY = crypto.scryptSync("enterprise-secret-key-salt", "salt", 32);

  public static encrypt(text: string): { iv: string; encryptedData: string; authTag: string } {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(this.ALGORITHM, this.SECRET_KEY, iv);
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    const authTag = cipher.getAuthTag().toString("hex");
    return { iv: iv.toString("hex"), encryptedData: encrypted, authTag };
  }

  public static decrypt(encryptedData: string, iv: string, authTag: string): string {
    const decipher = crypto.createDecipheriv(this.ALGORITHM, this.SECRET_KEY, Buffer.from(iv, "hex"));
    decipher.setAuthTag(Buffer.from(authTag, "hex"));
    let decrypted = decipher.update(encryptedData, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  }

  public static hashPassword(password: string, salt?: string): { hash: string; salt: string } {
    const s = salt || crypto.randomBytes(16).toString("hex");
    const hash = crypto.pbkdf2Sync(password, s, 10000, 64, "sha512").toString("hex");
    return { hash, salt: s };
  }

  public static verifyPassword(password: string, hash: string, salt: string): boolean {
    const verifyHash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
    return verifyHash === hash;
  }

  public static generateHmac(data: string, secret: string): string {
    return crypto.createHmac("sha256", secret).update(data).digest("hex");
  }

  public static generateUuid(): string {
    return crypto.randomUUID();
  }
}
