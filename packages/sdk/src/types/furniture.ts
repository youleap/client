import {
  BoolFilter,
  Enumerable,
  IntFilter,
  StringFilter,
  StringNullableListFilter,
  TrueKeys,
  SortOrder,
} from './common';

export enum FurnitureTypes {
  Bookshelf = 'Bookshelf',
  Chairs = 'Chairs',
  Lighting = 'Lighting',
  Beds = 'Beds',
  Rugs = 'Rugs',
  Sofas = 'Sofas',
  Tables = 'Tables',
}

export type Furniture = {
  id: string;
  name: string;
  type: FurnitureTypes;
  images: string[];
  vendor: string;
  inStock: boolean;
  unitCost: number;
};

export type FurnitureFindUniqueArgs = {
  select?: FurnitureSelect | null;
  where: FurnitureWhereUniqueInput;
};

export type FurnitureFindManyArgs = {
  select?: FurnitureSelect | null;
  where?: FurnitureWhereInput;
  orderBy?: Enumerable<FurnitureOrderByWithRelationInput>;
  cursor?: FurnitureWhereUniqueInput;
  take?: number;
  skip?: number;
  distinct?: Enumerable<FurnitureScalarFieldEnum>;
};

export enum FurnitureScalarFieldEnum {
  id = 'id',
  name = 'name',
  type = 'type',
  images = 'images',
  vendor = 'vendor',
  inStock = 'inStock',
  unitCost = 'unitCost',
}

export type FurnitureWhereInput = {
  AND?: Enumerable<FurnitureWhereInput>;
  OR?: Enumerable<FurnitureWhereInput>;
  NOT?: Enumerable<FurnitureWhereInput>;
  id?: StringFilter | string;
  name?: StringFilter | string;
  type?: EnumFurnitureTypesFilter | FurnitureTypes;
  images?: StringNullableListFilter;
  vendor?: StringFilter | string;
  inStock?: BoolFilter | boolean;
  unitCost?: IntFilter | number;
};

export type FurnitureOrderByWithRelationInput = {
  id?: SortOrder;
  name?: SortOrder;
  type?: SortOrder;
  images?: SortOrder;
  vendor?: SortOrder;
  inStock?: SortOrder;
  unitCost?: SortOrder;
};

export type FurnitureOrderByWithAggregationInput = {
  id?: SortOrder;
  name?: SortOrder;
  type?: SortOrder;
  images?: SortOrder;
  vendor?: SortOrder;
  inStock?: SortOrder;
  unitCost?: SortOrder;
  _count?: FurnitureCountOrderByAggregateInput;
  _avg?: FurnitureAvgOrderByAggregateInput;
  _max?: FurnitureMaxOrderByAggregateInput;
  _min?: FurnitureMinOrderByAggregateInput;
  _sum?: FurnitureSumOrderByAggregateInput;
};

export type FurnitureSelect = {
  id?: boolean;
  name?: boolean;
  type?: boolean;
  images?: boolean;
  vendor?: boolean;
  inStock?: boolean;
  unitCost?: boolean;
};

export type FurnitureCountOrderByAggregateInput = {
  id?: SortOrder;
  name?: SortOrder;
  type?: SortOrder;
  images?: SortOrder;
  vendor?: SortOrder;
  inStock?: SortOrder;
  unitCost?: SortOrder;
};

export type CountOrderByAggregateInput<T> = {
  [P in keyof T]: SortOrder;
};

export type FurnitureAvgOrderByAggregateInput = {
  unitCost?: SortOrder;
};

export type FurnitureMaxOrderByAggregateInput = {
  id?: SortOrder;
  name?: SortOrder;
  type?: SortOrder;
  vendor?: SortOrder;
  inStock?: SortOrder;
  unitCost?: SortOrder;
};

export type FurnitureMinOrderByAggregateInput = {
  id?: SortOrder;
  name?: SortOrder;
  type?: SortOrder;
  vendor?: SortOrder;
  inStock?: SortOrder;
  unitCost?: SortOrder;
};

export type FurnitureSumOrderByAggregateInput = {
  unitCost?: SortOrder;
};

export type EnumFurnitureTypesFilter = {
  equals?: FurnitureTypes;
  in?: Enumerable<FurnitureTypes>;
  notIn?: Enumerable<FurnitureTypes>;
  not?: NestedEnumFurnitureTypesFilter | FurnitureTypes;
};

export type NestedEnumFurnitureTypesFilter = {
  equals?: FurnitureTypes;
  in?: Enumerable<FurnitureTypes>;
  notIn?: Enumerable<FurnitureTypes>;
  not?: NestedEnumFurnitureTypesFilter | FurnitureTypes;
};

export type FurnitureWhereUniqueInput = {
  id?: string;
};

export type FurnitureArgs = {
  select?: FurnitureSelect | null;
};

export type FurnitureGetPayload<S extends boolean | null | undefined | FurnitureArgs, U = keyof S> = S extends true
  ? Furniture
  : S extends undefined
  ? never
  : S extends FurnitureArgs | FurnitureFindManyArgs
  ? 'include' extends U
    ? Furniture
    : 'select' extends U
    ? {
        [P in TrueKeys<S['select']>]: P extends keyof Furniture ? Furniture[P] : never;
      }
    : Furniture
  : Furniture;
