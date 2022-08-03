import path from 'path';
import fs from 'fs';
import jwtDecode from 'jwt-decode';

import { GeneratePrompts } from './generate.prompts';
import { getTenantsByUserId } from '../../apis/tenant.api';
import { getBasesByTenantId, getTablesByBaseId } from '../../apis/base.api';
import { JwtPayload } from '../../interfaces/jwt.interface';
import { TenantId } from '../../interfaces/tenant.interface';
import { BaseResponseDto, TableResponseDto } from '../../dtos/base.dto';
import { BaseId, TablesByBase } from '../../interfaces/base.interface';

const apiKeyPath = path.join(__dirname, 'apiKey.txt');

export async function handleGenerateCommand(): Promise<void> {
  if (!fs.existsSync(apiKeyPath)) {
    GeneratePrompts.missingApiKey();
    process.exit();
  }

  //// validate access token (jwt)
  //// try to fetch tenants from base service.
  //// ask to select tenant.
  //// try to fetch tenant bases and apis and functions.
  //TODO: try to generate types.
  //TODO: success.
  const jwt = fs.readFileSync(apiKeyPath, { encoding: 'utf-8' });
  try {
    const decodedJwt = jwtDecode<JwtPayload>(jwt);

    const tenantId = await fetchTenantsHandler(jwt, decodedJwt.org_id, decodedJwt.sub);
    const bases = await fetchBasesHandler(jwt, tenantId);
    const tablesByBase = await fetchTablesHandler(jwt, bases);

    
    GeneratePrompts.generationSpinner('Start', 'Generating SDK...');

    process.exit();
  } catch (e) {
    GeneratePrompts.failed();
    process.exit();
  }
}

async function fetchTenantsHandler(jwt: string, organizationId: string, userId: string): Promise<TenantId> {
  GeneratePrompts.tenantsSpinner('Start', 'Fetching tenants, please wait...');
  const tenants = await getTenantsByUserId(jwt, organizationId, userId);
  if (tenants.length === 0) {
    GeneratePrompts.tenantsSpinner('Failed', "User isn't associated with any tenant.");
    process.exit();
  }
  GeneratePrompts.tenantsSpinner('Succeed', `Tenants ${tenants.map((tenant) => tenant.name).join(', ')} found!`);

  const tenantId = await GeneratePrompts.chooseTenant(tenants);
  if (!tenantId) {
    throw new Error('User has canceled tenant prompt');
  }

  return tenantId;
}

async function fetchBasesHandler(jwt: string, tenantId: TenantId): Promise<Array<BaseResponseDto>> {
  GeneratePrompts.basesSpinner('Start', 'Fetching bases, please wait...');
  const bases = await getBasesByTenantId(jwt, tenantId);
  if (bases.length === 0) {
    GeneratePrompts.basesSpinner('Failed', 'Could not find any bases for the selected tenant.');
    process.exit();
  }
  GeneratePrompts.basesSpinner('Succeed', `Bases ${bases.map((base) => base.name).join(', ')} found!`);

  return bases;
}

async function fetchTablesHandler(
  jwt: string,
  bases: Array<BaseResponseDto>,
): Promise<
  Array<{
    tables: Array<TableResponseDto>;
    id: BaseId;
    name: string;
  }>
> {
  GeneratePrompts.tablesSpinner('Start', 'Fetching tables, please wait...');
  const tablesByBase = await Promise.all(bases.map(async (base) => {
    const tables = await getTablesByBaseId(jwt, base.id);
    return {
      ...base,
      tables
    };
  }));
  GeneratePrompts.tablesSpinner('Succeed', 'Fetched all tables successfully!');

  return tablesByBase;
}
