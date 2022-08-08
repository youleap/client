import { ModuleKind, Project } from 'ts-morph';
import { flatten as _flatten, map as _map } from 'lodash';
import path from 'path';

import { TablesByBase } from '../../interfaces/base.interface';

import { generateTableApiHandler } from './apis/table-api-handler.generator';
import { generateBaseDelegateHandler } from './models/base-delegate.generator';
import { generateTableDelegateHandler } from './models/table-delegate.generator';
import { generateYouleapClientHandler } from './models/youleap-client.generator';
import { generateClientTypesHandler } from './types/client-types.generator';
import { generateCommonTypesHandler } from './types/common-types.generator';
import { generateTableTypesHandler } from './types/table-types.generator';

export async function generatorHandler(jwt: string, bases: Array<TablesByBase>): Promise<void> {
  const project = new Project({
    compilerOptions: {
      module: ModuleKind.CommonJS,
      esModuleInterop: true,
      declaration: true,
      outDir: 'dist',
    },
  });

  const basePath = path.resolve(__dirname, '..', '..', '@youleap/sdk');

  project.addSourceFilesAtPaths(`${basePath}/**/*.ts`);

  //* Generate YouleapClient *//
  generateYouleapClientHandler(project, `${basePath}/client/client.ts`, bases);

  //* Generate Bases *//
  generateBaseDelegateHandler(project, `${basePath}/client/bases`, bases);

  //* Generate Bases *//
  generateTableDelegateHandler(project, `${basePath}/client/bases/tables`, _flatten(_map(bases, 'tables')));

  //* Generate API Handler *//
  generateTableApiHandler(project, `${basePath}/apis/tableApiHandler.ts`, jwt);

  //* Generate Types *//
  const typesIndexExportFile = project.createSourceFile(`${basePath}/types/index.ts`, '', { overwrite: true });
  generateClientTypesHandler(project, `${basePath}/types/client.ts`, typesIndexExportFile);
  generateCommonTypesHandler(project, `${basePath}/types/common.ts`, typesIndexExportFile);
  generateTableTypesHandler(project, `${basePath}/types`, _flatten(_map(bases, 'tables')), typesIndexExportFile);

  project.createSourceFile(`${basePath}/index.ts`, "export * from './client/client';", { overwrite: true });

  await project.emit();
}
