import { ModuleKind, Project } from 'ts-morph';
import { flatten as _flatten, map as _map } from 'lodash';
import fs from 'fs/promises';

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
  await fs.rm(`${sdkInstallationPath}/dist`, { recursive: true, force: true });

  const project = new Project({
    compilerOptions: {
      module: ModuleKind.CommonJS,
      esModuleInterop: true,
      declaration: true,
    },
  });

  project
    .createSourceFile(`${sdkInstallationPath}/dist/index.ts`, '', {
      overwrite: true,
    })
    .addExportDeclaration({
      namedExports: ['YouleapClient'],
      moduleSpecifier: './client',
    });

  project.addSourceFilesAtPaths(`${sdkInstallationPath}/dist/**/*.ts`);

  //* Generate YouleapClient *//
  generateYouleapClientHandler(project, `${sdkInstallationPath}/dist/client`, bases);

  //* Generate Bases *//
  generateBaseDelegateHandler(project, `${sdkInstallationPath}/dist/client/bases`, bases);

  //* Generate Table *//
  generateTableDelegateHandler(
    project,
    `${sdkInstallationPath}/dist/client/bases/tables`,
    _flatten(_map(bases, 'tables')),
  );

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

  await project.emit();
}
