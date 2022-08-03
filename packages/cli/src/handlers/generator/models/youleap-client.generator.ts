import { Project, Scope, StructureKind } from 'ts-morph';
import { YOULEAP_CLIENT_TEMPLATE } from '../templates/youleap-client.template';

export function generateYouleapClientHandler(project: Project, generationPath: string): void {
  const youleapClientClassFile = project.createSourceFile(generationPath, YOULEAP_CLIENT_TEMPLATE, { overwrite: true });

  youleapClientClassFile.addImportDeclarations([
    {
      moduleSpecifier: '../types/client',
      namedImports: ['YouleapClientOptions'],
      isTypeOnly: true,
    },
    {
      moduleSpecifier: '../types/common',
      namedImports: ['ErrorFormat', 'LogDefinition', 'LogLevel'],
      isTypeOnly: true,
    },
    {
      moduleSpecifier: './databases',
      namedImports: ['DatabaseDelegate'],
    },
  ]);

  const youleapClientClass = youleapClientClassFile.addClass({
    kind: StructureKind.Class,
    name: 'YouleapClient',
    isDefaultExport: true,
  });

  youleapClientClass.addMembers([
    {
      kind: StructureKind.Property,
      name: 'errorFormat',
      type: 'ErrorFormat',
      hasQuestionToken: true,
      scope: Scope.Private,
    },
    {
      kind: StructureKind.Property,
      name: 'log',
      type: 'Array<LogLevel | LogDefinition>',
      hasQuestionToken: true,
      scope: Scope.Private,
    },
    {
      kind: StructureKind.Property,
      name: 'accessToken',
      type: 'string',
      hasQuestionToken: true,
      scope: Scope.Private,
    },
  ]);

  youleapClientClass.addGetAccessor({
    name: 'db',
    returnType: 'DatabaseDelegate',
    scope: Scope.Public,
    statements: 'return new DatabaseDelegate();',
  });

  youleapClientClass.addConstructor({
    kind: StructureKind.Constructor,
    parameters: [
      {
        kind: StructureKind.Parameter,
        name: 'args',
        type: 'YouleapClientOptions',
        hasQuestionToken: true,
      },
    ],
    statements: (writer) => {
      writer.writeLine('this.errorFormat = args?.errorFormat;');
      writer.writeLine('this.log = args?.log;');
      writer.writeLine('this.accessToken = args?.accessToken;');
    },
  });
}
