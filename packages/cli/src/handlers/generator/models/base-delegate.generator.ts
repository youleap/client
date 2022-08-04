import { Project, Scope, StructureKind } from 'ts-morph';
import { TablesByBase } from '../../../interfaces/base.interface';
import { addDelegateSuffix } from '../../../utils/string-manipulation.utils';

export function generateBaseDelegateHandler(
  project: Project,
  generationPath: string,
  bases: Array<TablesByBase>,
): void {
  for (const base of bases) {
    // if (base.tables.length === 0) {
    //   continue;
    // }

    const baseDelegateClassFile = project.createSourceFile(`${generationPath}/${base.name.toLowerCase()}.ts`, '', {
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
          moduleSpecifier: `./tables/${table.name.toLocaleLowerCase()}`,
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
        name: table.name.toLowerCase(),
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
            `this.${table.name.toLocaleLowerCase()} = new ${addDelegateSuffix(table.name)}(accessToken)`,
          );
        }
      },
    });
  }
}
