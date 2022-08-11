import fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import path from 'path';
import fs from 'fs';
import open from 'open';
import crypto from 'node:crypto';
import { LoginPrompts } from './login.prompts';
import { getToken } from '../../../apis/token.api';
import { base64URLEncode, sha256 } from '../../../utils';

const AUTH0ֹֹֹֹֹ_DOMAIN = 'youleap.eu.auth0.com';
const AUTH0_CLIENT_ID = 'pEk3YxP47srCFp7ZFdmoj9FR0IXvulqz';
const CODE_VERIFIER = base64URLEncode(crypto.randomBytes(32));
const CODE_CHALLENGE = base64URLEncode(sha256(CODE_VERIFIER));

const server = fastify();

const authUrl = [
  `https://${AUTH0ֹֹֹֹֹ_DOMAIN}/authorize`,
  `?response_type=code`,
  `&code_challenge=${CODE_CHALLENGE}`,
  `&code_challenge_method=S256`,
  `&client_id=${AUTH0_CLIENT_ID}`,
  `&redirect_uri=http://localhost:8085/`,
  `&audience=https://gateway.youleap-local.io/base`,
  `&scope=base:get table:query`,
].join('');
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
      await open(authUrl);
      LoginPrompts.init(authUrl);
    } else {
      process.exit();
    }
  } else {
    await open(authUrl);
    LoginPrompts.init(authUrl);
  }
  server.listen({ port: 8085, host: 'localhost' });
  server.get<RequestQuerystring>('/', async (request, response) => {
    try {
      const result = await getToken(request.query.code, AUTH0_CLIENT_ID, CODE_VERIFIER);
      fs.writeFileSync(apiKeyPath, result);
      LoginPrompts.success();
    } catch {
      LoginPrompts.failed();
    }

    return response.sendFile('callback.html');
  });
}
