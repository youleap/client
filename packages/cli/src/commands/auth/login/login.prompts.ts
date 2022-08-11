import chalk from 'chalk';
import prompts from 'prompts';

function init(authUrl: string): void {
  console.log();
  console.log(`${chalk.bold('Your browser has been opened, alternatively you visit following link directly:')}
${authUrl}`);
}

function success(): void {
  console.log();
  console.log(chalk.green('✅ You have successfully authenticated to Youleap!'));
}
function failed(): void {
  console.log();
  console.log(chalk.red('❌ Authentication process failed.'));
}
async function confirmation(): Promise<boolean> {
  console.log();
  const response = await prompts({
    type: 'confirm',
    name: 'value',
    message: 'API key already exists, do you want to login once more?',
  });
  return response.value;
}

export const LoginPrompts = { init, success, failed, confirmation };
