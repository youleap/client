import { Project } from 'ts-morph';
import { CLIENT_TYPES_TEMPLATE } from '../templates/client-types.template';

export function generateClientTypesHandler(project: Project, generationPath: string): void {
  project.createSourceFile(generationPath, CLIENT_TYPES_TEMPLATE, { overwrite: true });
}
