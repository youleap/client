import { OptionalKind, Project, PropertySignatureStructure, SourceFile, Writers } from 'ts-morph';
import { Column, ColumnType, TableResponseDto } from '../../../dtos/base.dto';
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
        'BoolFieldUpdateOperationsInput',
        'IntFieldUpdateOperationsInput',
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

  const tableCreateInputProperties: Array<OptionalKind<PropertySignatureStructure>> = [
    {
      name: 'id',
      hasQuestionToken: true,
      type: 'string',
    },
  ];

  const tableUpdateInput: Array<OptionalKind<PropertySignatureStructure>> = [];

  for (const column of columns) {
    const primitiveColumnType = columnTypeToPrimitiveType(column.type);

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
      type: primitiveToWhereInputType(primitiveColumnType, column.required),
    });

    tableCreateInputProperties.push({
      name: column.name,
      hasQuestionToken: column.default != null || primitiveColumnType.includes('Array') || !column.required,
      type: primitiveToCreateInputType(primitiveColumnType, tableName, column.name),
    });

    tableUpdateInput.push({
      name: column.name,
      hasQuestionToken: true,
      type: primitiveToUpdateInputType(primitiveColumnType, tableName, column.name),
    });

    /**
     * Handle special type cases:
     * Arrays, Enums, etc...
     * These cases require their own types which are generated here.
     */
    if (column.type === ColumnType.MultipleSelect) {
      console.log({ column });
      tableTypesFile.addTypeAliases([
        {
          name: `${capitalizedTableName}Create${capitalize(column.name)}Input`,
          type: Writers.object({
            //! Change this is the feature for other array types !/
            set: ColumnType.MultipleSelect ? 'Enumerable<string>' : 'Enumerable<string>',
          }),
          isExported: true,
        },
        {
          name: `${capitalizedTableName}Update${capitalize(column.name)}Input`,
          type: Writers.object({
            //! Change this is the feature for other array types !/
            'set?': ColumnType.MultipleSelect ? 'Enumerable<string>' : 'Enumerable<string>',
            'push?': ColumnType.MultipleSelect
              ? Writers.unionType('string', 'Enumerable<string>')
              : Writers.unionType('string', 'Enumerable<string>'),
          }),
          isExported: true,
        },
      ]);
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

function primitiveToWhereInputType(
  type: 'string' | 'number' | 'boolean' | 'Array<string>' | 'Array<number>' | 'Array<boolean>',
  isRequired: boolean = false,
): string {
  switch (type) {
    case 'string':
      return 'StringFilter | string';
    case 'boolean':
      return 'BoolFilter | boolean';
    case 'number':
      return 'IntFilter | number';

    default:
      return `${type === 'Array<string>' ? 'String' : type === 'Array<boolean>' ? 'Bool' : 'Int'}${
        isRequired ? 'Nullable' : ''
      }ListFilter`;
  }
}

function primitiveToCreateInputType(
  type: 'string' | 'number' | 'boolean' | 'Array<string>' | 'Array<number>' | 'Array<boolean>',
  tableName: string,
  columnName: string,
): string {
  if (type === 'Array<boolean>' || type === 'Array<number>' || type === 'Array<string>') {
    return `${capitalize(tableName)}Create${capitalize(columnName)}Input | Enumerable<${type
      .replace('Array<', '')
      .replace('>', '')}>`;
  }
  return type;
}

function primitiveToUpdateInputType(
  type: 'string' | 'number' | 'boolean' | 'Array<string>' | 'Array<number>' | 'Array<boolean>',
  tableName: string,
  columnName: string,
): string {
  switch (type) {
    case 'string':
      return 'StringFieldUpdateOperationsInput | string';
    case 'boolean':
      return 'BoolFieldUpdateOperationsInput | boolean';
    case 'number':
      return 'IntFieldUpdateOperationsInput | number';

    default:
      return `${capitalize(tableName)}Update${capitalize(columnName)}Input | Enumerable<${type
        .replace('Array<', '')
        .replace('>', '')}>`;
  }
}

function columnTypeToPrimitiveType(
  type: ColumnType,
): 'string' | 'number' | 'boolean' | 'Array<string>' | 'Array<number>' | 'Array<boolean>' {
  switch (type) {
    case ColumnType.MultipleSelect:
      return 'Array<string>';

    case ColumnType.Checkbox:
      return 'boolean';

    case ColumnType.Number:
    case ColumnType.Currency:
    case ColumnType.Percent:
      return 'number';

    default:
      return 'string';
  }
}
