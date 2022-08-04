import { Project } from 'ts-morph';
import { COMMON_TYPES_TEMPLATE } from '../templates/common-types.template';

export function generateCommonTypesHandler(project: Project, generationPath: string): void {
  project.createSourceFile(generationPath, COMMON_TYPES_TEMPLATE, { overwrite: true });
}
