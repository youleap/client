import { Project } from 'ts-morph';
import { TableResponseDto } from '../../dtos/base.dto';
import { BaseId } from '../../interfaces/base.interface';
import { generateYouleapClientHandler } from './models/youleap-client.generator';
import { generateClientTypesHandler, generateCommonTypesHandler } from './types';

export function generatorHandler(): void {
  // export function generatorHandler(baseName: string, baseId: BaseId, tables: Array<TableResponseDto>): void {
  const project = new Project();
  project.addSourceFilesAtPaths('sdk/src/**/*.ts');

  //* Generate YouleapClient *//
  generateYouleapClientHandler(project, 'sdk/src/client/client.ts');

  // //* Generate Types *//
  generateClientTypesHandler(project, 'sdk/src/types/client.ts');
  generateCommonTypesHandler(project, 'sdk/src/types/common.ts');

  project.save();
}
