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

export type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

export type XOR<T, U> = T extends object ? (U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : U) : T;

export type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Buffer
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False;

export type Key = string | number | symbol;
export type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
export type AtStrict<O extends object, K extends Key> = O[K & keyof O];
export type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
  1: AtStrict<O, K>;
  0: AtLoose<O, K>;
}[strict];

export type ComputeRaw<A extends any> = A extends Function
  ? A
  : {
      [K in keyof A]: A[K];
    } & {};

export type OptionalFlat<O> = {
  [K in keyof O]?: O[K];
} & {};

export type _Record<K extends keyof any, T> = {
  [P in K]: T;
};

export type _Strict<U, _U = U> = U extends unknown
  ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>>
  : never;

export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
/** End Helper Types for "Merge" **/

export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

/**
  A [[Boolean]]
  */
export type Boolean = True | False;

// /**
// 1
// */
export type True = 1;

/**
  0
  */
export type False = 0;

export type Keys<U extends Union> = U extends unknown ? keyof U : never;

export type Union = any;

export type _Merge<U extends object> = IntersectOf<
  Overwrite<
    U,
    {
      [K in keyof U]-?: At<U, K>;
    }
  >
>;

/** Helper Types for "Merge" **/
export type IntersectOf<U extends Union> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void
  ? I
  : never;

export type Overwrite<O extends object, O1 extends object> = {
  [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
} & {};

export type StringFieldUpdateOperationsInput = {
  set?: string;
};
