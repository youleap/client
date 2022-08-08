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

export async function generatorHandler(
  jwt: string,
  bases: Array<TablesByBase>,
  sdkInstallationPath: string,
): Promise<void> {
  const project = new Project({
    compilerOptions: {
      module: ModuleKind.CommonJS,
      esModuleInterop: true,
      declaration: true,
    },
  });

  project.addSourceFilesAtPaths(`${sdkInstallationPath}/dist/**/*.ts`);

  //* Generate YouleapClient *//
  generateYouleapClientHandler(project, `${sdkInstallationPath}/dist/client/client.ts`, bases);

  //* Generate Bases *//
  generateBaseDelegateHandler(project, `${sdkInstallationPath}/dist/client/bases`, bases);

  //* Generate Bases *//
  generateTableDelegateHandler(project, `${sdkInstallationPath}/dist/client/bases/tables`, _flatten(_map(bases, 'tables')));

  //* Generate API Handler *//
  generateTableApiHandler(project, `${sdkInstallationPath}/dist/apis/tableApiHandler.ts`, jwt);

  //* Generate Types *//
  const typesIndexExportFile = project.createSourceFile(`${sdkInstallationPath}/dist/types/index.ts`, '', {
    overwrite: true,
  });
  generateClientTypesHandler(project, `${sdkInstallationPath}/dist/types/client.ts`, typesIndexExportFile);
  generateCommonTypesHandler(project, `${sdkInstallationPath}/dist/types/common.ts`, typesIndexExportFile);
  generateTableTypesHandler(
    project,
    `${sdkInstallationPath}/dist/types`,
    _flatten(_map(bases, 'tables')),
    typesIndexExportFile,
  );

  project.createSourceFile(`${sdkInstallationPath}/dist/index.ts`, "export * from './client/client';", { overwrite: true });

  await project.emit();
}
