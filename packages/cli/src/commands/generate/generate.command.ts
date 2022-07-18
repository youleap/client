import path from 'path';
import fs from 'fs';
import jwtDecode from 'jwt-decode';

import { SpinnerState } from '../../interfaces/spinner.interface';
import { GeneratePrompts } from './generate.prompts';
import { JwtPayload } from './generate.interface';
import { getTenantsByUserId } from '../../apis/tenant.api';

const apiKeyPath = path.join(__dirname, 'apiKey.txt');

export async function handleGenerateCommand(): Promise<void> {
  if (!fs.existsSync(apiKeyPath)) {
    GeneratePrompts.missingApiKey();
    process.exit();
  }

  //// validate access token (jwt)
  //// try to fetch tenants from base service.
  //// ask to select tenant.
  //TODO: try to fetch tenant bases and apis and functions.
  //TODO: try to generate types.
  //TODO: success.
  const jwt = fs.readFileSync(apiKeyPath, { encoding: 'utf-8' });
  try {
    const decodedJwt = jwtDecode<JwtPayload>(jwt);

    GeneratePrompts.tenantsSpinner(SpinnerState.Start, 'Fetching tenants, please wait...');
    const tenants = await getTenantsByUserId(jwt, decodedJwt.org_id, decodedJwt.sub);
    if (tenants.length === 0) {
      GeneratePrompts.tenantsSpinner(SpinnerState.Failed, "User isn't associated with any tenant.");
    }
    GeneratePrompts.tenantsSpinner(
      SpinnerState.Succeed,
      `Tenants ${tenants.map((tenant) => tenant.name).join(', ')} found!`,
    );

    const tenantId = await GeneratePrompts.chooseTenant(tenants);
    if (!tenantId) {
      throw new Error('User has canceled tenant prompt');
    }

    console.log(tenantId);

    process.exit();
  } catch (e) {
    GeneratePrompts.failed();
    process.exit();
  }
}
