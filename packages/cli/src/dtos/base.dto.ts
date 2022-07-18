import { BaseId, ColumnName, TableId } from '../interfaces/base.interface';

export enum ColumnTypeEnum {
  Text = 'Text',
  Number = 'Number',
  Date = 'Date',
  Boolean = 'Boolean',
}

export interface BaseResponseDto {
  id: BaseId;
  name: string;
}

export interface TableResponseDto {
  id: TableId;
  name: string;
  columns: Array<Column>;
}

export interface Column {
  name: ColumnName;
  type: ColumnTypeEnum;
}
