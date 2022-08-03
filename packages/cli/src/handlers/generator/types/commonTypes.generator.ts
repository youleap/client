import { Project, VariableDeclarationKind, Writers } from 'ts-morph';

export function generateCommonTypesHandler(project: Project, generationPath: string): void {
  const commonTypesFile = project.createSourceFile(generationPath);

  commonTypesFile.addVariableStatement({
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        name: 'SortOrder',
        initializer: Writers.assertion(
          Writers.object({
            asc: '"asc"',
            desc: '"desc"',
          }),
          'const',
        ),
      },
    ],
  });

  commonTypesFile.addTypeAlias({
    name: 'SortOrder',
    isExported: true,
    type: 'typeof SortOrder[keyof typeof SortOrder]',
  });

  commonTypesFile.addTypeAlias({
    name: 'ErrorFormat',
    isExported: true,
    type: Writers.unionType('"pretty"', '"colorless"', '"minimal"'),
  });

  commonTypesFile.addTypeAlias({
    name: 'LogLevel',
    isExported: true,
    type: Writers.unionType('"info"', '"query"', '"warn"', '"error"'),
  });

  commonTypesFile.addTypeAlias({
    name: 'LogDefinition',
    isExported: true,
    type: Writers.object({
      level: "'LogLevel'",
      emit: Writers.unionType('"stdout"', '"event"'),
    }),
  });
}
