import { FurnitureDelegate } from './tables/furniture';

export class CatalogDelegate {
  private baseId = 'base_cvxhqztl5uxczxx';

  public furniture: FurnitureDelegate;

  constructor(accessToken?: string) {
    this.furniture = new FurnitureDelegate(accessToken);
  }
}
