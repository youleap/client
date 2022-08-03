import { TableResponseDto } from '../dtos/base.dto';

export type BaseId = `base_${string}`;
export type TableId = `table_${string}`;
export type ColumnName = string;
export interface TablesByBase {
  tables: Array<TableResponseDto>;
  id: BaseId;
  name: string;
}
