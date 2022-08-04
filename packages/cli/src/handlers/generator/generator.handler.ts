import { Project } from 'ts-morph';

import { TablesByBase } from '../../interfaces/base.interface';

import { generateTableApiHandler } from './apis/table-api-handler.generator';
import { generateBaseDelegateHandler } from './models/base-delegate.generator';
import { generateTableDelegateHandler } from './models/table-delegate.generator';
import { generateYouleapClientHandler } from './models/youleap-client.generator';
import { generateClientTypesHandler } from './types/client-types.generator';
import { generateCommonTypesHandler } from './types/common-types.generator';

export async function generatorHandler(jwt: string, bases: Array<TablesByBase>): Promise<void> {
  const project = new Project();
  project.addSourceFilesAtPaths('sdk/src/**/*.ts');

  //* Generate YouleapClient *//
  generateYouleapClientHandler(project, 'sdk/src/client/client.ts', bases);

  //* Generate Bases *//
  generateBaseDelegateHandler(project, 'sdk/src/client/bases', bases);

  //* Generate Bases *//
  generateTableDelegateHandler(project, 'sdk/src/client/bases', bases);

  //* Generate API Handler *//
  generateTableApiHandler(project, 'sdk/src/apis/tableApiHandler.ts');

  // //* Generate Types *//
  const typesIndexExportFile = project.createSourceFile('sdk/src/types/index.ts', '', { overwrite: true });
  generateClientTypesHandler(project, 'sdk/src/types/client.ts', typesIndexExportFile);
  generateCommonTypesHandler(project, 'sdk/src/types/common.ts', typesIndexExportFile);

  await project.save();
}
