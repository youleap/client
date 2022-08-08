#!/usr/bin/env node
import 'dotenv/config';
import { handleLoginCommand } from './commands/auth/login/index';
import { handlePrintAccessTokenCommand } from './commands/auth/print-access-token/index';
import { handleLogoutCommand } from './commands/auth/logout/index';
import { handleGenerateCommand } from './commands/generate/index';
import { Command } from 'commander';

const program = new Command();

program.name('youleap').description('Used to authenticate and manage your youleap resources.').version('1.0.0');

//==============[Authentication Commands]==============//

const authCommand = program
  .command('auth')
  .description('Authenticates you to youleap services')
  .argument('login', 'initiates the login process for youleap services')
  .argument('print-access-token', 'print out your access token')
  .argument('logout', 'logout from youleap services');

authCommand.command('login').action(async () => {
  await handleLoginCommand();
});

authCommand.command('logout').action(async () => {
  await handleLogoutCommand();
});

authCommand.command('print-access-token').action(() => {
  handlePrintAccessTokenCommand();
});

//==============[Generate Command]==============//

const generateCommand = program
  .command('generate')
  .description('Generates typescript types based on your account and available tenants');

generateCommand.action(async () => {
  await handleGenerateCommand();
});

program.parse();
