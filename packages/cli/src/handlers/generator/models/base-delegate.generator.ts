import { Project, Scope, StructureKind } from 'ts-morph';
import { TablesByBase } from '../../../interfaces/base.interface';
import { addDelegateSuffix } from '../../../utils/string-manipulation.utils';

export function generateBaseDelegateHandler(
  project: Project,
  generationPath: string,
  bases: Array<TablesByBase>,
): void {
  const basesIndexExportFile = project.createSourceFile(`${generationPath}/index.ts`, '', { overwrite: true });

  for (const base of bases) {
    basesIndexExportFile
      .addExportDeclaration({
        moduleSpecifier: `./${base.name}`,
      })
      .toNamespaceExport();

    const baseDelegateClassFile = project.createSourceFile(`${generationPath}/${base.name}.ts`, '', {
      overwrite: true,
    });

    const baseDelegateClass = baseDelegateClassFile.addClass({
      name: addDelegateSuffix(base.name),
      isExported: true,
    });

    baseDelegateClassFile.addImportDeclarations(
      base.tables.map((table) => {
        return {
          kind: StructureKind.ImportDeclaration,
          namedImports: [addDelegateSuffix(table.name)],
          moduleSpecifier: `./tables/${table.name}`,
        };
      }),
    );

    baseDelegateClass.addProperty({
      scope: Scope.Private,
      name: 'baseId',
      initializer: `"${base.id}"`,
      type: 'string',
    });

    for (const table of base.tables) {
      baseDelegateClass.addProperty({
        scope: Scope.Public,
        name: table.name,
        type: addDelegateSuffix(table.name),
      });
    }

    baseDelegateClass.addConstructor({
      parameters: [
        {
          name: 'accessToken',
          hasQuestionToken: true,
          type: 'string',
        },
      ],
      statements: (writer) => {
        for (const table of base.tables) {
          writer.writeLine(
            `this.${table.name} = new ${addDelegateSuffix(table.name)}(accessToken)`,
          );
        }
      },
    });
  }
}
