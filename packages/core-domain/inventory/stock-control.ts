export interface StockItem {
  sku: string;
  name: string;
  quantityOnHand: number;
  reorderPoint: number;
  reorderQuantity: number;
  unitCost: number;
}

export class StockControlEngine {
  public static checkReorderTriggers(items: StockItem[]): { sku: string; needed: boolean; orderQty: number }[] {
    return items.map(item => ({
      sku: item.sku,
      needed: item.quantityOnHand <= item.reorderPoint,
      orderQty: item.quantityOnHand <= item.reorderPoint ? item.reorderQuantity : 0
    }));
  }
}
