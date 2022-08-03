import { TableApiHandler } from '../../../apis/tableApiHandler';
import { BatchPayload, CheckSelect, SelectSubset, _Record } from '../../../types/common';
import {
  Furniture,
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
} from '../../../types/furniture';

export class FurnitureDelegate {
  private tableId = 'table_asdfasdfasdfasdf';
  private tableApiHandler: TableApiHandler;

  constructor(accessToken?: string) {
    this.tableApiHandler = new TableApiHandler(accessToken);
  }

  async findUnique<T extends FurnitureFindUniqueArgs>(
    args?: SelectSubset<T, FurnitureFindUniqueArgs>,
  ): Promise<CheckSelect<T, Furniture, FurnitureGetPayload<T>>> {
    return await this.tableApiHandler.findUniqueQueryApi(this.tableId, args);
  }

  async findUniqueOrThrow<T extends FurnitureFindUniqueArgs>(
    args?: SelectSubset<T, FurnitureFindUniqueArgs>,
  ): Promise<CheckSelect<T, Furniture, FurnitureGetPayload<T>>> {
    const result = await this.tableApiHandler.findUniqueQueryApi<
      SelectSubset<T, FurnitureFindUniqueArgs>,
      CheckSelect<T, Furniture, FurnitureGetPayload<T>>
    >(this.tableId, args);
    if (result != null || result != {}) {
      return result;
    }
    throw new Error('Could not find unique document.');
  }

  async findFirst<T extends FurnitureFindFirstArgs>(
    args?: SelectSubset<T, FurnitureFindFirstArgs>,
  ): Promise<CheckSelect<T, Furniture, FurnitureGetPayload<T>>> {
    return await this.tableApiHandler.findFirstQueryApi(this.tableId, args);
  }

  async findFirstOrThrow<T extends FurnitureFindFirstArgs>(
    args?: SelectSubset<T, FurnitureFindFirstArgs>,
  ): Promise<CheckSelect<T, Furniture, FurnitureGetPayload<T>>> {
    const result = await this.tableApiHandler.findFirstQueryApi<
      SelectSubset<T, FurnitureFindUniqueArgs>,
      CheckSelect<T, Furniture, FurnitureGetPayload<T>>
    >(this.tableId, args);
    if (result != null || result != {}) {
      return result;
    }
    throw new Error('Could not find first document.');
  }

  async findMany<T extends FurnitureFindManyArgs>(
    args?: SelectSubset<T, FurnitureFindManyArgs>,
  ): Promise<CheckSelect<T, Array<Furniture>, Array<FurnitureGetPayload<T>>>> {
    return await this.tableApiHandler.findManyQueryApi(this.tableId, args);
  }

  async create<T extends FurnitureCreateArgs>(
    args?: SelectSubset<T, FurnitureCreateArgs>,
  ): Promise<CheckSelect<T, Furniture, FurnitureGetPayload<T>>> {
    return await this.tableApiHandler.createQueryApi(this.tableId, args);
  }

  async createMany<T extends FurnitureCreateManyArgs>(
    args?: SelectSubset<T, FurnitureCreateManyArgs>,
  ): Promise<BatchPayload> {
    return await this.tableApiHandler.createManyQueryApi(this.tableId, args);
  }

  async delete<T extends FurnitureDeleteArgs>(
    args?: SelectSubset<T, FurnitureDeleteArgs>,
  ): Promise<CheckSelect<T, Furniture, FurnitureGetPayload<T>>> {
    return await this.tableApiHandler.deleteQueryApi(this.tableId, args);
  }

  async deleteMany<T extends FurnitureDeleteManyArgs>(
    args?: SelectSubset<T, FurnitureDeleteManyArgs>,
  ): Promise<BatchPayload> {
    return await this.tableApiHandler.deleteManyQueryApi(this.tableId, args);
  }

  async update<T extends FurnitureUpdateArgs>(
    args?: SelectSubset<T, FurnitureUpdateArgs>,
  ): Promise<CheckSelect<T, Furniture, FurnitureGetPayload<T>>> {
    return await this.tableApiHandler.updateQueryApi(this.tableId, args);
  }

  async updateMany<T extends FurnitureUpdateManyArgs>(
    args?: SelectSubset<T, FurnitureUpdateManyArgs>,
  ): Promise<BatchPayload> {
    return await this.tableApiHandler.updateManyQueryApi(this.tableId, args);
  }
}
