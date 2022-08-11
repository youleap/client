import {
  ClassDeclaration,
  CodeBlockWriter,
  MethodDeclarationStructure,
  OptionalKind,
  Project,
  Scope,
  SourceFile,
  Writers,
} from 'ts-morph';

import { TableResponseDto } from '../../../dtos/base.dto';
import { addDelegateSuffix, capitalize } from '../../../utils/string-manipulation.utils';

export function generateTableDelegateHandler(
  project: Project,
  generationPath: string,
  tables: Array<TableResponseDto>,
): void {
  const tablesIndexExportFile = project.createSourceFile(`${generationPath}/index.ts`, '', { overwrite: true });

  for (const table of tables) {
    tablesIndexExportFile
      .addExportDeclaration({
        moduleSpecifier: `./${table.name.toLowerCase()}`,
      })
      .toNamespaceExport();

    const tableDelegateClassFile = project.createSourceFile(`${generationPath}/${table.name.toLowerCase()}.ts`, '', {
      overwrite: true,
    });

    const tableDelegateClass = tableDelegateClassFile.addClass({
      name: addDelegateSuffix(table.name),
      isExported: true,
    });

    handleTableImports(tableDelegateClassFile, table.name);
    handleTableProperties(tableDelegateClass, table.id);
    handleTableConstructor(tableDelegateClass);
    handleTableMethods(tableDelegateClass, table.name);

    tableDelegateClassFile.formatText({
      placeOpenBraceOnNewLineForFunctions: true,
    });
  }
}

function handleTableMethods(tableDelegateClass: ClassDeclaration, tableName: string): void {
  const returnType = {
    object: `Promise<CheckSelect<T, ${capitalize(tableName)}, ${capitalize(tableName)}GetPayload<T>>>`,
    array: `Promise<CheckSelect<T, Array<${capitalize(tableName)}>, Array<${capitalize(tableName)}GetPayload<T>>>>`,
    batch: `Promise<BatchPayload>`,
  };

  tableDelegateClass.addMethods([
    tableMethodConfigGenerator(tableName, 'findUnique', returnType.object),
    tableMethodConfigGenerator(tableName, 'findUniqueOrThrow', returnType.object),
    tableMethodConfigGenerator(tableName, 'findFirst', returnType.object),
    tableMethodConfigGenerator(tableName, 'findFirstOrThrow', returnType.object),
    tableMethodConfigGenerator(tableName, 'findMany', returnType.array),
    tableMethodConfigGenerator(tableName, 'create', returnType.object),
    tableMethodConfigGenerator(tableName, 'createMany', returnType.batch),
    tableMethodConfigGenerator(tableName, 'delete', returnType.object),
    tableMethodConfigGenerator(tableName, 'deleteMany', returnType.batch),
    tableMethodConfigGenerator(tableName, 'update', returnType.object),
    tableMethodConfigGenerator(tableName, 'updateMany', returnType.batch),
  ]);
}

function handleTableConstructor(tableDelegateClass: ClassDeclaration): void {
  tableDelegateClass.addConstructor({
    parameters: [
      {
        name: 'accessToken',
        hasQuestionToken: true,
        type: 'string',
      },
    ],
    statements: 'this.tableApiHandler = new TableApiHandler(accessToken);',
  });
}

function handleTableProperties(tableDelegateClass: ClassDeclaration, tableId: string): void {
  tableDelegateClass.addProperties([
    {
      name: 'tableId',
      scope: Scope.Private,
      initializer: `"${tableId}"`,
    },
    {
      name: 'tableApiHandler',
      scope: Scope.Private,
      type: 'TableApiHandler',
    },
  ]);
}

function handleTableImports(tableDelegateClassFile: SourceFile, tableName: string): void {
  tableDelegateClassFile.addImportDeclaration({
    moduleSpecifier: '../../../apis/tableApiHandler',
    namedImports: ['TableApiHandler'],
  });

  tableDelegateClassFile.addImportDeclaration({
    moduleSpecifier: '../../../types',
    namedImports: [
      'BatchPayload',
      'CheckSelect',
      'SelectSubset',
      `${capitalize(tableName)}`,
      `${capitalize(tableName)}CreateArgs`,
      `${capitalize(tableName)}CreateManyArgs`,
      `${capitalize(tableName)}DeleteArgs`,
      `${capitalize(tableName)}DeleteManyArgs`,
      `${capitalize(tableName)}FindFirstArgs`,
      `${capitalize(tableName)}FindManyArgs`,
      `${capitalize(tableName)}FindUniqueArgs`,
      `${capitalize(tableName)}GetPayload`,
      `${capitalize(tableName)}UpdateArgs`,
      `${capitalize(tableName)}UpdateManyArgs`,
    ],
  });
}

const tableMethodConfigGenerator = (
  tableName: string,
  functionName: string,
  returnType: string,
): OptionalKind<MethodDeclarationStructure> => {
  const capitalizedFunctionName = capitalize(functionName.replace('OrThrow', ''));
  const capitalizedTableName = capitalize(tableName);
  const functionArgsTypeName = `${capitalizedTableName}${capitalizedFunctionName}Args`;

  const statements = functionName.includes('OrThrow')
    ? (writer: CodeBlockWriter) => {
        writer.writeLine(/* ts */ `
          const result = await this.tableApiHandler.findUniqueQueryApi<
              SelectSubset<T, ${capitalize(tableName)}FindUniqueArgs>,
              CheckSelect<T, ${capitalize(tableName)}, ${capitalize(tableName)}GetPayload<T>>
              >(this.tableId, args);
        `);
        writer.writeLine('if (result != null || Object.keys(result).length > 0)');
        writer.block(() => {
          writer.writeLine('return result;');
        });
        writer.writeLine('throw new Error("Could not find unique document.");');
      }
    : Writers.returnStatement(
        `await this.tableApiHandler.${functionName.replace('OrThrow', '')}QueryApi(this.tableId, args);`,
      );

  return {
    name: functionName,
    isAsync: true,
    scope: Scope.Public,
    parameters: [
      {
        name: 'args',
        hasQuestionToken: true,
        type: `SelectSubset<T, ${functionArgsTypeName}>`,
      },
    ],
    typeParameters: [
      {
        name: 'T',
        constraint: `${functionArgsTypeName}`,
      },
    ],
    returnType,
    statements,
  };
};
