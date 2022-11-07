import {
  BoolFilter,
  Enumerable,
  IntFilter,
  StringFilter,
  StringNullableListFilter,
  TrueKeys,
  SortOrder,
  XOR,
  StringFieldUpdateOperationsInput,
  Merge,
  BoolFieldUpdateOperationsInput,
  IntFieldUpdateOperationsInput,
} from './common';

/**
 * Model Furniture
 *
 */
export type Furniture = {
  id: string;
  name: string;
  type: FurnitureTypes;
  images: string[];
  vendor: string;
  inStock: boolean;
  unitCost: number;
  idList: number[]
  jsonItem: unknown;
};

/**
 * Enums
 * This is for the "select" or "multiselect" column types
 */

const FurnitureTypes = {
  Bookshelf: 'bookshelf',
  Chairs: 'chair',
  Lighting: 'lighting',
  Beds: 'beds',
  Rugs: 'rugs',
  Sofas: 'sofas',
  Tables: 'tables',
} as const;

export type FurnitureTypes = typeof FurnitureTypes[keyof typeof FurnitureTypes];

/**
 * Furniture: findUnique
 */
export type FurnitureFindUniqueArgs = {
  select?: FurnitureSelect | null;
  where: FurnitureWhereUniqueInput;
};

/**
 * Furniture findMany
 */
export type FurnitureFindManyArgs = {
  select?: FurnitureSelect | null;
  where?: FurnitureWhereInput;
  orderBy?: FurnitureOrderByWithRelationInput;
  cursor?: FurnitureWhereUniqueInput;
  take?: number;
  skip?: number;
};

/**
 * Furniture: findFirst
 */
export type FurnitureFindFirstArgs = {
  select?: FurnitureSelect | null;
  where?: FurnitureWhereInput;
  skip?: number;
};

/**
 * Furniture create
 */
export type FurnitureCreateArgs = {
  select?: FurnitureSelect | null;
  data: XOR<FurnitureCreateInput, FurnitureUncheckedCreateInput>;
};

/**
 * Furniture createMany
 */
export type FurnitureCreateManyArgs = {
  data: Enumerable<FurnitureCreateManyInput>;
};

/**
 * Furniture update
 */
export type FurnitureUpdateArgs = {
  select?: FurnitureSelect | null;
  data: XOR<FurnitureUpdateInput, FurnitureUncheckedUpdateInput>;
  where: FurnitureWhereUniqueInput;
};

/**
 * Furniture updateMany
 */
export type FurnitureUpdateManyArgs = {
  data: XOR<FurnitureUpdateManyMutationInput, FurnitureUncheckedUpdateManyInput>;
  where?: FurnitureWhereInput;
};

/**
 * Furniture upsert
 */
export type FurnitureUpsertArgs = {
  select?: FurnitureSelect | null;
  where: FurnitureWhereUniqueInput;
  create: XOR<FurnitureCreateInput, FurnitureUncheckedCreateInput>;
  update: XOR<FurnitureUpdateInput, FurnitureUncheckedUpdateInput>;
};

/**
 * Furniture delete
 */
export type FurnitureDeleteArgs = {
  select?: FurnitureSelect | null;
  where: FurnitureWhereInput;
};

/**
 * Furniture deleteMany
 */
export type FurnitureDeleteManyArgs = {
  where?: FurnitureWhereInput;
};

export type FurnitureCreateManyInput = {
  id?: string;
  name: string;
  type: FurnitureTypes;
  images?: FurnitureCreateImagesInput | Enumerable<string>;
  vendor: string;
  inStock: boolean;
  unitCost: number;
};

export type FurnitureUpdateInput = {
  name?: StringFieldUpdateOperationsInput | string;
  type?: EnumFurnitureTypesFieldUpdateOperationsInput | FurnitureTypes;
  images?: FurnitureUpdateImagesInput | Enumerable<string>;
  vendor?: StringFieldUpdateOperationsInput | string;
  inStock?: BoolFieldUpdateOperationsInput | boolean;
  unitCost?: IntFieldUpdateOperationsInput | number;
};

export type FurnitureUncheckedUpdateInput = {
  name?: StringFieldUpdateOperationsInput | string;
  type?: EnumFurnitureTypesFieldUpdateOperationsInput | FurnitureTypes;
  images?: FurnitureUpdateImagesInput | Enumerable<string>;
  vendor?: StringFieldUpdateOperationsInput | string;
  inStock?: BoolFieldUpdateOperationsInput | boolean;
  unitCost?: IntFieldUpdateOperationsInput | number;
};

export type FurnitureUpdateManyMutationInput = {
  name?: StringFieldUpdateOperationsInput | string;
  type?: EnumFurnitureTypesFieldUpdateOperationsInput | FurnitureTypes;
  images?: FurnitureUpdateImagesInput | Enumerable<string>;
  vendor?: StringFieldUpdateOperationsInput | string;
  inStock?: BoolFieldUpdateOperationsInput | boolean;
  unitCost?: IntFieldUpdateOperationsInput | number;
};

export type FurnitureUncheckedUpdateManyInput = {
  name?: StringFieldUpdateOperationsInput | string;
  type?: EnumFurnitureTypesFieldUpdateOperationsInput | FurnitureTypes;
  images?: FurnitureUpdateImagesInput | Enumerable<string>;
  vendor?: StringFieldUpdateOperationsInput | string;
  inStock?: BoolFieldUpdateOperationsInput | boolean;
  unitCost?: IntFieldUpdateOperationsInput | number;
};

export type FurnitureCreateInput = {
  id?: string;
  name: string;
  type: FurnitureTypes;
  images?: FurnitureCreateImagesInput | Enumerable<string>;
  vendor: string;
  inStock: boolean;
  unitCost: number;
};

export type FurnitureCreateImagesInput = {
  set: Enumerable<string>;
};

export type FurnitureUncheckedCreateInput = {
  id?: string;
  name: string;
  type: FurnitureTypes;
  images?: FurnitureCreateImagesInput | Enumerable<string>;
  vendor: string;
  inStock: boolean;
  unitCost: number;
};

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

export type FurnitureSelect = {
  id?: boolean;
  name?: boolean;
  type?: boolean;
  images?: boolean;
  vendor?: boolean;
  inStock?: boolean;
  unitCost?: boolean;
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

export type EnumFurnitureTypesFieldUpdateOperationsInput = {
  set?: FurnitureTypes;
};

export type FurnitureUpdateImagesInput = {
  set?: Enumerable<string>;
  push?: string | Enumerable<string>;
};
