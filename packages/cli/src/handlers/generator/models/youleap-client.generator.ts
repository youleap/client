import { Project, Scope, StructureKind, WriterFunctionOrValue, Writers } from 'ts-morph';
import { TablesByBase } from '../../../interfaces/base.interface';
import { addDelegateSuffix } from '../../../utils/string-manipulation.utils';
import { YOULEAP_CLIENT_TEMPLATE } from '../templates/youleap-client.template';

export function generateYouleapClientHandler(
  project: Project,
  generationPath: string,
  bases: Array<TablesByBase>,
): void {
  project.createSourceFile(`${generationPath}/index.ts`, 'export * from "./client";', { overwrite: true });
  const youleapClientClassFile = project.createSourceFile(`${generationPath}/client.ts`, YOULEAP_CLIENT_TEMPLATE, {
    overwrite: true,
  });
  const youleapClientClass = youleapClientClassFile.getClassOrThrow('YouleapClient');

  youleapClientClassFile.addImportDeclaration({
    kind: StructureKind.ImportDeclaration,
    moduleSpecifier: './bases',
    namedImports: bases.map((base) => addDelegateSuffix(base.name)),
  });

  const dbInitializer: { [key: string]: WriterFunctionOrValue } = {};
  for (const base of bases) {
    dbInitializer[base.name] = (writer) => {
      writer.writeLine(`new ${addDelegateSuffix(base.name)}(this.accessToken)`);
    };
  }

  youleapClientClass.addProperty({
    kind: StructureKind.Property,
    name: 'db',
    scope: Scope.Public,
    initializer: Writers.object(dbInitializer),
  });

  youleapClientClassFile.formatText();
}
