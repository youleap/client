import { BaseId, ColumnName, TableId } from '../interfaces/base.interface';

export enum ColumnType {
  SingleLineText = 'SingleLineText',
  LongText = 'LongText',
  Attachment = 'Attachment',
  Checkbox = 'Checkbox',
  MultipleSelect = 'MultipleSelect',
  SingleSelect = 'SingleSelect',
  PhoneNumber = 'PhoneNumber',
  Email = 'Email',
  URL = 'URL',
  Currency = 'Currency',
  Percent = 'Percent',
  CreatedTime = 'CreatedTime',
  CreatedBy = 'CreatedBy',
  LastModifiedBy = 'LastModifiedBy',
  Number = 'Number',
  Date = 'Date',
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
  type: ColumnType;
  required: boolean;
  unique: boolean;
  default: unknown | null;
}
