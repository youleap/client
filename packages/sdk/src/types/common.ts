export type SortOrder = 'asc' | 'desc';

export type StringFilter = {
  equals?: string;
  in?: Enumerable<string>;
  notIn?: Enumerable<string>;
  lt?: string;
  lte?: string;
  gt?: string;
  gte?: string;
  contains?: string;
  startsWith?: string;
  endsWith?: string;
  not?: NestedStringFilter | string;
};
export type NestedStringFilter = {
  equals?: string;
  in?: Enumerable<string>;
  notIn?: Enumerable<string>;
  lt?: string;
  lte?: string;
  gt?: string;
  gte?: string;
  contains?: string;
  startsWith?: string;
  endsWith?: string;
  not?: NestedStringFilter | string;
};

export type SelectSubset<T, U> = {
  [key in keyof T]: key extends keyof U ? T[key] : never;
} & (T extends SelectAndInclude ? 'Please either choose `select` or `include`.' : {});

export type SelectAndInclude = {
  select: any;
  include: any;
};

export type StringNullableListFilter = {
  equals?: Enumerable<string> | null;
  has?: string | null;
  hasEvery?: Enumerable<string>;
  hasSome?: Enumerable<string>;
  isEmpty?: boolean;
};

export type HasSelect = {
  select: any;
};
export type HasInclude = {
  include: any;
};
export type CheckSelect<T, S, U> = T extends SelectAndInclude
  ? 'Please either choose `select` or `include`'
  : T extends HasSelect
  ? U
  : T extends HasInclude
  ? U
  : S;

export type BoolFilter = {
  equals?: boolean;
  not?: NestedBoolFilter | boolean;
};

export type IntFilter = {
  equals?: number;
  in?: Enumerable<number>;
  notIn?: Enumerable<number>;
  lt?: number;
  lte?: number;
  gt?: number;
  gte?: number;
  not?: NestedIntFilter | number;
};

export type NestedIntFilter = {
  equals?: number;
  in?: Enumerable<number>;
  notIn?: Enumerable<number>;
  lt?: number;
  lte?: number;
  gt?: number;
  gte?: number;
  not?: NestedIntFilter | number;
};

export type NestedBoolFilter = {
  equals?: boolean;
  not?: NestedBoolFilter | boolean;
};
export type Enumerable<T> = T | Array<T>;

export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

export type TruthyKeys<T> = {
  [key in keyof T]: T[key] extends false | undefined | null ? never : key;
}[keyof T];

export type TrueKeys<T> = TruthyKeys<Pick<T, RequiredKeys<T>>>;
