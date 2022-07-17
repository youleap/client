import { openAuthorizationUrl, getToken, getAuthorizationUrl } from '../../../services/authorization';
import fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import path from 'path';
import fs from 'fs';
import { LoginPrompts } from './login.prompts';

const server = fastify();

const authUrl = getAuthorizationUrl();
const apiKeyPath = path.join(__dirname, 'apiKey.txt');

server.register(fastifyStatic, {
  root: path.join(__dirname, 'assets'),
});

server.addHook('onResponse', () => {
  process.exit();
});

interface RequestQuerystring {
  Querystring: {
    code: string;
  };
}

export async function handleLoginCommand(): Promise<void> {
  if (fs.existsSync(apiKeyPath)) {
    const result = await LoginPrompts.confirmation();
    if (result) {
      await openAuthorizationUrl(authUrl);
      LoginPrompts.init(authUrl);
    } else {
      process.exit();
    }
  } else {
    openAuthorizationUrl(authUrl);
    LoginPrompts.init(authUrl);
  }
  server.listen({ port: 8085, host: 'localhost' });
  server.get<RequestQuerystring>('/', async (request, response) => {
    try {
      const result = await getToken(request.query.code);
      fs.writeFileSync(apiKeyPath, result);
      LoginPrompts.success();
    } catch {
      LoginPrompts.failed();
    }

    return response.sendFile('callback.html');
  });
}
