import chalk from 'chalk';
import prompts from 'prompts';
import ora, { Ora } from 'ora';

import { TenantId } from '../../interfaces/tenant.interface';
import { TenantResponseDto } from '../../dtos/tenant.dto';
import { SpinnerState } from '../../interfaces/spinner.interface';

const warning = chalk.hex('#FFA500');
const codeSyntaxString = chalk.hex('#a5d6ff');
const codeSyntaxKeyword = chalk.hex('#ff7b72');
const codeSyntaxVariable = chalk.hex('#ffa657');

const tenantSpinnerInstance: Ora = ora();
const basesSpinnerInstance: Ora = ora();
const tablesSpinnerInstance: Ora = ora();
const generationSpinnerInstance: Ora = ora();

async function chooseTenant(tenants: Array<TenantResponseDto>): Promise<TenantId> {
  if (tenants.length === 0) {
    throw new Error("User isn't associated to a tenant.");
  }
  if (tenants.length === 1) {
    return tenants[0]!.id;
  }
  const result = await prompts({
    type: 'select',
    name: 'value',
    hint: 'Types are generated per tenant',
    message: 'Please select a tenant to generate its types:',
    choices: tenants.map((tenant) => {
      return {
        title: tenant.name,
        value: tenant.id,
      };
    }),
    initial: 1,
  });

  return result.value;
}

function sdkUsage(): void {
  console.log();
  console.log(
    `${codeSyntaxKeyword('import')} { ${codeSyntaxVariable('YouleapClient')} } from ${codeSyntaxString(
      '"@youleap/client"',
    )};`,
  );
  console.log(
    `${codeSyntaxKeyword('const')} youleap = ${codeSyntaxKeyword('new')} ${codeSyntaxVariable('YouleapClient')}();`,
  );
  console.log();
}

function failed(): void {
  console.log();
  console.log(chalk.red('❌ Failed to generate types.'));
}

function abort(): void {
  console.log();
  console.log(warning('⚠️  Type generation has failed unexpectedly!'));
}

function missingApiKey(): void {
  console.log();
  console.log(warning('⚠️  You need to authenticate in order to generate types.'));
  console.log('Authentication command:', chalk.bold('youleap auth login'));
}

function tenantsSpinner(state: SpinnerState, text?: string): void {
  switch (state) {
    case SpinnerState.Start:
      tenantSpinnerInstance.start(text);
      break;
    case SpinnerState.Succeed:
      tenantSpinnerInstance.succeed(text);
      break;
    case SpinnerState.Failed:
      tenantSpinnerInstance.fail(text);
  }
}

function basesSpinner(state: SpinnerState, text?: string): void {
  switch (state) {
    case SpinnerState.Start:
      basesSpinnerInstance.start(text);
      break;
    case SpinnerState.Succeed:
      basesSpinnerInstance.succeed(text);
      break;
    case SpinnerState.Failed:
      basesSpinnerInstance.fail(text);
  }
}

function tablesSpinner(state: SpinnerState, text?: string): void {
  switch (state) {
    case SpinnerState.Start:
      tablesSpinnerInstance.start(text);
      break;
    case SpinnerState.Succeed:
      tablesSpinnerInstance.succeed(text);
      break;
    case SpinnerState.Failed:
      tablesSpinnerInstance.fail(text);
  }
}

function generationSpinner(state: SpinnerState, text?: string): void {
  switch (state) {
    case SpinnerState.Start:
      generationSpinnerInstance.start(text);
      break;
    case SpinnerState.Succeed:
      generationSpinnerInstance.succeed(text);
      break;
    case SpinnerState.Failed:
      generationSpinnerInstance.fail(text);
  }
}

export const GeneratePrompts = {
  sdkUsage,
  failed,
  chooseTenant,
  abort,
  missingApiKey,
  tenantsSpinner,
  basesSpinner,
  tablesSpinner,
  generationSpinner,
};
