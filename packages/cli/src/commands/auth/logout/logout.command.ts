import path from 'path';
import fs from 'fs';
import { LogoutPrompts } from './logout.prompts';

const apiKeyPath = path.join(__dirname, 'apiKey.txt');

export async function handleLogoutCommand() {
  if (fs.existsSync(apiKeyPath)) {
    const result = await LogoutPrompts.confirmation();
    if (result) {
      try {
        fs.unlinkSync(apiKeyPath);
        LogoutPrompts.success();
        process.exit();
      } catch {
        LogoutPrompts.failed();
        process.exit();
      }
    } else {
      LogoutPrompts.abort();
      process.exit();
    }
  } else {
    LogoutPrompts.success();
    process.exit();
  }
}
