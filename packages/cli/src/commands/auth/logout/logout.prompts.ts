import chalk from 'chalk';
import prompts from 'prompts';

const warning = chalk.hex('#FFA500');

async function confirmation(): Promise<boolean> {
  const result = await prompts({
    type: 'confirm',
    name: 'value',
    message: 'Are you sure you want to logout?',
  });

  return result.value;
}

function success(): void {
  console.log();
  console.log(chalk.green('✅ You have successfully logged out of Youleap!'));
}

function failed(): void {
  console.log();
  console.log(chalk.red('❌ Logout process failed.'));
}

function abort(): void {
  console.log();
  console.log(warning('⚠️  Logout has been aborted!'));
}

export const LogoutPrompts = { success, failed, confirmation, abort };
