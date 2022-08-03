import { FurnitureDelegate } from './tables/furniture';

export class CatalogDelegate {
  private furnitureId = 'table_cvxhqztl5uxczxx';

  get furniture() {
    return new FurnitureDelegate(this.furnitureId);
  }
}
