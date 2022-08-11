import crypto from 'node:crypto';

export function base64URLEncode(str: Buffer) {
  return str.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

export function sha256(buffer: string) {
  return crypto.createHash('sha256').update(buffer).digest();
}
