import { Project, Scope } from 'ts-morph';
import { configUtility } from '../../../utils/config.utils';
import { TABLE_API_HANDLER } from '../templates/tables-api-handler.template';

export function generateTableApiHandler(project: Project, generationPath: string, jwt: string): void {
  const tableApiFile = project.createSourceFile(generationPath, TABLE_API_HANDLER, { overwrite: true });
  const tableApiClass = tableApiFile.getClassOrThrow('TableApiHandler');

  tableApiClass.addProperties([
    {
      name: 'baseUrl',
      isReadonly: true,
      scope: Scope.Private,
      type: 'string',
      initializer: `"${configUtility.youleapApiBaseUrl}"`,
    },
    {
      name: 'accessToken',
      isReadonly: true,
      scope: Scope.Private,
      type: 'string',
      initializer: `"${jwt}"`,
    },
  ]);
}
