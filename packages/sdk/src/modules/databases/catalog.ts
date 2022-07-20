import { FurnitureDelegate } from './tables/furniture';

export class CatalogDelegate {
  get furniture() {
    return new FurnitureDelegate();
  }
}
