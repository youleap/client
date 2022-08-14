import { Project, SourceFile } from 'ts-morph';
import { COMMON_TYPES_TEMPLATE } from '../templates/common-types.template';

export function generateCommonTypesHandler(
  project: Project,
  generationPath: string,
  indexSourceFile: SourceFile,
): void {
  project.createSourceFile(generationPath, COMMON_TYPES_TEMPLATE, { overwrite: true });
  indexSourceFile
    .addExportDeclaration({
      moduleSpecifier: './common',
    })
    .toNamespaceExport();
}
