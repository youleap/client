import path from 'path';
import fs from 'fs';

const apiKeyPath = path.join(__dirname, 'apiKey.txt');

export function handlePrintAccessToken(): void {
  if (fs.existsSync(apiKeyPath)) {
    const data = fs.readFileSync(apiKeyPath, { encoding: 'utf-8' });
    console.log(data);
    process.exit();
  } else {
    process.exit();
  }
}
