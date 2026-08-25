export class EnterpriseValidators {
  public static isValidEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  }

  public static isValidIban(iban: string): boolean {
    const cleanIban = iban.replace(/\s+/g, "").toUpperCase();
    if (cleanIban.length < 15 || cleanIban.length > 34) return false;
    return /^[A-Z]{2}[0-9]{2}[A-Z0-9]+$/.test(cleanIban);
  }

  public static isValidTaxId(taxId: string): boolean {
    return taxId.trim().length >= 5 && taxId.trim().length <= 20;
  }

  public static isValidTenantSlug(slug: string): boolean {
    return /^[a-z0-9-]+$/.test(slug) && slug.length >= 3 && slug.length <= 50;
  }
}
