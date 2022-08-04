import { Project } from 'ts-morph';
import { TABLE_API_HANDLER } from '../templates/tables-api-handler.template';

export function generateTableApiHandler(project: Project, generationPath: string): void {
  project.createSourceFile(generationPath, TABLE_API_HANDLER, { overwrite: true });
}
