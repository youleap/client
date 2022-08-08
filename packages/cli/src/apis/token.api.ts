import axios, { AxiosRequestConfig } from 'axios';
import { Auth0TokenResponseDto } from '../dtos/token.dto';
import { configUtility } from '../utils/config.utils';

export async function getToken(code: string, clientId: string, codeVerifier: string): Promise<string> {
  const options: AxiosRequestConfig = {
    method: 'POST',
    baseURL: configUtility.auth0ApiBaseUrl,
    url: 'oauth/token',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: clientId,
      code_verifier: codeVerifier,
      code,
      redirect_uri: 'http://localhost:8085/',
    }),
  };

  try {
    const { data } = await axios.request<Auth0TokenResponseDto>(options);
    return data.access_token;
  } catch (e) {
    throw e;
  }
}
