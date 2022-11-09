import {
  OptionalKind,
  Project,
  PropertySignatureStructure,
  SourceFile,
  VariableDeclarationKind,
  Writers,
} from 'ts-morph';
import { Column, ColumnType, ISelectOptions, PrimitiveTypes, TableResponseDto } from '../../../dtos/base.dto';
import { ColumnName } from '../../../interfaces/base.interface';
import { capitalize } from '../../../utils/string-manipulation.utils';

export function generateTableTypesHandler(
  project: Project,
  generationPath: string,
  tables: Array<TableResponseDto>,
  indexSourceFile: SourceFile,
): void {
  for (const table of tables) {
    indexSourceFile
      .addExportDeclaration({
        moduleSpecifier: `./${table.name}`,
      })
      .toNamespaceExport();

    const tableTypesFile = project.createSourceFile(`${generationPath}/${table.name}.ts`, '', { overwrite: true });

    tableTypesFile.addImportDeclaration({
      namedImports: [
        'Enumerable',
        'BoolFilter',
        'IntFilter',
        'StringFilter',
        'StringNullableListFilter',
        'BoolNullableListFilter',
        'IntNullableListFilter',
        'StringListFilter',
        'BoolListFilter',
        'IntListFilter',
        'TrueKeys',
        'SortOrder',
        'XOR',
        'Merge',
        'StringFieldUpdateOperationsInput',
        'StringListFieldUpdateOperationsInput',
        'BoolFieldUpdateOperationsInput',
        'BoolListFieldUpdateOperationsInput',
        'IntFieldUpdateOperationsInput',
        'IntListFieldUpdateOperationsInput',
        'StringFieldNullableUpdateOperationsInput',
        'StringListFieldNullableUpdateOperationsInput',
        'BoolFieldNullableUpdateOperationsInput',
        'BoolListFieldNullableUpdateOperationsInput',
        'IntFieldNullableUpdateOperationsInput',
        'IntListFieldNullableUpdateOperationsInput',
      ],
      moduleSpecifier: './common',
    });

    handleTableCrudTypes(tableTypesFile, table.name);
    handleTableInputTypes(
      tableTypesFile,
      table.name,
      table.columns.map((column) => ({ ...column })),
    );
    handleTableGetPayloadType(tableTypesFile, table.name);
  }
}

function handleTableCrudTypes(tableTypesFile: SourceFile, tableName: string): void {
  const capitalizedTableName = capitalize(tableName);

  tableTypesFile.addTypeAliases([
    {
      name: `${capitalizedTableName}FindUniqueArgs`,
      type: Writers.object({
        'select?': Writers.unionType(`${capitalizedTableName}Select`, 'null'),
        where: `${capitalizedTableName}WhereUniqueInput`,
      }),
      isExported: true,
    },
    {
      name: `${capitalizedTableName}FindFirstArgs`,
      type: Writers.object({
        'select?': Writers.unionType(`${capitalizedTableName}Select`, 'null'),
        'where?': `${capitalizedTableName}WhereInput`,
        'skip?': 'number',
      }),
      isExported: true,
    },
    {
      name: `${capitalizedTableName}FindManyArgs`,
      type: Writers.object({
        'select?': Writers.unionType(`${capitalizedTableName}Select`, 'null'),
        'where?': `${capitalizedTableName}WhereInput`,
        'orderBy?': `${capitalizedTableName}OrderByWithRelationInput`,
        'take?': 'number',
        'skip?': 'number',
      }),
      isExported: true,
    },
    {
      name: `${capitalizedTableName}CreateArgs`,
      type: Writers.object({
        'select?': Writers.unionType(`${capitalizedTableName}Select`, 'null'),
        data: `XOR<${capitalizedTableName}CreateInput, ${capitalizedTableName}UncheckedCreateInput>`,
      }),
      isExported: true,
    },
    {
      name: `${capitalizedTableName}CreateManyArgs`,
      type: Writers.object({
        data: `Enumerable<${capitalizedTableName}CreateManyInput>`,
      }),
      isExported: true,
    },
    {
      name: `${capitalizedTableName}UpdateArgs`,
      type: Writers.object({
        'select?': Writers.unionType(`${capitalizedTableName}Select`, 'null'),
        data: `Enumerable<${capitalizedTableName}UpdateInput>`,
        where: `${capitalizedTableName}WhereUniqueInput`,
      }),
      isExported: true,
    },
    {
      name: `${capitalizedTableName}UpdateManyArgs`,
      type: Writers.object({
        'where?': `${capitalizedTableName}WhereInput`,
        data: `XOR<${capitalizedTableName}UpdateManyMutationInput, ${capitalizedTableName}UncheckedUpdateManyInput>`,
      }),
      isExported: true,
    },
    {
      name: `${capitalizedTableName}DeleteArgs`,
      type: Writers.object({
        'select?': Writers.unionType(`${capitalizedTableName}Select`, 'null'),
        where: `${capitalizedTableName}WhereInput`,
      }),
      isExported: true,
    },
    {
      name: `${capitalizedTableName}DeleteManyArgs`,
      type: Writers.object({
        where: `${capitalizedTableName}WhereInput`,
      }),
      isExported: true,
    },
  ]);
}

