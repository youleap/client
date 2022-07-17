#!/usr/bin/env node
import { handleLoginCommand } from './commands/auth/login';
import { handlePrintAccessToken } from './commands/auth/print-access-token';
import { handleLogoutCommand } from './commands/auth/logout';
import { Command } from 'commander';
const program = new Command();

program.name('youleap').description('used to authenticate and manage your youleap resources.').version('1.0.0');

const authCommand = program
  .command('auth')
  .description('Used for authenticating to the youleap servers.')
  .argument('login', 'authenticates you to youleap services')
  .argument('status', 'shows you the authentication status')
  .argument('logout', 'logout from youleap services');

authCommand.command('login').action(async () => {
  await handleLoginCommand();
});

authCommand.command('logout').action(async () => {
  await handleLogoutCommand();
});

authCommand.command('print-access-token').action(() => {
  handlePrintAccessToken();
});
program.parse();
