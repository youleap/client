import path from 'path';
import fs from 'fs';
import jwtDecode from 'jwt-decode';

import { GeneratePrompts } from './generate.prompts';
import { JwtPayload } from './generate.interface';

const apiKeyPath = path.join(__dirname, 'apiKey.txt');

export function handleGenerateCommand(): void {
  if (!fs.existsSync(apiKeyPath)) {
    GeneratePrompts.missingApiKey();
    process.exit();
  }

  //// validate access token (jwt)
  //TODO: try to fetch tenants from base service.
  //TODO: ask to select tenant.
  //TODO: try to fetch tenant bases and apis from base service.
  //TODO: try to generate types.
  //TODO: success.
  const jwt = fs.readFileSync(apiKeyPath, { encoding: 'utf-8' });
  try {
    const decodedJwt = jwtDecode<JwtPayload>(jwt);
    console.log(decodedJwt);
    process.exit();
  } catch {
    GeneratePrompts.failed();
    process.exit();
  }
}
