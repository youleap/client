import { Project } from 'ts-morph';

export function generateClientTypesHandler(project: Project, generationPath: string): void {
  const clientTypesFile = project.createSourceFile(generationPath);

  clientTypesFile.addImportDeclaration({
    moduleSpecifier: './common',
    namedImports: ['ErrorFormat', 'LogDefinition', 'LogLevel'],
    isTypeOnly: true,
  });

  clientTypesFile.addInterface({
    name: 'YouleapClientOptions',
    isExported: true,
    properties: [
      {
        name: 'errorFormat',
        type: 'ErrorFormat',
        hasQuestionToken: true,
      },
      {
        name: 'log',
        type: 'Array<LogLevel | LogDefinition>',
        hasQuestionToken: true,
      },
      {
        name: 'accessToken',
        type: 'string',
        hasQuestionToken: true,
      },
    ],
  });
}
