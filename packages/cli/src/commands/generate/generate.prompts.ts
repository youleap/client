import chalk from 'chalk';
import prompts from 'prompts';
import { Tenant, TenantId } from './generate.interface';

const warning = chalk.hex('#FFA500');

async function confirmation(tenants: Array<Tenant>): Promise<TenantId> {
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

function success(tenantName: string): void {
  console.log();
  console.log(chalk.green(`✅ Successfully generated sdk types for ${tenantName}!`));
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

export const GeneratePrompts = { success, failed, confirmation, abort, missingApiKey };
