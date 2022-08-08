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
      declaration: true,
      module: ModuleKind.CommonJS,
      esModuleInterop: true,
    },
  });

  const basePath = path.resolve(__dirname, '..', '..', 'sdk');

  project.addSourceFilesAtPaths(`${basePath}/src/**/*.ts`);

  //* Generate YouleapClient *//
  generateYouleapClientHandler(project, `${basePath}/src/client/client.ts`, bases);

  //* Generate Bases *//
  generateBaseDelegateHandler(project, `${basePath}/src/client/bases`, bases);

  //* Generate Bases *//
  generateTableDelegateHandler(project, `${basePath}/src/client/bases/tables`, _flatten(_map(bases, 'tables')));

  //* Generate API Handler *//
  generateTableApiHandler(project, `${basePath}/src/apis/tableApiHandler.ts`, jwt);

  //* Generate Types *//
  const typesIndexExportFile = project.createSourceFile(`${basePath}/src/types/index.ts`, '', { overwrite: true });
  generateClientTypesHandler(project, `${basePath}/src/types/client.ts`, typesIndexExportFile);
  generateCommonTypesHandler(project, `${basePath}/src/types/common.ts`, typesIndexExportFile);
  generateTableTypesHandler(project, `${basePath}/src/types`, _flatten(_map(bases, 'tables')), typesIndexExportFile);

  project.createSourceFile(`${basePath}/src/index.ts`, "export * from './client/client';", { overwrite: true });

  //// Generate Outside index.ts
  //TODO: Embed baseUrl and accessToken in baseApiHandler
  //// Generate tsconfig
  //TODO: Generate package.json
  //// Generate node_modules
  //// Build TS
  //// Move to SDK folder
  await project.emit();
}