function handleTableInputTypes(tableTypesFile: SourceFile, tableName: string, columns: Array<Column>): void {
  const capitalizedTableName = capitalize(tableName);

  const tableProperties: Array<OptionalKind<PropertySignatureStructure>> = [{ name: 'id', type: 'string' }];
  const tableSelectProperties: Array<OptionalKind<PropertySignatureStructure>> = [
    { name: 'id', hasQuestionToken: true, type: 'boolean' },
  ];
  const tableWhereUniqueInputProperties: Array<OptionalKind<PropertySignatureStructure>> = [
    { name: 'id', hasQuestionToken: true, type: 'string' },
  ];

  const tableWhereInputProperties: Array<OptionalKind<PropertySignatureStructure>> = [
    {
      name: 'AND',
      hasQuestionToken: true,
      type: `Enumerable<${capitalizedTableName}WhereInput>`,
    },
    {
      name: 'OR',
      hasQuestionToken: true,
      type: `Enumerable<${capitalizedTableName}WhereInput>`,
    },
    {
      name: 'NOT',
      hasQuestionToken: true,
      type: `Enumerable<${capitalizedTableName}WhereInput>`,
    },
    {
      name: 'id',
      hasQuestionToken: true,
      type: Writers.unionType('StringFilter', 'string'),
    },
  ];
  const tableOrderByWithRelationInputProperties: Array<OptionalKind<PropertySignatureStructure>> = [
    { name: 'id', hasQuestionToken: true, type: 'SortOrder' },
  ];

  const tableCreateInputProperties: Array<OptionalKind<PropertySignatureStructure>> = [];

  const tableUpdateInput: Array<OptionalKind<PropertySignatureStructure>> = [];

  for (const column of columns) {
    const primitiveColumnType = columnTypeToPrimitiveType(column);

    tableProperties.push({
      name: column.name,
      hasQuestionToken: column.required,
      type: primitiveColumnType,
    });

    tableSelectProperties.push({
      name: column.name,
      hasQuestionToken: true,
      type: 'boolean',
    });

    if (column.unique) {
      tableWhereUniqueInputProperties.push({
        name: column.name,
        hasQuestionToken: true,
        type: primitiveColumnType,
      });
    }

    tableOrderByWithRelationInputProperties.push({
      name: column.name,
      hasQuestionToken: true,
      type: 'SortOrder',
    });

    tableWhereInputProperties.push({
      name: column.name,
      hasQuestionToken: true,
      type: primitiveToWhereInputType(primitiveColumnType, column.name),
    });

    tableCreateInputProperties.push({
      name: column.name,
      hasQuestionToken: column.default != null || primitiveColumnType.includes('Array') || !column.required,
      type: primitiveToCreateInputType(primitiveColumnType, tableName, column.name),
    });

    tableUpdateInput.push({
      name: column.name,
      hasQuestionToken: true,
      type: primitiveToUpdateInputType(primitiveColumnType, column.name, column.required),
    });

    /**
     * Handle special type cases:
     * Arrays, Enums, etc...
     * These cases require their own types which are generated here.
     */

    switch (column.type) {
      case ColumnType.MultipleSelect:
      case ColumnType.SingleSelect: {
        handleEnumTypeGeneration(tableTypesFile, column.name, column.options);

        const setType: string =
          column.type === ColumnType.MultipleSelect
            ? `Enumerable<${capitalize(column.name)}Type>`
            : column.type === ColumnType.SingleSelect
            ? `${capitalize(column.name)}Type`
            : 'unknown';

        tableTypesFile.addTypeAliases([
          {
            name: `${capitalizedTableName}Create${capitalize(column.name)}Input`,
            type: Writers.object({
              set: setType,
            }),
            isExported: true,
          },
          {
            name: `${capitalizedTableName}Update${capitalize(column.name)}Input`,
            type: Writers.object({
              'set?': setType,
              ...(column.type === ColumnType.MultipleSelect
                ? {
                    'push?': Writers.unionType(
                      `${capitalize(column.name)}Type`,
                      `Enumerable<${capitalize(column.name)}Type>`,
                    ),
                  }
                : {}),
            }),
            isExported: true,
          },
        ]);

        break;
      }

      default: {
        break;
      }
    }
  }

  tableTypesFile.addTypeAliases([
    {
      name: capitalizedTableName,
      type: Writers.objectType({ properties: tableProperties }),
      isExported: true,
    },
    {
      name: `${capitalizedTableName}WhereUniqueInput`,
      type: Writers.objectType({ properties: tableWhereUniqueInputProperties }),
      isExported: true,
    },
    {
      name: `${capitalizedTableName}Select`,
      type: Writers.objectType({ properties: tableSelectProperties }),
      isExported: true,
    },
    {
      name: `${capitalizedTableName}WhereInput`,
      type: Writers.objectType({ properties: tableWhereInputProperties }),
      isExported: true,
    },
    {
      name: `${capitalizedTableName}OrderByWithRelationInput`,
      type: Writers.objectType({ properties: tableOrderByWithRelationInputProperties }),
      isExported: true,
    },
    {
      name: `${capitalizedTableName}CreateInput`,
      type: Writers.objectType({ properties: tableCreateInputProperties }),
      isExported: true,
    },
    {
      name: `${capitalizedTableName}UncheckedCreateInput`,
      type: Writers.objectType({ properties: tableCreateInputProperties }),
      isExported: true,
    },
    {
      name: `${capitalizedTableName}CreateManyInput`,
      type: Writers.objectType({ properties: tableCreateInputProperties }),
      isExported: true,
    },
    {
      name: `${capitalizedTableName}UpdateInput`,
      type: Writers.objectType({ properties: tableUpdateInput }),
      isExported: true,
    },
    {
      name: `${capitalizedTableName}UncheckedUpdateInput`,
      type: Writers.objectType({ properties: tableUpdateInput }),
      isExported: true,
    },
    {
      name: `${capitalizedTableName}UpdateManyMutationInput`,
      type: Writers.objectType({ properties: tableUpdateInput }),
      isExported: true,
    },
    {
      name: `${capitalizedTableName}UncheckedUpdateManyInput`,
      type: Writers.objectType({ properties: tableUpdateInput }),
      isExported: true,
    },
  ]);
}

