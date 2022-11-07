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
  Number = 'Number',
  Date = 'Date',
  JSON = 'JSON',
  Array = 'Array',
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

export type Column = IColumnTypes & {
  name: ColumnName;
  displayName: string;
  required: boolean;
  unique: boolean;
  default: unknown | null;
};

type IColumnTypes =
  | IArrayColumn
  | IAttachmentColumn
  | ICheckboxColumn
  | ICreatedTimeColumn
  | ICurrencyColumn
  | IDateColumn
  | IEmailColumn
  | IJSONColumn
  | ILongTextColumn
  | IMultipleSelectColumn
  | INumberColumn
  | IPercentColumn
  | IPhoneNumberColumn
  | ISingleLineTextColumn
  | ISingleSelectColumn
  | IURLColumn;

export interface ISingleLineTextColumn {
  type: ColumnType.SingleLineText;
}

export interface ILongTextColumn {
  type: ColumnType.LongText;
}

export interface IAttachmentColumn {
  type: ColumnType.Attachment;
}

export interface ICheckboxColumn {
  type: ColumnType.Checkbox;
}
export interface IPhoneNumberColumn {
  type: ColumnType.PhoneNumber;
}
export interface IEmailColumn {
  type: ColumnType.Email;
}
export interface IURLColumn {
  type: ColumnType.URL;
}
export interface ICurrencyColumn {
  type: ColumnType.Currency;
  currencySymbol: CurrencySymbol;
  precision: PrecisionOption;
}
export interface IPercentColumn {
  type: ColumnType.Percent;
  precision: PrecisionOption;
}

export interface ICreatedTimeColumn {
  type: ColumnType.CreatedTime;
}
export interface IDateColumn {
  type: ColumnType.Date;
}
export interface INumberColumn {
  type: ColumnType.Number;
}
export interface IJSONColumn {
  type: ColumnType.JSON;
}
export interface IArrayColumn {
  type: ColumnType.Array;
  arrayPrimitive: ArrayPrimitive;
}

export interface IMultipleSelectColumn {
  type: ColumnType.MultipleSelect;
  options: Array<ISelectOptions>;
}

export interface ISingleSelectColumn {
  type: ColumnType.SingleSelect;
  options: Array<ISelectOptions>;
}

export interface ISelectOptions {
  id: string;
  name: string;
  color: string;
}

export enum ArrayPrimitive {
  String = 'string',
  Number = 'number',
  Boolean = 'boolean',
}

export enum CurrencySymbol {
  Dollar = '$',
  Euro = '€',
  Pound = '£',
  Yen = '¥',
  Franc = '₣',
  Rupee = '₹',
  Dinar = 'د.ك',
  Dirham = 'د.إ',
  Riyal = '﷼',
  Mark = '₻',
  Rouble = '₽',
  Lari = '₾',
  Lira = '₺',
  Manat = '₼',
  Tenge = '₸',
  Hryvnia = '₴',
  Spesmilo = '₷',
  Baht = '฿',
  Won = '원',
  Dong = '₫',
  Tugrik = '₮',
  Drachma = '₯',
  Peso = '₱',
  Austral = '₳',
  Cedi = '₵',
  Guarani = '₲',
  Sheqel = '₪',
  Penny = '₰',
}

export type PrimitiveTypes =
  | 'string'
  | 'number'
  | 'boolean'
  | 'Array<string>'
  | 'Array<number>'
  | 'Array<boolean>'
  | 'unknown';

export type PrecisionOption = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
