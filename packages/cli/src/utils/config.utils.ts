export const configUtility = {
  get youleapApiBaseUrl(): string {
    return process.env['YOULEAP_API_BASE_URL'] ?? 'https://gateway.youleap-local.io/';
  },
  get auth0ApiBaseUrl(): string {
    return process.env['AUTH0_API_BASE_URL'] ?? 'https://youleap.eu.auth0.com/';
  },
  get accessToken(): string | undefined {
    return process.env['ACCESS_TOKEN'];
  },
};