function handleTableGetPayloadType(tableTypesFile: SourceFile, tableName: string): void {
  const capitalizedTableName = capitalize(tableName);

  tableTypesFile.addTypeAlias({
    name: `${capitalizedTableName}Args`,
    isExported: true,
    type: Writers.objectType({
      properties: [
        {
          name: 'select',
          hasQuestionToken: true,
          type: Writers.unionType(`${capitalizedTableName}Select`, 'null'),
        },
      ],
    }),
  });

  tableTypesFile.addTypeAlias({
    name: `${capitalizedTableName}GetPayload`,
    typeParameters: [
      {
        name: 'S',
        constraint: Writers.unionType('boolean', 'null', 'undefined', `${capitalizedTableName}Args`),
      },
      {
        name: 'U',
        default: 'keyof S',
      },
    ],
    type: /* ts */ `
    S extends true
      ? ${capitalizedTableName}
      : S extends undefined
      ? never
      : S extends ${capitalizedTableName}Args | ${capitalizedTableName}FindManyArgs
      ? 'include' extends U
        ? ${capitalizedTableName}
        : 'select' extends U
        ? {
            [P in TrueKeys<S['select']>]: P extends keyof ${capitalizedTableName} ? ${capitalizedTableName}[P] : never;
          }
        : ${capitalizedTableName}
      : ${capitalizedTableName};
    `,
    isExported: true,
  });
}

