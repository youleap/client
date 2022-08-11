import { Project, SourceFile } from 'ts-morph';
import { CLIENT_TYPES_TEMPLATE } from '../templates/client-types.template';

export function generateClientTypesHandler(
  project: Project,
  generationPath: string,
  indexSourceFile: SourceFile,
): void {
  project.createSourceFile(generationPath, CLIENT_TYPES_TEMPLATE, { overwrite: true });
  indexSourceFile
    .addExportDeclaration({
      moduleSpecifier: './client',
    })
    .toNamespaceExport();
}
