import { BatchPayload, CheckSelect, GetScalarType, SelectSubset, Subset, _Record } from '../../../types/common';
import {
  Furniture,
  FurnitureCountAggregateOutputType,
  FurnitureCountArgs,
  FurnitureCreateArgs,
  FurnitureCreateManyArgs,
  FurnitureDeleteArgs,
  FurnitureDeleteManyArgs,
  FurnitureFindFirstArgs,
  FurnitureFindManyArgs,
  FurnitureFindUniqueArgs,
  FurnitureGetPayload,
  FurnitureUpdateArgs,
  FurnitureUpdateManyArgs,
  FurnitureUpsertArgs,
} from '../../../types/furniture';

export class FurnitureDelegate {
  findUnique<T extends FurnitureFindUniqueArgs>(
    args?: SelectSubset<T, FurnitureFindUniqueArgs>,
  ): CheckSelect<T, Promise<Furniture>, Promise<FurnitureGetPayload<T>>> {
    //TODO: API TO GET UNIQUE
    return {} as any;
  }

  findFirst<T extends FurnitureFindFirstArgs>(
    args?: SelectSubset<T, FurnitureFindFirstArgs>,
  ): CheckSelect<T, Promise<Furniture>, Promise<FurnitureGetPayload<T>>> {
    return {} as any;
  }

  findMany<T extends FurnitureFindManyArgs>(
    args?: SelectSubset<T, FurnitureFindManyArgs>,
  ): CheckSelect<T, Promise<Array<Furniture>>, Promise<Array<FurnitureGetPayload<T>>>> {
    return {} as any;
  }

  create<T extends FurnitureCreateArgs>(
    args?: SelectSubset<T, FurnitureCreateArgs>,
  ): CheckSelect<T, Promise<Furniture>, Promise<FurnitureGetPayload<T>>> {
    return {} as any;
  }

  createMany<T extends FurnitureCreateManyArgs>(
    args?: SelectSubset<T, FurnitureCreateManyArgs>,
  ): Promise<BatchPayload> {
    return {} as any;
  }

  delete<T extends FurnitureDeleteArgs>(
    args?: SelectSubset<T, FurnitureDeleteArgs>,
  ): CheckSelect<T, Promise<Furniture>, Promise<FurnitureGetPayload<T>>> {
    return {} as any;
  }

  deleteMany<T extends FurnitureDeleteManyArgs>(
    args?: SelectSubset<T, FurnitureDeleteManyArgs>,
  ): Promise<BatchPayload> {
    return {} as any;
  }

  update<T extends FurnitureUpdateArgs>(
    args?: SelectSubset<T, FurnitureUpdateArgs>,
  ): CheckSelect<T, Promise<Furniture>, Promise<FurnitureGetPayload<T>>> {
    return {} as any;
  }

  updateMany<T extends FurnitureUpdateManyArgs>(
    args?: SelectSubset<T, FurnitureUpdateManyArgs>,
  ): Promise<BatchPayload> {
    return {} as any;
  }

  upsert<T extends FurnitureUpsertArgs>(
    args?: SelectSubset<T, FurnitureUpsertArgs>,
  ): CheckSelect<T, Promise<Furniture>, Promise<FurnitureGetPayload<T>>> {
    return {} as any;
  }

  findUniqueOrThrow<T extends FurnitureFindUniqueArgs>(
    args?: SelectSubset<T, FurnitureFindUniqueArgs>,
  ): CheckSelect<T, Promise<Furniture>, Promise<FurnitureGetPayload<T>>> {
    return {} as any;
  }

  findFirstOrThrow<T extends FurnitureFindFirstArgs>(
    args?: SelectSubset<T, FurnitureFindFirstArgs>,
  ): CheckSelect<T, Promise<Furniture>, Promise<FurnitureGetPayload<T>>> {
    return {} as any;
  }

  count<T extends FurnitureCountArgs>(
    args?: Subset<T, FurnitureCountArgs>,
  ): Promise<
    T extends _Record<'select', any>
      ? T['select'] extends true
        ? number
        : GetScalarType<T['select'], FurnitureCountAggregateOutputType>
      : number
  > {
    return {} as any;
  }
}
