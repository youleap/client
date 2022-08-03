import { CatalogDelegate } from './catalog';

export class DatabaseDelegate {
  
  get catalog(): CatalogDelegate {
    return new CatalogDelegate();
  }
}
