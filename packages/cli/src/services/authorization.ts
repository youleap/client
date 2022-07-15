import axios from 'axios';
import open from 'open';
import crypto from 'crypto';

const AUTH0ֹֹֹֹֹ_DOMAIN = 'youleap.eu.auth0.com';
const AUTH0_CLIENT_ID = 'pEk3YxP47srCFp7ZFdmoj9FR0IXvulqz';
const CODE_VERIFIER = base64URLEncode(crypto.randomBytes(32));
const CODE_CHALLENGE = base64URLEncode(sha256(CODE_VERIFIER));

export async function getToken(code: string): Promise<string> {
  const options = {
    method: 'POST',
    url: 'https://youleap.eu.auth0.com/oauth/token',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: AUTH0_CLIENT_ID,
      code_verifier: CODE_VERIFIER,
      code,
      redirect_uri: 'http://localhost:8085/',
    }),
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response.data.access_token;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function handleAuthorization(state: string): Promise<void> {
  const authUrl = [
    `https://${AUTH0ֹֹֹֹֹ_DOMAIN}/authorize`,
    `?response_type=code`,
    `&code_challenge=${CODE_CHALLENGE}`,
    `&code_challenge_method=S256`,
    `&client_id=${AUTH0_CLIENT_ID}`,
    `&redirect_uri=http://localhost:8085/`,
    `&scope=openid email query`,
    `$audience=https://gateway.youleap-local.io/base`,
    `&state=${state}`,
  ].join('');

  await open(authUrl, { wait: true });
}

function base64URLEncode(str: Buffer) {
  return str.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

function sha256(buffer: string) {
  return crypto.createHash('sha256').update(buffer).digest();
}
