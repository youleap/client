import { ClassDeclaration, Project, Scope, SourceFile, StructureKind } from 'ts-morph';
import { capitalize as _capitalize } from 'lodash';

import { TableResponseDto } from '../../../dtos/base.dto';
import { addDelegateSuffix } from '../../../utils/string-manipulation.utils';

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
  }
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
    statements: (writer) => {
      writer.writeLine('this.tableApiHandler = new TableApiHandler(accessToken);');
    },
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
      `${_capitalize(tableName)}CreateArgs`,
      `${_capitalize(tableName)}CreateManyArgs`,
      `${_capitalize(tableName)}DeleteArgs`,
      `${_capitalize(tableName)}DeleteMany`,
      `${_capitalize(tableName)}FindFirstArgs`,
      `${_capitalize(tableName)}FindManyArgs`,
      `${_capitalize(tableName)}FindUniqueArgs`,
      `${_capitalize(tableName)}GetPayload`,
      `${_capitalize(tableName)}UpdateArgs`,
      `${_capitalize(tableName)}UpdateManyArgs`,
    ],
  });
}