function handleEnumTypeGeneration(
  tableTypesFile: SourceFile,
  columnName: ColumnName,
  options: Array<ISelectOptions>,
): void {
  const optionsObject: Record<string, string> = {};
  for (const option of options) {
    optionsObject[option.name] = `"${option.name}"`;
  }

  console.log(optionsObject);

  tableTypesFile.addVariableStatement({
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        name: `${capitalize(columnName)}Type`,
        initializer: Writers.assertion(Writers.object(optionsObject), 'const'),
      },
    ],
  });

  tableTypesFile.addTypeAliases([
    {
      name: `${capitalize(columnName)}Type`,
      isExported: true,
      type: `typeof ${capitalize(columnName)}Type[keyof typeof ${capitalize(columnName)}Type]`,
    },
    {
      name: `${capitalize(columnName)}TypeFilter`,
      isExported: true,
      type: Writers.objectType({
        properties: [
          {
            name: 'equals',
            hasQuestionToken: true,
            type: `${capitalize(columnName)}Type`,
          },
          {
            name: 'not',
            hasQuestionToken: true,
            type: `${capitalize(columnName)}Type`,
          },
          {
            name: 'in',
            hasQuestionToken: true,
            type: `Enumerable<${capitalize(columnName)}Type>`,
          },
          {
            name: 'notIn',
            hasQuestionToken: true,
            type: `Enumerable<${capitalize(columnName)}Type>`,
          },
        ],
      }),
    },
    {
      name: `${capitalize(columnName)}TypeListFilter`,
      isExported: true,
      type: Writers.objectType({
        properties: [
          {
            name: 'equals',
            hasQuestionToken: true,
            type: `Enumerable<${capitalize(columnName)}Type>`,
          },
          {
            name: 'has',
            hasQuestionToken: true,
            type: `${capitalize(columnName)}Type`,
          },
          {
            name: 'hasEvery',
            hasQuestionToken: true,
            type: `Enumerable<${capitalize(columnName)}Type>`,
          },
          {
            name: 'hasSome',
            hasQuestionToken: true,
            type: `Enumerable<${capitalize(columnName)}Type>`,
          },
          {
            name: 'isEmpty',
            hasQuestionToken: true,
            type: `boolean`,
          },
        ],
      }),
    },
    {
      name: `${capitalize(columnName)}TypeFieldUpdateOperationsInput`,
      isExported: true,
      type: Writers.objectType({
        properties: [
          {
            name: 'set',
            hasQuestionToken: true,
            type: `Enumerable<${capitalize(columnName)}Type>`,
          },
        ],
      }),
    },
    {
      name: `${capitalize(columnName)}TypeFieldNullableUpdateOperationsInput`,
      isExported: true,
      type: Writers.objectType({
        properties: [
          {
            name: 'set',
            hasQuestionToken: true,
            type: `Enumerable<${capitalize(columnName)}Type> | null`,
          },
        ],
      }),
    },
  ]);
}

function primitiveToWhereInputType(type: PrimitiveTypes, columnName: ColumnName): string {
  switch (type) {
    case 'string':
      return 'StringFilter | string';
    case 'boolean':
      return 'BoolFilter | boolean';
    case 'number':
      return 'IntFilter | number';

    case 'unknown':
      return 'unknown';

    case 'Array<boolean>':
      return 'BoolListFilter | boolean';

    case 'Array<number>':
      return 'IntListFilter | number';

    case 'Array<string>':
      return 'StringListFilter | string';

    default:
      if (type.includes('Type')) {
        if (type.includes('Array')) {
          return `${capitalize(columnName)}TypeListFilter`;
        }
        return `${capitalize(columnName)}TypeFilter | ${capitalize(columnName)}Type`;
      }
      return 'unknown';
  }
}

function primitiveToCreateInputType(type: PrimitiveTypes, tableName: string, columnName: string): string {
  return type;
}

function primitiveToUpdateInputType(type: PrimitiveTypes, columnName: string, required: boolean): string {
  //TODO: Check for enums
  switch (type) {
    case 'string':
      return `StringField${required ? '' : 'Nullable'}UpdateOperationsInput | string ${required ? '' : '| null'}`;
    case 'boolean':
      return `BoolField${required ? '' : 'Nullable'}UpdateOperationsInput | boolean ${required ? '' : '| null'}`;
    case 'number':
      return `IntField${required ? '' : 'Nullable'}UpdateOperationsInput | number ${required ? '' : '| null'}`;

    case 'unknown':
      return `unknown ${required ? '' : '| null'}`;

    case 'Array<boolean>':
      return `BoolListField${required ? '' : 'Nullable'}UpdateOperationsInput | Enumerable<boolean> ${
        required ? '' : '| null'
      }`;

    case 'Array<number>':
      return `IntListField${required ? '' : 'Nullable'}UpdateOperationsInput | Enumerable<number> ${
        required ? '' : '| null'
      }`;

    case 'Array<string>':
      return `StringListField${required ? '' : 'Nullable'}UpdateOperationsInput | Enumerable<string> ${
        required ? '' : '| null'
      }`;

    default:
      if (type.includes('Type')) {
        if (type.includes('Array')) {
          return `${capitalize(columnName)}TypeField${required ? '' : 'Nullable'}UpdateOperationsInput`;
        }
        return `${capitalize(columnName)}Type ${required ? '' : '| null'}`;
      }
      return 'unknown';
  }
}

function columnTypeToPrimitiveType(column: Column): PrimitiveTypes {
  switch (column.type) {
    case ColumnType.MultipleSelect:
      return `Array<${capitalize(column.name)}Type>`;

    case ColumnType.SingleSelect:
      return `${capitalize(column.name)}Type`;

    case ColumnType.Checkbox:
      return 'boolean';

    case ColumnType.Number:
    case ColumnType.Currency:
    case ColumnType.Percent:
      return 'number';

    case ColumnType.Array:
      return `Array<${column.arrayPrimitive}>`;

    case ColumnType.JSON:
      return 'unknown';

    default:
      return 'string';
  }
}
